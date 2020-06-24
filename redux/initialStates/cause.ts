import { IBasicReduxStore, basicReduxStoreDefault } from "interfaces/reduxStore";

export default {
  all: {
    data: {},
    loading: false,
    error: null,
    fetched: false,
  },
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
  single: {
    data: {},
    loading: false,
    error: "",
  },
  donate: basicReduxStoreDefault,
  stop: {
    data: {},
    loading: false,
    error: "",
  },
  edit: basicReduxStoreDefault,
};

export interface ICauseFeed {
  data: { [key: string]: any };
  loading: boolean;
  error: any;
  fetched: boolean;
}

export interface ICause {
  all: ICauseFeed;
  feed: ICauseFeed;
  user: ICauseFeed;
  create: {
    data: { [key: string]: any };
    error: string;
    loading: boolean;
  };
  single: {
    data: { [key: string]: any };
    error: any;
    loading: boolean;
  };
  donate: IBasicReduxStore;
  stop: IBasicReduxStore;
  edit: IBasicReduxStore;
}
