import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

const BackButton = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button className={styles.backButton} onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
