import React from "react";
import { Form, Switch } from "antd";
import ReactPlayer from "react-player";
import { TextArea, Input } from "components/common/Input";
import isLocation from "helpers/isLocation";

export interface DetailedInfoProps {}

const DetailedInfo: React.FC<DetailedInfoProps> = () => {
  const isEditing = isLocation(["causes", "edit"]);
  return (
    <div>
      <Form.Item
        name="summary"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, max: 280, min: 3 }]}
      >
        <TextArea
          disabled={isEditing}
          maxLength={280}
          placeholder="Summary of this Cause. "
        />
      </Form.Item>
      <Form.Item
        name="video"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[
          { max: 1000 },
          () => ({
            validator(_, value) {
              if (!value || ReactPlayer.canPlay(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Should be a valid video url"
              );
            },
          })
        ]}
      >
        <Input
          disabled={isEditing}
          placeholder="Video url"
          suffix={
            <img
              src="/icons/play-video.svg"
              className="video-url"
              alt="play video"
            />
          }
        />
      </Form.Item>
      <Form.Item
        name="description"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, max: 1000, min: 3 }]}
      >
        <TextArea
          disabled={isEditing}
          rows={6}
          maxLength={1000}
          placeholder="Details about the cause"
        />
      </Form.Item>
      <div className="d-flex justify-content-between my-4">
        <span className="font-weight-bold">
          Is this cause afflilated to any Organization/NGO{" "}
        </span>
        <Form.Item name="affiliated" valuePropName="checked">
          <Switch disabled={isEditing} />
        </Form.Item>
      </div>
    </div>
  );
};

export default DetailedInfo;
