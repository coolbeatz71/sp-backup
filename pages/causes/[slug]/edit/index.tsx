import getCauseInitialProps from "helpers/getCauseInitialProps";
import requireAuth, { checkUserAuth } from "helpers/requiresAuth";
import { GetServerSidePropsContext, NextPage } from "next";

import Cause from "pages/causes/[slug]";

interface Props {
  cause: { [key: string]: any };
  error: null | { [key: string]: any };
  edit?: boolean;
}

export const getServerSideProps = requireAuth(
  async (context: GetServerSidePropsContext) => checkUserAuth(context),
);

const Edit: NextPage<Props> = ({ cause, error }) => {
  return <Cause edit cause={cause} error={error} />;
};

Edit.getInitialProps = getCauseInitialProps;

export default Edit;
