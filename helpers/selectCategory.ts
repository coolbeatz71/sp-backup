import { USER_CAUSES_PATH, ALL_CAUSES_PATH } from "./paths";

const selectCategory = (page: string, categoryId?: number) => {
  let url: string = "";
  if (page === USER_CAUSES_PATH) {
    url =
      categoryId && typeof categoryId === "number"
        ? `${page}?category_id=${categoryId}`
        : page;
  } else {
    url =
      categoryId && typeof categoryId === "number"
        ? `${ALL_CAUSES_PATH}?category_id=${categoryId}`
        : ALL_CAUSES_PATH;
  }

  return url;
};

export default selectCategory;
