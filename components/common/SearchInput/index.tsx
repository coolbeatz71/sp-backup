import React, { FC, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { Input } from "../Input";
import styles from "./searchinput.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getKeyword } from "../../../redux/actions/search/getKeyword";

export interface SearchInputProps {
  page: string;
  defaultValue: string;
}

const SearchInput: FC<SearchInputProps> = ({ page, defaultValue }) => {
  let url: string;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState(defaultValue);

  useEffect(() => {
    getKeyword(searchKeyword)(dispatch);
    const delayTimer = setTimeout(() => {
      if (
        !isEmpty(searchKeyword.trim()) &&
        searchKeyword.trim() !== defaultValue.trim()
      ) {
        push(`${page}?search=${searchKeyword}`);
      }
      // tslint:disable-next-line: align
    }, 3000);

    return () => clearTimeout(delayTimer);
    // tslint:disable-next-line: align
  }, [dispatch, searchKeyword]);

  const onSearchKeyPress = (e: any) => {
    const keyword = e.target.value;
    if (e.key === "Enter") {
      url = !isEmpty(keyword.trim()) ? `${page}?search=${keyword}` : page;
      push(url);
    }
  };

  return (
    <Input
      placeholder="Search"
      className={styles.searchinput}
      defaultValue={defaultValue}
      onChange={(e) => setSearchKeyword(e.target.value)}
      onKeyPress={(e) => onSearchKeyPress(e)}
    />
  );
};

export default SearchInput;
