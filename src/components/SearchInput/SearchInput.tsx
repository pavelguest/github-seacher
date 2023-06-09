import { ChangeEvent, FC } from "react";
import styles from "./SearchInput.module.scss";

interface ISearchInput {
  onSearch: (value: string) => void;
  value: string;
}

const SearchInput: FC<ISearchInput> = ({ onSearch, value }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Search"
      value={value}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
