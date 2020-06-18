export interface IBasicReduxStore {
  data: { [key: string]: any };
  error: any;
  loading: boolean;
}
