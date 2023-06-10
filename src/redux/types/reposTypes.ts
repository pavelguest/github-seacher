export interface IInitialState {
  query: string;
  page: number;
  perPage: number;
  reposList: IRepos[];
  loading: boolean;
  errorMessage: string;
  currentRepoDetails: null | ICurrentRepo;
  pageInfo: null | IPageInfo;
  searchParams: null | ISearchParams;
}

export interface ISearchParams {
  page: number;
  element: string;
  type: string;
}

export interface IPageInfo {
  totalRepos: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
  startCursor: string;
}

export interface IRepos {
  node: {
    id: string;
    name: string;
    pushedAt: string;
    stargazerCount: number;
    url: string;
    owner: {
      login: string;
    };
  };
}

export interface ICurrentRepo {
  description: string;
  id: string;
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  pushedAt: string;
  stargazerCount: number;
  name: string;
  languages: {
    edges: {
      node: {
        id: string;
        name: string;
      };
    }[];
  };
}

export interface ISearchReposParams {
  query: string;
  first: number | null;
  last: number | null;
  after?: string | null;
  before?: string | null;
}

export interface IGetRepoByIdParams {
  username: string;
  repoName: string;
  first: number;
}
