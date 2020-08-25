import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { getAllCauses } from "./../../redux/actions/cause/getAll";
import { isEmpty, find } from "lodash";

import validator from "validator";

import { Row, Col, Result } from "antd";

import { SvpType } from "helpers/context";

import Jumbotron from "components/home/Jumbotron";
import Cause from "components/cards/Cause";
import CauseSkeleton from "components/cards/CauseSkeleton";

import LayoutWrapper from "components/LayoutWrapper";

interface Props {
  svpProps: SvpType;
}

const AllCauses: React.FC<Props> = ({ svpProps }) => {
  const dispatch = useDispatch();
  const { asPath, query } = useRouter();

  const { data, loading, fetched, error } = useSelector(
    ({ cause: { all } }: IRootState) => all,
  );

  const category_id: any = query.category_id;
  const category: any = find(svpProps.categories, {
    id: validator.isNumeric(`${category_id}`) ? category_id * 1 : category_id,
  });

  useEffect(() => {
    getAllCauses(asPath)(dispatch);
  }, [asPath, dispatch]);

  return (
    <LayoutWrapper
      title={`${category ? `${category.title} ` : ""}Causes`}
      isCategory
    >
      <div data-content-padding>
        {error ? (
          <Result
            status="500"
            title="Oooops!"
            subTitle={
              <div>
                Something went wrong.
                <br />
                {error.message}
              </div>
            }
          />
        ) : !fetched ? (
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4, 5, 6].map((index: number) => (
              <Col
                key={index}
                xxl={{ span: 6, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 16, offset: 4 }}
                xs={{ span: 24, offset: 0 }}
              >
                <CauseSkeleton />
              </Col>
            ))}
          </Row>
        ) : isEmpty(data.data) ? (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, No causes were found"
          />
        ) : (
          <Row data-section-row={data.length} gutter={[24, 48]}>
            {data.data.map((cause: any, index: number) => (
              <Col
                key={index}
                xxl={{ span: 6, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 16, offset: 4 }}
                xs={{ span: 24, offset: 0 }}
              >
                <Cause cause={cause} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Jumbotron hideSignedIn />
    </LayoutWrapper>
  );
};

export default AllCauses;
