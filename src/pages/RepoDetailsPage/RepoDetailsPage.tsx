import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { getRepoById } from "../../redux/actions/ActionCreators";
import styles from "./RepoDetailsPage.module.scss";
import dayjs from "dayjs";
import { BackButton } from "../../components/BackButton";

const RepoDetailsPage = () => {
  const { username, repoName } = useParams<{
    username: string;
    repoName: string;
  }>();
  const dispatch = useAppDispatch();
  const { currentRepoDetails } = useAppSelector((state) => state.repos);

  useEffect(() => {
    if (username && repoName)
      dispatch(getRepoById({ username, repoName, first: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.repoContainer}>
      <BackButton />

      <div className={styles.itemsContainer}>
        <p className={styles.repoTitle}>{currentRepoDetails?.name}</p>
        <p className={styles.repoTitle}>
          {currentRepoDetails?.stargazerCount} Stars
        </p>
        <p className={styles.repoTitle}>
          Last commit:{" "}
          {dayjs(currentRepoDetails?.pushedAt).format("DD MM YYYY")}
        </p>
      </div>
      <div className={styles.itemsContainer}>
        <img
          className={styles.userImg}
          src={currentRepoDetails?.owner.avatarUrl}
          alt="user logo"
        />
        <div>
          <h2>{currentRepoDetails?.owner.login}</h2>
          <a
            className={styles.userLink}
            href={currentRepoDetails?.owner.url}
            target="_blank"
            rel="noreferrer"
          >
            <h3>{currentRepoDetails?.owner.url}</h3>
          </a>
        </div>
      </div>
      {!!currentRepoDetails?.languages.edges.length && (
        <div className={styles.itemsContainer}>
          {currentRepoDetails.languages.edges.map((lang, index) => (
            <div key={index}>
              <p>{lang.node.name}</p>
            </div>
          ))}
        </div>
      )}
      {!!currentRepoDetails?.description && (
        <div className={(styles.itemsContainer, styles.descriptionContainer)}>
          <p>{currentRepoDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default RepoDetailsPage;
