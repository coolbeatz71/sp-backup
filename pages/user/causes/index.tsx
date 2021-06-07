import { FC } from "react";
import { GetServerSidePropsContext } from "next";
import { SvpType } from "helpers/context";

import AllCauses from "pages/causes";
import requireAuth, { checkUserAuth } from "helpers/requiresAuth";

interface Props {
  svpProps: SvpType;
}

export const getServerSideProps = requireAuth(
  async (context: GetServerSidePropsContext) => checkUserAuth(context),
);

const MyCauses: FC<Props> = ({ svpProps }) => {
  return <AllCauses svpProps={svpProps} myCauses baseUrl="/user/causes" />;
};

export default MyCauses;
