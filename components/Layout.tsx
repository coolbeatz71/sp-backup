import * as React from "react";
import Header from "components/common/header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { withRedux } from "helpers/with-redux-store";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Save Plus",
}) => (
  <div>
    <Header title={title} />
    <Navbar />
    <div className="children-container">{children}</div>
    <Footer />
  </div>
);

export default withRedux(Layout);
