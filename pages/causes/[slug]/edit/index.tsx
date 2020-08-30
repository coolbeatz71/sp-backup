import React from "react";
import getCauseInitialProps from "helpers/getCauseInitialProps";
import { NextPage } from "next";

import Cause from "pages/causes/[slug]";

interface Props {
  cause: { [key: string]: any };
  error: null | { [key: string]: any };
  edit?: boolean;
}

const Edit: NextPage<Props> = ({ cause, error }) => {
  return <Cause edit cause={cause} error={error} />;
};

Edit.getInitialProps = getCauseInitialProps;

export default Edit;
