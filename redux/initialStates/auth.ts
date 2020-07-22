import { authContextType } from "interfaces/authContext";

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

export const auth: Iauth =  {
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
  logout: {
    message: {},
    error: {},
    loading: false,
  },
  showAuthDialog: {
    state: false,
    context: "login",
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
  logout: {
    message: {};
    error: any;
    loading: boolean;
  };
  sendConfirmationCode: {
    currentUser: IauthCurrentUser;
    error: any;
    loading: boolean;
  };
  showAuthDialog: {
    state: boolean,
    context: authContextType,
  };
}
