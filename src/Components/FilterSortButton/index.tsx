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

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (
        (e.target as HTMLElement)?.className &&
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
