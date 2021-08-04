import React, { useEffect, useState } from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

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

  const setFilter = (filter: 'all' | '140' | '1km') => {
    let tempFilterSortData = Object.assign({}, filterSortData);

    if (filter === 'all') {
      tempFilterSortData.sizeFilter = undefined;
    } else if (filter === '140') {
      tempFilterSortData.sizeFilter = '>140m';
    } else if (filter === '1km') {
      tempFilterSortData.sizeFilter = '>1km';
    }

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
        <p className={classes.filterSortDropdownHeader}>Sort by</p>

        <div className={classes.filterSortDropdownOptionsContainer}>
          <div
            id={filterSortData.column === undefined ? 'selected' : undefined}
            onClick={() => setColumn()}
          >
            <p>Default</p>
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

        <p className={classes.filterSortDropdownHeader}>Filter</p>

        <div className={classes.filterSortDropdownOptionsContainer}>
          <div onClick={() => setFilter('all')}>
            <p>All</p>

            <div>
              <FontAwesomeIcon
                icon={!filterSortData.sizeFilter ? faCheckSquare : faSquare}
                style={{ marginRight: '3px' }}
                size="xs"
              />
            </div>
          </div>

          <div onClick={() => setFilter('140')}>
            <p>{'>'}140m</p>

            <div>
              <FontAwesomeIcon
                icon={filterSortData.sizeFilter === '>140m' ? faCheckSquare : faSquare}
                style={{ marginRight: '3px' }}
                size="xs"
              />
            </div>
          </div>

          <div onClick={() => setFilter('1km')}>
            <p>{'>'}1km</p>

            <div>
              <FontAwesomeIcon
                icon={filterSortData.sizeFilter === '>1km' ? faCheckSquare : faSquare}
                style={{ marginRight: '3px' }}
                size="xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
