// Interface for filter and sort data used in table and MainUI
export interface IFilterSortData {
  column?: 'dist' | 'size';
  direction?: 'ascending' | 'descending';

  sizeFilterMeters?: number;
  hFilter?: number;

  showCloseApproachesWithMinLessThan1LD?: boolean;
}
