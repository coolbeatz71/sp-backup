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
import verifiedGrey from "./svg/verifiedGrey";
import ussd from "./svg/ussd";
import config from "./svg/config";
import bell from "./svg/bell";
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
  verifiedGrey,
  ussd,
  config,
  bell,
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
