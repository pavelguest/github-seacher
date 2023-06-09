import { createSlice } from "@reduxjs/toolkit";
import { getRepoById, getRepos, searchRepos } from "../actions/ActionCreators";
import { IInitialState } from "../types/reposTypes";

const initialState: IInitialState = {
  query: localStorage.getItem("searchInputValue")
    ? (localStorage.getItem("searchInputValue") as string)
    : "",
  pageInfo: null,
  page: 1,
  perPage: 10,
  reposList: [],
  loading: false,
  errorMessage: "",
  currentRepoDetails: null,
  searchParams: null,
};

export const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      localStorage.setItem("searchInputValue", action.payload);
      state.query = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: {
    [searchRepos.pending.type]: (state) => {
      state.loading = true;
    },
    [searchRepos.fulfilled.type]: (state, { payload }) => {
      state.pageInfo = {
        ...payload.search.pageInfo,
        totalRepos: payload.search.repositoryCount,
      };
      state.reposList = payload.search.edges;
      state.loading = false;
    },
    [searchRepos.rejected.type]: (state) => {
      state.loading = false;
      state.errorMessage = "Could not fetch data. Please refresh to try again.";
    },
    [getRepos.pending.type]: (state) => {
      state.loading = true;
    },
    [getRepos.fulfilled.type]: (state, { payload }) => {
      state.reposList = payload.viewer.repositories.edges;
      state.loading = false;
    },
    [getRepos.rejected.type]: (state) => {
      state.loading = false;
      state.errorMessage = "Could not fetch data. Please refresh to try again.";
    },
    [getRepoById.pending.type]: (state) => {
      state.loading = true;
    },
    [getRepoById.fulfilled.type]: (state, { payload }) => {
      state.currentRepoDetails = payload;
      state.loading = false;
    },
    [getRepoById.rejected.type]: (state) => {
      state.loading = false;
      state.errorMessage = "Could not fetch data. Please refresh to try again.";
    },
  },
});

export const { actions } = reposSlice;

export default reposSlice.reducer;
