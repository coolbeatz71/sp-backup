import React from "react";
import Icon from "@ant-design/icons";

import dashboard from "./svg/dashboard";
import causes from "./svg/causes";
import wallet from "./svg/wallet";
import settings from "./svg/settings";
import signOut from "./svg/sign-out";

import total from "./svg/total";
import completed from "./svg/completed";
import ongoing from "./svg/ongoing";
import pending from "./svg/pending";
import paused from "./svg/paused";
import cancelled from "./svg/cancelled";

import save from "./svg/save";
import verified from "./svg/verified";
import ussd from "./svg/ussd";
import config from "./svg/config";
import notFound from "./svg/404";

const icons: { [key: string]: any } = {
  dashboard,
  causes,
  wallet,
  settings,
  total,
  completed,
  ongoing,
  pending,
  paused,
  cancelled,
  save,
  verified,
  ussd,
  config,
  404: notFound,
  "sign-out": signOut,
};

interface Props {
  type: string;
}

const CustomIcon: React.FC<Props & { [key: string]: any }> = ({
  type,
  ...props
}) => {
  return <Icon component={icons[type]} {...props} />;
};

export default CustomIcon;
