export default {
  categories: {
    data: {},
    loading: false,
    error: null,
    fetched: false,
  },
};

export interface IAllCategories {
  categories: {
    data: { [key: string]: any };
    loading: boolean;
    error: any;
    fetched: boolean;
  };
}
