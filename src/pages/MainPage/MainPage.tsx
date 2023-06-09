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

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams(
    localStorage.getItem("searchParams")
      ? (localStorage.getItem("searchParams") as string)
      : ""
  );
  const { query, page, perPage, reposList, errorMessage, pageInfo } =
    useAppSelector((state) => state.repos);

  const getRepositories = () => {
    if (query) {
      const params = Object.fromEntries([...searchParams]);
      console.log(params);

      params.type === "after"
        ? dispatch(
            searchRepos({
              query: query,
              first: perPage,
              last: null,
              after: params.element,
              before: null,
            })
          )
        : dispatch(
            searchRepos({
              query: query,
              last: null,
              first: perPage,
              after: null,
              before: params.element,
            })
          );
      dispatch(actions.setPage(page));
    } else {
      dispatch(getRepos(perPage));
    }
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
    // setSearchInput(value);
    dispatch(actions.setQuery(value));
    dispatch(actions.setPage(1));
    localStorage.removeItem("searchParams");
    setSearchParams("");
  };

  useEffect(() => {
    getRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, searchParams]);

  if (errorMessage) return <ErrorMessage errorMessage={errorMessage} />;

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.inputContainer}>
        <SearchInput onSearch={handleSearch} value={query} />
      </div>
      <div className={styles.repoContainer}>
        {!!reposList.length && (
          <RepoList
            repos={reposList}
            handleNavigateToRepoDetails={handleNavigateToRepoDetails}
          />
        )}
      </div>
      {!!pageInfo && (
        <PagePagination
          pageInfo={pageInfo}
          currentPage={page}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MainPage;
