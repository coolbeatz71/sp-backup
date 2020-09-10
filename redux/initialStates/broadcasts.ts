export default {
  broadcasts: {
    data: {},
    loading: false,
    error: null,
    fetched: false,
  },
};

export interface IAllBroadcasts {
  broadcasts: {
    data: { [key: string]: any };
    loading: boolean;
    error: any;
    fetched: boolean;
  };
}
