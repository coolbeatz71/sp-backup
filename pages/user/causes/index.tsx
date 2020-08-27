import React from "react";
import { SvpType } from "helpers/context";
import AllCauses from "pages/causes";

interface Props {
  svpProps: SvpType;
}

const MyCauses: React.FC<Props> = ({ svpProps }) => {
  return <AllCauses svpProps={svpProps} myCauses baseUrl="/user/causes" />;
};

export default MyCauses;
