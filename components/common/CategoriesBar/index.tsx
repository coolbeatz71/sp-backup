import React, { FC } from "react";
import styles from "./categoriesbar.module.scss";
import { Icategories } from "./../../../interfaces/categories";
import { Input } from "components/common/Input";
import { PRIMARY_LIGHT } from "./../../../constants/colors";

export interface CategoriesBarProps {
  categories: { [key: string]: any };
}

const CategoriesBar: FC<CategoriesBarProps> = ({ categories }) => {
  const { data, fetched, error } = categories;
  return (
    <div className={styles.categoriesBar}>
      <div className={styles.categoriesBar__list}>
        <span>All</span>
        {fetched &&
          !error &&
          data.data.map((category: Icategories, index: number) => (
            <span key={index}>{category.title}</span>
          ))}
      </div>
      <Input placeholder="Search" style={{ backgroundColor: PRIMARY_LIGHT }} />
    </div>
  );
};

export default CategoriesBar;
