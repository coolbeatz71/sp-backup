import React, { useState, useEffect } from "react";
import { Form, Select, DatePicker, Upload } from "antd";
import moment from "moment";
import { Input } from "components/common/Input";
import { LoadingOutlined } from "@ant-design/icons";
import normalizeInputNumber from "helpers/normalizeInputNumber";
import isLocation from "helpers/isLocation";
import ImgCrop from "antd-img-crop";
import { setCroppedImage } from "redux/actions/cause/create";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import StackedLabel from "components/common/StackedLabel";
import { SvpType } from "helpers/context";

export interface BasicInfoProps {
  svpProps: SvpType;
}

const { RangePicker } = DatePicker;

const BasicInfo: React.FC<BasicInfoProps> = ({ svpProps }) => {
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState("");
  const isEditing = isLocation(["causes", "edit"]);

  const { data } = useSelector(({ cause: { single } }: IRootState) => single);

  const { croppedImage } = useSelector(
    ({ cause: { create } }: IRootState) => create,
  );

  useEffect(() => {
    if (isEditing) setImageUrl(data.image);
  }, [data.image]);

  useEffect(() => {
    if (croppedImage && croppedImage[0]?.status === "done") {
      setUploadLoading(false);
      getBase64(croppedImage[0]?.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
      });
    }
  }, [croppedImage]);

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      return setUploadLoading(true);
    }
    setCroppedImage([info.file])(dispatch);
  };

  const disabledDate = (current: any) => {
    return current && current < moment().startOf("day");
  };

  return (
    <div>
      <Form.Item
        name="name"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[{ required: true, min: 3 }]}
      >
        <Input
          disabled={isEditing}
          placeholder="Cause Name"
          maxLength={70}
          hasWordCount
        />
      </Form.Item>
      <Form.Item
        name="category_id"
        validateTrigger={["onSubmit", "onBlur", "onChange"]}
        rules={[{ required: true }]}
      >
        <StackedLabel label="Category" select>
          <Select disabled={isEditing}>
            {svpProps.categories.map(({ id, title }) => (
              <Select.Option key={id} value={id}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </StackedLabel>
      </Form.Item>
      <Form.Item
        name="target_amount"
        validateTrigger={["onSubmit", "onBlur"]}
        rules={[
          { required: true },
          {
            pattern: /([1-9][\d,]{2,})$$/g,
            message: "The amount should be valid with a minimum of 100 rwf",
          },
        ]}
        normalize={normalizeInputNumber}
      >
        <Input placeholder="Cause fundraising target" prefix="RWF" />
      </Form.Item>
      <Form.Item
        name="duration"
        validateTrigger={["onSubmit", "onChange"]}
        rules={[{ required: true }]}
      >
        <RangePicker
          disabledDate={disabledDate}
          className="w-100"
          disabled={[isEditing, false]}
        />
      </Form.Item>
      <div className="mb-3">
        <p className="font-weight-bold">Image</p>
        <Form.Item>
          <Form.Item
            name="image"
            valuePropName={imageUrl}
            noStyle
            rules={[{ required: true }]}
          >
            <ImgCrop modalTitle="Crop Image" rotate aspect={16 / 9}>
              <Upload
                accept="image/x-png,image/jpeg,image/jpg"
                listType="picture-card"
                onChange={handleChange}
                multiple={false}
                showUploadList={false}
                className="cause-image-uploader"
                disabled={isEditing}
              >
                <div className="cause-image-uploader__container">
                  {imageUrl && <img src={imageUrl} alt="cause cover" />}
                  <div className="upload-action">
                    {uploadLoading && <LoadingOutlined />}
                    <div className="ant-upload-text">
                      {imageUrl
                        ? "Replace Cause Image"
                        : "Choose Cause Image here"}
                    </div>
                  </div>
                </div>
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form.Item>
      </div>
    </div>
  );
};

export default BasicInfo;
