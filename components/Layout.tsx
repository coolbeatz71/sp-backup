import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/common/header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { withRedux } from "helpers/with-redux-store";
import getCurrentUser from "redux/actions/user/getCurrentUser";
import { IRootState } from "redux/initialStates";
import { isEmpty } from "lodash";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Save Plus",
}) => {
  const dispatch = useDispatch();
  const { isLoggedin, loading, data } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  useEffect(() => {
    if (!loading && isLoggedin && isEmpty(data)) {
      getCurrentUser(dispatch);
    }
  }, []);

  return (
    <div>
      <Header title={title} />
      <Navbar />
      <div className="children-container">{children}</div>
      <Footer />
    </div>
  );
};

export default withRedux(Layout);
