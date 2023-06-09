import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <p>loading...</p>
    </div>
  );
};

export default Spinner;
