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
  create: {
    data: {},
    loading: false,
    error: "",
  },
};

export interface ICauseFeed {
  data: { [key: string]: any };
  loading: boolean;
  error: any;
  fetched: boolean;
}

export interface ICause {
  feed: ICauseFeed;
  user: ICauseFeed;
  create: {
    data: { [key: string]: any };
    error: string;
    loading: boolean;
  };
}
