import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// My constants, hooks, etc.
import { IFilterSortData } from '../../Models/filterSort.model';
import { useStyles } from './styles';

interface IProps {
  filterSortData: IFilterSortData;
  setFilterSortData: (data: IFilterSortData) => void;
}
export const FilterSortButton = ({ filterSortData, setFilterSortData }: IProps) => {
  // --------------------->>>

  // State
  const classes = useStyles();
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const [internalSizeFilter, setInternalSizeFilter] = useState<number | undefined>();
  const [internalHFilter, setInternalHFilter] = useState<number | undefined>();

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (
        !!(e.target as HTMLElement)?.className &&
        typeof (e.target as HTMLElement)?.className === 'string' &&
        !(e.target as HTMLElement).className.includes('filterSortButton')
      ) {
        setIsDropdownShown(false);
        document.removeEventListener('click', clickListener);
      }
    };

    if (isDropdownShown) {
      document.addEventListener('click', clickListener);
    } else {
      document.removeEventListener('click', clickListener);
    }

    return () => {
      document.removeEventListener('click', clickListener);
    };
  }, [isDropdownShown]);

  const setColumn = (col?: 'dist' | 'size') => {
    let tempFilterSortData = Object.assign({}, filterSortData);
    tempFilterSortData.column = col;

    if (filterSortData.column === col && !!filterSortData) {
      tempFilterSortData.direction =
        filterSortData.direction === 'descending' ? 'ascending' : 'descending';
    } else {
      tempFilterSortData.direction = 'ascending';
    }

    setFilterSortData(tempFilterSortData);
  };

  const setSizeFilter = (filter?: number, final = false) => {
    setInternalSizeFilter(!filter ? undefined : filter);

    if (final === true) {
      let tempFilterSortData = Object.assign({}, filterSortData);

      if (!filter) {
        tempFilterSortData.sizeFilterMeters = undefined;
      } else {
        tempFilterSortData.sizeFilterMeters = filter;
      }

      setFilterSortData(tempFilterSortData);
    }
  };

  const setHFilter = (filter?: number, final = false) => {
    setInternalHFilter(!filter ? undefined : filter);

    if (final === true) {
      let tempFilterSortData = Object.assign({}, filterSortData);

      if (!filter) {
        tempFilterSortData.hFilter = undefined;
      } else {
        tempFilterSortData.hFilter = filter;
      }

      setFilterSortData(tempFilterSortData);
    }
  };

  const setFilterUncertainNEOs = (show: boolean) => {
    let tempFilterSortData = Object.assign({}, filterSortData);
    tempFilterSortData.showCloseApproachesWithMinLessThan1LD = show;

    setFilterSortData(tempFilterSortData);
  };

  return (
    <div className={classes.filterSortButton}>
      <button onClick={() => setIsDropdownShown(!isDropdownShown)}>
        <FontAwesomeIcon icon={faFilter} size="sm" />
      </button>

      <div
        className={classes.filterSortDropdownContainer}
        style={{
          transform: `${isDropdownShown ? 'scaleY(1)' : 'scaleY(0)'}`,
          pointerEvents: `${isDropdownShown ? 'all' : 'none'}` as 'all' | 'none'
        }}
      >
        <div>
          <p className={classes.header}>Sort by</p>

          <div className={classes.optionsContainer}>
            <div
              id={filterSortData.column === undefined ? 'selected' : undefined}
              onClick={() => setColumn()}
            >
              <p>Date (default)</p>
            </div>

            <div
              id={filterSortData.column === 'dist' ? 'selected' : undefined}
              onClick={() => setColumn('dist')}
            >
              <p>Distance</p>

              {filterSortData.column === 'dist' && (
                <div>
                  <FontAwesomeIcon
                    icon={filterSortData.direction === 'descending' ? faArrowDown : faArrowUp}
                    size="xs"
                  />
                </div>
              )}
            </div>

            <div
              id={filterSortData.column === 'size' ? 'selected' : undefined}
              onClick={() => setColumn('size')}
            >
              <p>Size</p>

              {filterSortData.column === 'size' && (
                <div>
                  <FontAwesomeIcon
                    icon={filterSortData.direction === 'descending' ? faArrowDown : faArrowUp}
                    size="xs"
                  />
                </div>
              )}
            </div>
          </div>

          <div className={classes.divider} />

          <p className={classes.header}>Size Filter</p>

          <div className={classes.sliderContainer}>
            <p>{(internalSizeFilter && '>' + internalSizeFilter + 'm') ?? 'All'}</p>

            <input
              value={internalSizeFilter ?? 0}
              onChange={(e) => setSizeFilter(parseInt(e.target.value))}
              onMouseUp={() =>
                setSizeFilter((internalSizeFilter ?? 0) > 0 ? internalSizeFilter : undefined, true)
              }
              onTouchEnd={() =>
                setSizeFilter((internalSizeFilter ?? 0) > 0 ? internalSizeFilter : undefined, true)
              }
              type="range"
              min="0"
              max="1000"
              step="10"
            />
          </div>

          <div className={classes.optionsContainer}>
            <div onClick={() => setSizeFilter(undefined, true)}>
              <p>All</p>
            </div>

            <div onClick={() => setSizeFilter(50, true)}>
              <p>{'>'}50m</p>
            </div>
          </div>

          <div className={classes.divider} />

          <p className={classes.header}>H Filter</p>

          <div className={classes.sliderContainer}>
            <p>{internalHFilter && internalHFilter > 14 ? '<' + internalHFilter + '' : 'All'}</p>

            <input
              value={internalHFilter ?? 0}
              onChange={(e) => setHFilter(parseFloat(e.target.value))}
              onMouseUp={() =>
                setHFilter((internalHFilter ?? 0) > 14 ? internalHFilter : undefined, true)
              }
              onTouchEnd={() =>
                setHFilter((internalHFilter ?? 0) > 14 ? internalHFilter : undefined, true)
              }
              type="range"
              min="14.0"
              max="34.0"
              step="0.5"
            />
          </div>
        </div>

        <div className={classes.optionsContainer}>
          <div onClick={() => setHFilter(undefined, true)}>
            <p>All</p>
          </div>
        </div>

        <div className={classes.divider} />

        <p className={classes.header}>Uncertain NEOs</p>
        <div className={classes.uncertainNEOsContainer}>
          <label htmlFor="showCloseApproachesWithMinLessThan1LD">
            Show NEOs with min distances {'<'}1LD
          </label>

          <input
            type="checkbox"
            id="showCloseApproachesWithMinLessThan1LD"
            name="showCloseApproachesWithMinLessThan1LD"
            onChange={(e) => setFilterUncertainNEOs(e.target.checked)}
            checked={filterSortData.showCloseApproachesWithMinLessThan1LD}
          />
        </div>
      </div>
    </div>
  );
};
