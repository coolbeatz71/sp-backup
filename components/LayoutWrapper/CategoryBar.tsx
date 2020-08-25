import React from "react";

import { Row, Col, Menu, Input, Dropdown, Button, Checkbox } from "antd";
import { useRouter } from "next/router";
import { SearchOutlined, ControlOutlined } from "@ant-design/icons";
import _ from "lodash";
import { CatType } from "helpers/context";
import capitalize from "helpers/capitalize";

interface Props {
  categories: CatType[];
}

const feed_types = ["popular", "sponsored"];
const statuses = ["active", "pending", "paused", "cancelled", "completed"];

const CategoryBar: React.FC<Props> = ({ categories }) => {
  const router = useRouter();

  const [search, setSearch] = React.useState<any>(router.query?.search || "");

  const [fetched, setFetched] = React.useState(true);

  const [feed_type, setFeed_type] = React.useState<any>(
    router.query?.feed_type ? `${router.query?.feed_type}`.split(",") : [],
  );

  const [status, setStatus] = React.useState<any>(
    router.query?.status ? `${router.query?.status}`.split(",") : [],
  );

  const [visible, setVisible] = React.useState(false);

  const category_id: any = router.query?.category_id || "/causes";

  const navigate = (data: { [key: string]: any } = {}) => {
    const query: { [key: string]: any } = {};

    if (!["/causes", "", undefined, null].includes(category_id)) {
      query.category_id = category_id;
    }

    if (!["/causes", "", undefined, null].includes(search)) {
      query.search = search;
    }

    if (feed_type.length !== 0) {
      query.feed_type = feed_type.join(",");
    }

    if (status.length !== 0) {
      query.status = status.join(",");
    }

    Object.keys(data).map((key) => {
      if (["/causes", "", undefined, null].includes(data[key])) {
        delete query[key];
      } else {
        query[key] = data[key];
      }
    });

    setVisible(false);
    setFetched(true);

    router.push({
      query,
      pathname: "/causes",
    });
  };

  return (
    <Row gutter={24} align="middle">
      <Col flex={1}>
        <Menu
          mode="horizontal"
          selectedKeys={[`${category_id}`]}
          onClick={({ key }) => {
            navigate({ category_id: key });
          }}
        >
          <Menu.Item key="/causes">All</Menu.Item>
          {categories.map(({ id, title }) => (
            <Menu.Item key={id}>{title}</Menu.Item>
          ))}
        </Menu>
      </Col>
      <Col>
        <Dropdown
          arrow
          placement="bottomRight"
          visible={visible}
          onVisibleChange={(v) => {
            setVisible(v);
            if (!v && !fetched) {
              setFeed_type(
                router.query?.feed_type
                  ? `${router.query?.feed_type}`.split(",")
                  : [],
              );
              setStatus(
                router.query?.status
                  ? `${router.query?.status}`.split(",")
                  : [],
              );
            }
          }}
          overlay={
            <Menu
              selectedKeys={[...feed_type, ...status]}
              onClick={({ key }) => {
                if (key) {
                  setFetched(false);
                  let theKeys: any = [];
                  if (feed_types.includes(`${key}`)) theKeys = [...feed_type];
                  if (statuses.includes(`${key}`)) theKeys = [...status];

                  if (theKeys.includes(`${key}`)) {
                    theKeys = _.filter(theKeys, (i) => i !== key);
                  } else {
                    theKeys.push(`${key}`);
                  }

                  if (feed_types.includes(`${key}`)) setFeed_type(theKeys);
                  if (statuses.includes(`${key}`)) setStatus(theKeys);
                }
              }}
            >
              {feed_types.map((key) => (
                <Menu.Item key={key}>
                  <Checkbox checked={feed_type.includes(key)} />
                  &nbsp;&nbsp;&nbsp;
                  {capitalize(key)}
                </Menu.Item>
              ))}
              <Menu.Divider />
              {statuses.map((key) => (
                <Menu.Item key={key}>
                  <Checkbox checked={status.includes(key)} />
                  &nbsp;&nbsp;&nbsp;
                  {capitalize(key)}
                </Menu.Item>
              ))}
              <Menu.Divider />
              <Row
                justify="space-between"
                style={{
                  marginLeft: 5,
                  marginRight: 12,
                  marginTop: 12,
                  marginBottom: 8,
                }}
              >
                <Col>
                  <Button
                    key="reset"
                    type="text"
                    size="small"
                    onClick={() => {
                      setFeed_type([]);
                      setStatus([]);
                      if (fetched) navigate({ feed_type: null, status: null });
                    }}
                    disabled={feed_type.length === 0 && status.length === 0}
                  >
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button
                    key="ok"
                    type="primary"
                    size="small"
                    onClick={() => navigate()}
                    disabled={feed_type.length === 0 && status.length === 0}
                  >
                    OK
                  </Button>
                </Col>
              </Row>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="primary" icon={<ControlOutlined />} ghost />
        </Dropdown>
      </Col>
      <Col>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          allowClear
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.type !== "change") navigate({ search: "" });
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if ([null, "", undefined].includes(search)) {
                setSearch("");
              } else {
                navigate();
              }
            }
          }}
        />
      </Col>
    </Row>
  );
};

export default CategoryBar;
