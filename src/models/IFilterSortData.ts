/**
 * Interface for filter and sort data used in table and MainUI
 */
export interface IFilterSortData {
  column: "date" | "dist" | "size";
  direction: "ascending" | "descending";

  sizeFilterMeters?: number;
  hFilter?: number;

  isShowingCloseApproachesWithMinLessThan1LD: boolean;
}
