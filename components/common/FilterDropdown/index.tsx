import React, { FC, useState, useEffect } from "react";
import { useMedia } from "react-use";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useForm } from "antd/lib/form/Form";
import { Select, Divider, Form, Button, Checkbox } from "antd";
import styles from "./filterDropdown.module.scss";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { USER_CAUSES_PATH } from "helpers/paths";
import {
  statusOptions,
  feedTypeOptions,
  userCauseStatusOptions,
} from "constants/filterOptions";

export interface FilterDropdownProps {
  page: string;
}

const FilterDropdown: FC<FilterDropdownProps> = ({ page }) => {
  let url: {};
  const [form] = useForm();
  const isMobile = useMedia("(max-width: 768px)");
  const { push, pathname, query, asPath } = useRouter();
  const { feed_type, status } = query;

  const [statusFilter, setStatusFilter] = useState(Array());
  const [feedTypeFilter, setFeedTypeFilter] = useState(Array());
  const [checkedStatus, setCheckedStatus] = useState<any>([]);
  const [checkedFeedType, setCheckedFeedType] = useState<any>([]);

  const getCheckedFeedType = () => {
    return !isEmpty(query) && !isEmpty(feed_type)
      ? feed_type.toString().split(",")
      : [];
  };

  const getCheckedStatus = () => {
    return !isEmpty(query) && !isEmpty(status)
      ? status.toString().split(",")
      : [];
  };

  useEffect(() => {
    setCheckedStatus(getCheckedStatus());
    setCheckedFeedType(getCheckedFeedType());
    // tslint:disable-next-line: align
  }, [pathname, query, asPath]);

  const resetFilter = () => {
    form.resetFields();

    delete query.feed_type;
    delete query.status;

    setCheckedStatus([]);
    setCheckedFeedType([]);
    setStatusFilter([]);
    setFeedTypeFilter([]);

    push({
      pathname,
      query: { ...query },
    });
  };

  const submitFilter = () => {
    if (isEmpty(feedTypeFilter) && isEmpty(statusFilter)) {
      delete query.feed_type;
      delete query.status;
      setCheckedStatus([]);
      setCheckedFeedType([]);

      url = {
        pathname,
        query: { ...query },
      };
    } else if (!isEmpty(feedTypeFilter) && isEmpty(statusFilter)) {
      const feedType = feedTypeFilter.join(",");
      delete query.status;
      setCheckedStatus([]);

      url = {
        pathname,
        query: { ...query, feed_type: feedType },
      };
    } else if (!isEmpty(statusFilter) && isEmpty(feedTypeFilter)) {
      const status = statusFilter.join(",");
      delete query.feed_type;
      setCheckedFeedType([]);

      url = {
        pathname,
        query: { ...query, status },
      };
    } else {
      const status = statusFilter.join(",");
      const feedType = feedTypeFilter.join(",");
      url = {
        pathname,
        query: { ...query, status, feed_type: feedType },
      };
    }

    push(url);
  };

  const onChangeFeedType = (checkedValues: CheckboxValueType[]) => {
    setFeedTypeFilter([...checkedValues]);
  };

  const onChangeStatus = (checkedValues: CheckboxValueType[]) => {
    setStatusFilter([...checkedValues]);
  };

  const dropdownMenu = (
    <div className={styles.filterDropdown__menu}>
      <Form form={form} onFinish={submitFilter}>
        <Form.Item name="feedType">
          <div className={styles.filterDropdown__menu__feedType}>
            <Checkbox.Group
              style={{ width: "100%" }}
              options={feedTypeOptions}
              onChange={onChangeFeedType}
              defaultValue={checkedFeedType}
            />
          </div>
        </Form.Item>
        <Divider plain className={styles.filterDropdown__menu__divider} />
        <Form.Item name="status">
          <div className={styles.filterDropdown__menu__status}>
            <Checkbox.Group
              style={{ width: "100%" }}
              options={
                page === USER_CAUSES_PATH
                  ? userCauseStatusOptions
                  : statusOptions
              }
              onChange={onChangeStatus}
              defaultValue={checkedStatus}
            />
          </div>
        </Form.Item>
        <Divider plain />
        <div className={styles.filterDropdown__menu__footer}>
          <Button
            size="small"
            type="link"
            htmlType="reset"
            onClick={resetFilter}
          >
            Reset
          </Button>
          <Button className="btn-primary" htmlType="submit" size="small">
            OK
          </Button>
        </div>
      </Form>
    </div>
  );

  return (
    <div className={styles.filterDropdown}>
      <Select
        showArrow={false}
        dropdownRender={() => dropdownMenu}
        dropdownAlign={
          !isMobile && {
            points: ["tr", "br"],
            offset: [0, 6],
            overflow: {
              adjustX: false,
              adjustY: true,
            },
          }
        }
        className={
          !isEmpty(feed_type) || !isEmpty(status) ? "ant-select-focused" : ""
        }
        placeholder={<div className="select-icon" />}
      />
    </div>
  );
};

export default FilterDropdown;
