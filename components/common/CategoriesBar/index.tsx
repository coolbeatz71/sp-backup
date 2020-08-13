import React, { FC } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Icategories } from "./../../../interfaces/categories";
import { IRootState } from "redux/initialStates";
import styles from "./categoriesbar.module.scss";
import SearchInput from "../SearchInput";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface CategoriesBarProps {
  categories: { [key: string]: any };
  page: string;
}

const CategoriesBar: FC<CategoriesBarProps> = ({ categories, page }) => {
  let url: string;
  const { query, push } = useRouter();
  const { category_id } = query;
  const { data, fetched, error, loading } = categories;

  const onCategoryClick = (categoryId?: number): void => {
    url =
      categoryId && typeof categoryId === "number"
        ? `${page}?category_id=${categoryId}`
        : page;
    push(url);
  };

  const { keyword } = useSelector(({ search }: IRootState) => search);

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
      <SearchInput defaultValue={keyword} page={page} />
    </div>
  );
};

export default CategoriesBar;
