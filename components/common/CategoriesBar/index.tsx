import React, { FC } from "react";
import { useRouter } from "next/router";
import styles from "./categoriesbar.module.scss";
import { isEmpty } from "lodash";
import { Input } from "components/common/Input";
import { Icategories } from "./../../../interfaces/categories";
import { PRIMARY_LIGHT } from "./../../../constants/colors";
import { ALL_CAUSES_PATH } from "./../../../helpers/paths";

export interface CategoriesBarProps {
  categories: { [key: string]: any };
}

const CategoriesBar: FC<CategoriesBarProps> = ({ categories }) => {
  let url: string;
  const { query, push } = useRouter();
  const { category_id } = query;
  const { data, fetched, error } = categories;

  const onCategoryClick = (categoryId?: number): void => {
    url =
      categoryId && typeof categoryId === "number"
        ? `${ALL_CAUSES_PATH}?category_id=${categoryId}`
        : ALL_CAUSES_PATH;
    push(url);
  };

  const onSearchKeyPress = (e: any) => {
    const keyword = e.target.value;
    if (e.key === "Enter") {
      url = !isEmpty(keyword.trim())
        ? `${ALL_CAUSES_PATH}?search=${keyword}`
        : ALL_CAUSES_PATH;
      push(url);
    }
  };

  return (
    <div className={styles.categoriesBar}>
      <div className={styles.categoriesBar__list}>
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
      </div>
      <Input
        placeholder="Search"
        onKeyPress={(e) => onSearchKeyPress(e)}
        style={{ backgroundColor: PRIMARY_LIGHT }}
      />
    </div>
  );
};

export default CategoriesBar;
