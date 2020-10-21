import {
  IBasicReduxStore,
  basicReduxStoreDefault,
} from "interfaces/reduxStore";
import { UploadFile } from "antd/es/upload/interface";

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
    croppedImage: [],
    loading: false,
    error: null,
  },
  single: {
    data: {},
    loading: false,
    error: "",
    accessCode: "",
  },
  donors: {
    data: {
      search: [],
      get: [],
    },
    loading: {
      search: false,
      get: false,
    },
    error: {
      search: null,
      get: null,
    },
    meta: {
      search: {},
      get: {},
    },
  },
  moreDonors: {
    data: [],
    loading: false,
  },
  donate: basicReduxStoreDefault,
  pause: basicReduxStoreDefault,
  edit: basicReduxStoreDefault,
  cancel: basicReduxStoreDefault,
  resume: basicReduxStoreDefault,
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
    croppedImage: UploadFile[];
    error: string | null;
    loading: boolean;
  };
  single: {
    data: { [key: string]: any };
    error: any;
    loading: boolean;
    accessCode: string;
  };
  donors: {
    data: { [key: string]: any };
    error: any;
    loading: { [key: string]: boolean };
    meta: { [key: string]: any };
  };
  moreDonors: {
    data: { [key: string]: any }[];
    loading: boolean;
  };
  donate: IBasicReduxStore;
  pause: IBasicReduxStore;
  edit: IBasicReduxStore;
  cancel: IBasicReduxStore;
  resume: IBasicReduxStore;
}
