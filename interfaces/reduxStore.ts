export interface IBasicReduxStore {
  data: { [key: string]: any };
  error: any;
  loading: boolean;
}

export const basicReduxStoreDefault = {
  data: {},
  loading: false,
  error: "",
};
