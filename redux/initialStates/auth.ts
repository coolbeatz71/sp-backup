export interface IauthCurrentUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: any;
  email?: string;
}

export const authCurrentUserDefault = {
  first_name: "",
  last_name: "",
  phone_number: "",
  password: "",
  email: "",
};

export default {
  signup: {
    message: {},
    error: {},
    loading: false,
  },
  sendConfirmationCode: {
    currentUser: authCurrentUserDefault,
    error: {},
    loading: false,
  },
  login: {
    message: {},
    error: {},
    loading: false,
  },
};

export interface Iauth {
  signup: {
    message: {};
    error: any;
    loading: boolean;
  };
  login: {
    message: {};
    error: any;
    loading: boolean;
  };
  sendConfirmationCode: {
    currentUser: IauthCurrentUser;
    error: any;
    loading: boolean;
  };
}
