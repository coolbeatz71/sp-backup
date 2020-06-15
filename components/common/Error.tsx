import React from "react";
import DefaultErrorPage from "next/error";
import { Alert } from "antd";

export interface ErrorProps {
  status: number;
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ status, message }) => {
  return status === 404 ? (
    <DefaultErrorPage statusCode={status} />
  ) : (
    <Alert message={message} type="error" className="m-5" />
  );
};

export default Error;
