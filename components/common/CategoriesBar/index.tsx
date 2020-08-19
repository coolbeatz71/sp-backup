import React, { FC } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Icategories } from "./../../../interfaces/categories";
import styles from "./categoriesbar.module.scss";
import SearchInput from "../SearchInput";
import { Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { LoadingOutlined } from "@ant-design/icons";
import { getKeyword } from "redux/actions/search/getKeyword";
import FilterDropdown from "../FilterDropdown";

export interface CategoriesBarProps {
  categories: { [key: string]: any };
  page: string;
}

const CategoriesBar: FC<CategoriesBarProps> = ({ categories, page }) => {
  let url: {};
  const [form] = useForm();
  const dispatch = useDispatch();
  const { push, pathname, query } = useRouter();
  const { category_id } = query;
  const { data, fetched, error, loading } = categories;

  const onCategoryClick = (categoryId?: number): void => {
    delete query.search;
    getKeyword("")(dispatch);
    if (typeof categoryId === "number") {
      form.resetFields(["search_input"]);
      url = {
        pathname,
        query: { ...query, category_id: categoryId },
      };
    } else {
      url = { pathname };
    }

    push(url);
  };

  return (
    <div className={styles.categoriesBar}>
      <div className={styles.categoriesBar__list}>
        {loading ? (
          <Spin indicator={<LoadingOutlined spin={loading} />} />
        ) : (
          <>
            <span
              onClick={() => onCategoryClick()}
              className={
                query === {} || !category_id
                  ? `${styles.categoriesBar__list__active}`
                  : ""
              }
            >
              All
            </span>

            {fetched &&
              !error &&
              data.data.map((category: Icategories) => (
                <span
                  onClick={() => onCategoryClick(category.id)}
                  className={
                    category_id === category.id.toString()
                      ? `${styles.categoriesBar__list__active}`
                      : ""
                  }
                  key={category.id}
                >
                  {category.title}
                </span>
              ))}
          </>
        )}
      </div>
      <div className={styles.categoriesBar__filterSearch}>
        <FilterDropdown page={page} />
        <SearchInput formRef={form} page={page} />
      </div>
    </div>
  );
};

export default CategoriesBar;
