import React, { FC, useState, useEffect } from "react";
import { isEmpty } from "lodash";
import styles from "./searchinput.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getKeyword } from "../../../redux/actions/search/getKeyword";
import { Form, Input } from "antd";
import { FormInstance } from "antd/lib/form/Form";

export interface SearchInputProps {
  page: string;
  formRef: FormInstance;
}

const SearchInput: FC<SearchInputProps> = ({ formRef, page }) => {
  let url: {};
  const { push, pathname, query } = useRouter();
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    getKeyword(searchKeyword)(dispatch);
    const delayTimer = setTimeout(() => {
      if (!isEmpty(searchKeyword.trim())) {
        url = {
          pathname,
          query: { ...query, search: searchKeyword },
        };

        push(url);
      }
      // tslint:disable-next-line: align
    }, 3000);

    return () => clearTimeout(delayTimer);
    // tslint:disable-next-line: align
  }, [dispatch, searchKeyword]);

  const onSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value;
    if (e.key === "Enter") {
      if (isEmpty(keyword.trim())) {
        delete query.search;
        url = {
          pathname,
          query: { ...query },
        };
      } else {
        url = {
          pathname: page,
          query: { ...query, search: keyword },
        };
      }

      push(url);
    }
  };

  return (
    <Form form={formRef} className={styles.searchinput}>
      <Form.Item name="search_input">
        <div className="input_input__16Q5e searchinput_searchinput__1J7uG">
          <Input
            placeholder="Search"
            onKeyPress={(e) => onSearchKeyPress(e)}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default SearchInput;
