import styles from "./HeaderMenu.module.scss";

const HeaderMenu = () => {
  return (
    <div className={styles.headerMenu}>
      <h2 className={styles.headerTitle}>Github Searcher</h2>
    </div>
  );
};

export default HeaderMenu;
