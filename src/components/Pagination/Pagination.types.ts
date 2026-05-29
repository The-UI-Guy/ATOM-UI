export interface PaginationProps {
  /** Current page, 1-indexed */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when the user navigates to a different page */
  onPageChange: (page: number) => void;
  /** Number of rows per page — drives the page size selector label */
  pageSize?: number;
  /** Called when the user changes the page size */
  onPageSizeChange?: (size: number) => void;
  /** Options shown in the page size selector. Default: [10, 20, 50, 100] */
  pageSizeOptions?: number[];
  /** Hide the page size selector. Default: false */
  hidePageSize?: boolean;
  className?: string;
}
