import React from "react";
import { Select } from "antd";
import { formattedPhonePrefixes } from "constants/phonePrefixes";

const { Option } = Select;

const PhoneCountrySelector: React.ReactElement = (
  <Select defaultValue="250">
    {formattedPhonePrefixes.map(({ text, value }) => (
      <Option key={value} value={value}>
        {text}
      </Option>
    ))}
  </Select>
);

export default PhoneCountrySelector;
