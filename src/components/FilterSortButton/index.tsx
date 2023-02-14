import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faArrowUp,
  faArrowDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { IFilterSortData } from "../../models/IFilterSortData";
import styles from "./styles.module.scss";

interface IProps {
  filterSortData: IFilterSortData;
  setFilterSortData: (data: IFilterSortData) => void;
}
/**
 * Dropdown button with size filters and sort options
 */
export const FilterSortButton = (props: IProps) => {
  // --->>

  // State
  const { filterSortData, setFilterSortData } = props;
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const [internalSizeFilter, setInternalSizeFilter] = useState<number>(0);
  const [internalHFilter, setInternalHFilter] = useState<number>(0);

  // Initialize a listener to detect a click outside of the dropdown
  useEffect(() => {
    const clickListener = (e: Event) => {
      if (
        !!(e.target as HTMLElement)?.className &&
        typeof (e.target as HTMLElement)?.className === "string" &&
        !(e.target as HTMLElement).className.includes("filterSortButton")
      ) {
        setIsDropdownShown(false);
        document.removeEventListener("click", clickListener);
      }
    };

    if (isDropdownShown) {
      document.addEventListener("click", clickListener);
    } else {
      document.removeEventListener("click", clickListener);
    }

    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [isDropdownShown]);

  // Set the column, reversing the direction if the already selected
  // column is clicked
  const setColumn = (col?: "dist" | "size") => {
    let tempFilterSortData = Object.assign({}, filterSortData);
    tempFilterSortData.column = col || "dist";

    if (filterSortData.column === col && !!filterSortData) {
      tempFilterSortData.direction =
        filterSortData.direction === "descending" ? "ascending" : "descending";
    } else {
      tempFilterSortData.direction = "ascending";
    }

    setFilterSortData(tempFilterSortData);
  };

  // Store the size filter in state. If final is true, store the
  // number into the filterSortData state object to trigger the data
  // to be filtered.
  const setSizeFilter = (filter?: number, final = false) => {
    setInternalSizeFilter(filter || 0);

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

  // Store the h filter in state. If final is true, store the
  // number into the filterSortData state object to trigger the data
  // to be filtered.
  const setHFilter = (filter?: number, final = false) => {
    setInternalHFilter(filter || 0);

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
    tempFilterSortData.isShowCloseApproachesWithMinLessThan1LD = show;

    setFilterSortData(tempFilterSortData);
  };

  return (
    <div className={styles.filterSortButton}>
      <button onClick={() => setIsDropdownShown(!isDropdownShown)}>
        <FontAwesomeIcon icon={faFilter} size="sm" />
      </button>

      <div
        className={styles.filterSortDropdownContainer}
        style={{
          transform: `${isDropdownShown ? "scaleY(1)" : "scaleY(0)"}`,
          pointerEvents: `${isDropdownShown ? "all" : "none"}` as
            | "all"
            | "none",
        }}
      >
        <div>
          <p className={styles.header}>Sort by</p>

          <div className={styles.optionsContainer}>
            <div
              id={filterSortData.column === undefined ? "selected" : undefined}
              onClick={() => setColumn()}
            >
              <p>Date (default)</p>

              {!filterSortData.column && (
                <div>
                  <FontAwesomeIcon icon={faCheck} size="xs" />
                </div>
              )}
            </div>

            <div
              id={filterSortData.column === "dist" ? "selected" : undefined}
              onClick={() => setColumn("dist")}
            >
              <p>Distance</p>

              {filterSortData.column === "dist" && (
                <div>
                  <FontAwesomeIcon
                    icon={
                      filterSortData.direction === "descending"
                        ? faArrowDown
                        : faArrowUp
                    }
                    size="xs"
                  />
                </div>
              )}
            </div>

            <div
              id={filterSortData.column === "size" ? "selected" : undefined}
              onClick={() => setColumn("size")}
            >
              <p>Size</p>

              {filterSortData.column === "size" && (
                <div>
                  <FontAwesomeIcon
                    icon={
                      filterSortData.direction === "descending"
                        ? faArrowDown
                        : faArrowUp
                    }
                    size="xs"
                  />
                </div>
              )}
            </div>
          </div>

          <div className={styles.divider} />

          <p className={styles.header}>Size Filter</p>

          <div className={styles.sliderContainer}>
            <p>
              {internalSizeFilter && internalSizeFilter > 0
                ? ">" + internalSizeFilter + "m"
                : "All"}
            </p>

            <input
              value={internalSizeFilter ?? 0}
              onChange={(e) => setSizeFilter(parseInt(e.target.value))}
              onMouseUp={() =>
                setSizeFilter(
                  (internalSizeFilter ?? 0) > 0
                    ? internalSizeFilter
                    : undefined,
                  true
                )
              }
              onTouchEnd={() =>
                setSizeFilter(
                  (internalSizeFilter ?? 0) > 0
                    ? internalSizeFilter
                    : undefined,
                  true
                )
              }
              type="range"
              min="0"
              max="1000"
              step="10"
            />
          </div>

          <div className={styles.optionsContainer}>
            <div onClick={() => setSizeFilter(undefined, true)}>
              <p>All</p>
            </div>

            <div onClick={() => setSizeFilter(50, true)}>
              <p>{">"}50m</p>
            </div>
          </div>

          <div className={styles.divider} />

          <p className={styles.header}>H Filter</p>

          <div className={styles.sliderContainer}>
            <p>
              {internalHFilter && internalHFilter > 14
                ? "<" + internalHFilter + ""
                : "All"}
            </p>

            <input
              value={internalHFilter ?? 0}
              onChange={(e) => setHFilter(parseFloat(e.target.value))}
              onMouseUp={() =>
                setHFilter(
                  (internalHFilter ?? 0) > 14 ? internalHFilter : undefined,
                  true
                )
              }
              onTouchEnd={() =>
                setHFilter(
                  (internalHFilter ?? 0) > 14 ? internalHFilter : undefined,
                  true
                )
              }
              type="range"
              min="14.0"
              max="34.0"
              step="0.5"
            />
          </div>
        </div>

        <div className={styles.optionsContainer}>
          <div onClick={() => setHFilter(undefined, true)}>
            <p>All</p>
          </div>
        </div>

        <div className={styles.divider} />

        <p className={styles.header}>Uncertain Orbits</p>
        <div className={styles.uncertainNEOsContainer}>
          <label htmlFor="showCloseApproachesWithMinLessThan1LD">
            Show NEOs with min distances {"<"}1LD
          </label>

          <input
            type="checkbox"
            id="showCloseApproachesWithMinLessThan1LD"
            name="showCloseApproachesWithMinLessThan1LD"
            onChange={(e) => setFilterUncertainNEOs(e.target.checked)}
            checked={!!filterSortData.isShowCloseApproachesWithMinLessThan1LD}
          />
        </div>
      </div>
    </div>
  );
};
