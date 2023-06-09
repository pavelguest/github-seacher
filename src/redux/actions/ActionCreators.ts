import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../graphql/client";
import { SEARCH_REPOSITORIES } from "../../graphql/queries/searchRepositories";
import { IGetRepoByIdParams, ISearchReposParams } from "../types/reposTypes";
import { GET_REPOSITORIES } from "../../graphql/queries/getRepositories";
import { GET_REPOSITORY_BY_ID } from "../../graphql/queries/getRepositoryById";

export const searchRepos = createAsyncThunk(
  "repos/fetchSearchReposList",
  async (props: ISearchReposParams, thunkAPI) => {
    try {
      const response = await client.query({
        query: SEARCH_REPOSITORIES,
        variables: props,
      });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getRepos = createAsyncThunk(
  "repos/fetchReposList",
  async (count: number, thunkAPI) => {
    try {
      const response = await client.query({
        query: GET_REPOSITORIES,
        variables: { first: count },
      });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getRepoById = createAsyncThunk(
  "repos/fetchRepoById",
  async (props: IGetRepoByIdParams, thunkAPI) => {
    try {
      const response = await client.query({
        query: GET_REPOSITORY_BY_ID,
        variables: props,
      });

      console.log(response.data);

      return response.data.repository;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
