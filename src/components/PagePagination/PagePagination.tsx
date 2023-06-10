import { FC } from "react";
import { IPageInfo, ISearchParams } from "../../redux/types/reposTypes";
import styles from "./PagePagination.module.scss";

interface IPagePagination {
  pageInfo: IPageInfo;
  pages: number[];
  currentPage: number;
  handlePageChange: (props: ISearchParams) => void;
}

const PagePagination: FC<IPagePagination> = ({
  pageInfo,
  pages,
  currentPage,
  handlePageChange,
}) => {
  const { totalRepos, hasNextPage, hasPreviousPage, endCursor, startCursor } =
    pageInfo;

  const startPage = 1;
  const endPage = pages.length;

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
            disabled={currentPage === startPage}
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
          if (page < startPage || page > endPage - 1) {
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
            disabled={currentPage === endPage}
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
