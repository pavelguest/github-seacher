import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { HeaderMenu } from "../../components/HeaderMenu";

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <HeaderMenu />
      <div className={styles.mainLayoutContent}>
        <Outlet />
      </div>
      <footer className={styles.mainLayoutFooter}>
        <span className={styles.footer__item}>© 2023</span>
        <span className={styles.footer__item}>Pavel Puchynski</span>
      </footer>
    </div>
  );
};

export default MainLayout;
