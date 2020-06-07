export default {
  feed: {
    data: {},
    loading: false,
    error: null,
    fetched: false,
  },
  user: {
    data: {},
    loading: false,
    error: null,
    fetched: false,
  },
};

export interface ICauseFeed {
  data: { [key: string]: any };
  loading: boolean;
  error: any;
  fetched: boolean;
}

export interface ICauses {
  feed: ICauseFeed;
  user: ICauseFeed;
}
