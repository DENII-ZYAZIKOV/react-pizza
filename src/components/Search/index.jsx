import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";

export default function Search() {
  const inputRef = useRef();
  const { setSearchValue } = useContext(SearchContext);
  const [value, setValue] = useState();
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    []
  );
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.imgclose}
          src="/close.svg"
          alt=""
        />
      )}
    </div>
  );
}
