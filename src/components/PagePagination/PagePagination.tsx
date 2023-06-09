import { FC } from "react";
import { IPageInfo, ISearchParams } from "../../redux/types/reposTypes";
import styles from "./PagePagination.module.scss";

interface IPagePagination {
  pageInfo: IPageInfo;
  currentPage: number;
  handlePageChange: (props: ISearchParams) => void;
}

const PagePagination: FC<IPagePagination> = ({
  pageInfo,
  currentPage,
  handlePageChange,
}) => {
  const { totalRepos, hasNextPage, hasPreviousPage, endCursor, startCursor } =
    pageInfo;

  const perPage = 10;
  const totalItems = totalRepos;
  const totalPages = Math.ceil(totalItems / perPage);
  const startPage = 1;
  const endPage = totalPages;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <ul className={styles.pagination}>
        <li
          className={`${styles.pageItem} ${
            currentPage === startPage ? `${styles.disabled}` : ""
          }`}
        >
          <button
            className={styles.pageLink}
            disabled={!hasPreviousPage}
            onClick={() =>
              handlePageChange({
                page: currentPage - 1,
                element: startCursor,
                type: "before",
              })
            }
          >
            Previous
          </button>
        </li>
        {pages.map((page) => {
          if (page < startPage + 2 || page > endPage - 2) {
            return null;
          }

          if (page >= 10) {
            return;
          }

          return (
            <li key={page} className={styles.pageItem}>
              <button
                className={`${styles.pageLink} ${
                  currentPage === page ? `${styles.active}` : ""
                }`}
                onClick={() =>
                  page > currentPage
                    ? handlePageChange({
                        page: page,
                        element: endCursor,
                        type: "after",
                      })
                    : handlePageChange({
                        page: page,
                        element: startCursor,
                        type: "before",
                      })
                }
              >
                {page}
              </button>
            </li>
          );
        })}
        <li
          className={`${styles.pageItem} ${
            currentPage === endPage ? `${styles.disabled}` : ""
          }`}
        >
          <button
            className={styles.pageLink}
            disabled={!hasNextPage}
            onClick={() =>
              handlePageChange({
                page: currentPage + 1,
                element: endCursor,
                type: "after",
              })
            }
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PagePagination;
