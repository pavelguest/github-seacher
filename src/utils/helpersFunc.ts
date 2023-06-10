import { IRepos } from "../redux/types/reposTypes";

export const paginate = (
  array: IRepos[],
  page_size: number,
  page_number: number
) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
