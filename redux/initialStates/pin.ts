export default {
  reset: {
    data: {},
    error: {},
    message: {},
    loading: false,
  },
  reset_update: {
    data: {},
    error: {},
    message: {},
    loading: false,
  },
  change: {
    data: {},
    error: {},
    message: {},
    loading: false,
  },
};

export interface IPinReset {
  reset: {
    data: { [key: string]: any };
    message: {};
    loading: boolean;
    error: any;
  };
  reset_update: {
    data: { [key: string]: any };
    message: {};
    loading: boolean;
    error: any;
  };
  change: {
    data: { [key: string]: any };
    message: {};
    loading: boolean;
    error: any;
  };
}
