import { FC, ReactElement, useEffect, useState } from "react";

import { Row, Col, Menu, Input, Dropdown, Button, Checkbox, Grid } from "antd";
import { useRouter } from "next/router";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { filter } from "lodash";
import { useTranslation } from "react-i18next";
import { CatType } from "helpers/context";
import capitalize from "helpers/capitalize";
import CustomIcon from "components/common/CustomIcon";
import { ALL_CAUSES_PATH } from "helpers/paths";

interface Props {
  categories: CatType[];
  baseUrl?: string;
  scrolled: string;
}

const CategoryBar: FC<Props> = ({
  categories,
  baseUrl = "/causes",
  scrolled,
}) => {
  const screens = Grid.useBreakpoint();
  const { query, pathname, asPath, push } = useRouter();

  const feed_types = ["popular", "sponsored"];
  const statuses =
    pathname === ALL_CAUSES_PATH
      ? ["active", "paused", "cancelled", "completed"]
      : ["active", "pending", "paused", "cancelled", "completed"];

  const [search, setSearch] = useState<any>(query?.search || "");
  const [fetched, setFetched] = useState(true);

  const [feed_type, setFeed_type] = useState<any>(
    query?.feed_type ? `${query?.feed_type}`.split(",") : [],
  );

  const [status, setStatus] = useState<any>(
    query?.status ? `${query?.status}`.split(",") : [],
  );

  const [visible, setVisible] = useState(false);

  const scrollHandler = () => {
    if (window.pageYOffset > 200) setVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    setStatus(query?.status ? `${query?.status}`.split(",") : []);
    setFeed_type(query?.feed_type ? `${query?.feed_type}`.split(",") : []);
  }, [pathname, query, asPath]);

  const category_id: any = query?.category_id || baseUrl;

  const navigate = (data: { [key: string]: any } = {}) => {
    const query: { [key: string]: any } = {};

    if (![baseUrl, "", undefined, null].includes(category_id)) {
      query.category_id = category_id;
    }

    if (![baseUrl, "", undefined, null].includes(search)) {
      query.search = search;
    }

    if (feed_type.length !== 0) {
      query.feed_type = feed_type.join(",");
    }

    if (status.length !== 0) {
      query.status = status.join(",");
    }

    Object.keys(data).map((key) => {
      if ([baseUrl, "", undefined, null].includes(data[key])) {
        delete query[key];
      } else {
        query[key] = data[key];
      }
    });

    setVisible(false);
    setFetched(true);

    push({
      query,
      pathname: baseUrl,
    });
  };

  const { t } = useTranslation();

  const categoryTitles = { [baseUrl]: capitalize(t("all")) };
  categories.map(({ id, title }) => (categoryTitles[id] = title));

  const Wrapper: FC<{ children: ReactElement }> = ({ children }) =>
    screens.lg ? (
      children
    ) : (
      <Dropdown
        arrow
        placement="bottomLeft"
        overlay={children}
        trigger={["click"]}
        overlayStyle={{ position: "fixed" }}
      >
        <Button
          size={scrolled !== "" ? "small" : "middle"}
          type="primary"
          ghost={`${category_id}` === baseUrl}
        >
          {capitalize(t(categoryTitles[`${category_id}`]))} <DownOutlined />
        </Button>
      </Dropdown>
    );

  return (
    <Row gutter={24} align="middle">
      <Col flex={1}>
        <Wrapper>
          <Menu
            mode="horizontal"
            selectedKeys={[`${category_id}`]}
            onClick={({ key }) => {
              navigate({ category_id: key });
            }}
          >
            <Menu.Item key={baseUrl}>
              {capitalize(t(categoryTitles[baseUrl]))}
            </Menu.Item>
            {categories.map(({ id, title }) => (
              <Menu.Item key={id}>{capitalize(t(title))}</Menu.Item>
            ))}
          </Menu>
        </Wrapper>
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
                query?.feed_type ? `${query?.feed_type}`.split(",") : [],
              );
              setStatus(query?.status ? `${query?.status}`.split(",") : []);
            }
          }}
          overlayStyle={{
            position: "fixed",
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
                    theKeys = filter(theKeys, (i) => i !== key);
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
                  {t(`${key}_causes`)}
                </Menu.Item>
              ))}
              <Menu.Divider />
              {statuses.map((key) => (
                <Menu.Item key={key}>
                  <Checkbox checked={status.includes(key)} />
                  &nbsp;&nbsp;&nbsp;
                  {t(`${key}_causes`)}
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
                    {t("reset")}
                  </Button>
                </Col>
                <Col>
                  <Button
                    key="ok"
                    type="primary"
                    size="small"
                    onClick={() => navigate()}
                    disabled={
                      feed_type.length === 0 && status.length === 0 && fetched
                    }
                  >
                    {t("ok")}
                  </Button>
                </Col>
              </Row>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            size={scrolled !== "" ? "small" : "middle"}
            type="primary"
            icon={<CustomIcon type="config" />}
            ghost={feed_type.length === 0 && status.length === 0}
          />
        </Dropdown>
      </Col>
      <Col data-search-col={scrolled !== "" ? "scrolled" : ""}>
        <Input
          size={scrolled !== "" ? "small" : "middle"}
          placeholder={t("search")}
          prefix={<SearchOutlined />}
          allowClear={screens.lg}
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
