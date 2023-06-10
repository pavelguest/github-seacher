import { FC } from "react";
import { IRepos } from "../../redux/types/reposTypes";
import styles from "./RepoList.module.scss";
import dayjs from "dayjs";

interface IRepoList {
  repos: IRepos[];
  handleNavigateToRepoDetails: (username: string, repoName: string) => void;
}

const RepoList: FC<IRepoList> = ({ repos, handleNavigateToRepoDetails }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Stars</th>
          <th>Last Commit</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo, index) => (
          <tr
            key={repo.node.id}
            onClick={() =>
              handleNavigateToRepoDetails(repo.node.owner.login, repo.node.name)
            }
          >
            <td>{index + 1}</td>
            <td>{repo.node.name}</td>
            <td>{repo.node.stargazerCount}</td>
            <td>{dayjs(repo.node.pushedAt).format("HH:mm DD.MM.YYYY")}</td>
            <td>{repo.node.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RepoList;
