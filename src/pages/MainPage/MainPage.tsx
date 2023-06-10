import { useEffect } from "react";
import { getRepos, searchRepos } from "../../redux/actions/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage";
import styles from "./MainPage.module.scss";
import { RepoList } from "../../components/RepoList";
import { SearchInput } from "../../components/SearchInput";
import { actions } from "../../redux/slice/repos";
import { PagePagination } from "../../components/PagePagination";
import { ISearchParams } from "../../redux/types/reposTypes";
import { paginate } from "../../utils/helpersFunc";
import { Spinner } from "../../components/Spinner";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams(
    localStorage.getItem("searchParams")
      ? (localStorage.getItem("searchParams") as string)
      : ""
  );
  const { query, page, perPage, reposList, errorMessage, pageInfo, loading } =
    useAppSelector((state) => state.repos);

  const getRepositories = () => {
    if (query) {
      dispatch(
        searchRepos({
          query: query,
          first: perPage,
          last: null,
          after: pageInfo?.endCursor,
          before: null,
        })
      );
    } else {
      dispatch(
        getRepos({
          query: query,
          first: perPage,
          last: null,
          after: pageInfo?.endCursor,
          before: null,
        })
      );
    }
    dispatch(actions.setPage(page));
  };

  const handleChangeSearchParams = (props: ISearchParams) => {
    const params = { ...props, page: props.page.toString() };
    localStorage.setItem("searchParams", JSON.stringify(params));
    setSearchParams(params);
  };

  const handlePageChange = (params: ISearchParams) => {
    handleChangeSearchParams(params);
    dispatch(actions.setPage(params.page));
  };

  const handleNavigateToRepoDetails = (username: string, repoName: string) => {
    navigate(`../repo/${username}/${repoName}`);
  };

  const handleSearch = (value: string) => {
    dispatch(actions.setQuery(value));
    dispatch(actions.setPage(1));
    localStorage.removeItem("searchParams");
    setSearchParams("");
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(reposList.length / 10); i += 1) {
    pages.push(i);
  }

  useEffect(() => {
    getRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.inputContainer}>
        <SearchInput onSearch={handleSearch} value={query} />
      </div>
      {!loading ? (
        <div className={styles.repoContainer}>
          {!errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          {!!reposList.length && (
            <RepoList
              repos={paginate(reposList, 10, page)}
              handleNavigateToRepoDetails={handleNavigateToRepoDetails}
            />
          )}
          {!!pageInfo && (
            <PagePagination
              pageInfo={pageInfo}
              pages={pages}
              currentPage={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MainPage;
