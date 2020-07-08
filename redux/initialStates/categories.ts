export default {
  categories: {
    data: {},
    loading: false,
    error: null,
    fetched: false,
  },
  hide: false,
};

export interface IAllCategories {
  categories: {
    data: { [key: string]: any };
    loading: boolean;
    error: any;
    fetched: boolean;
  };
  hide: boolean;
}
