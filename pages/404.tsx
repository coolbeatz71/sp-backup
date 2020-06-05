import React from "react";

const NotFound = () => (
  <div className="error">
    <h1>404</h1>
    <div className="desc">
      <h2>This page could not be found.</h2>
    </div>
    <style jsx={true}>{`
    .error {
      color: #000;
      background: #f4fAfb;
      font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
      height: calc(100vh - (68.5px + 226px));
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .desc {
      display: inline;
      text-align: left;
      line-height: 49px;
      height: 49px;
      vertical-align: middle;
    }
    h1 {
      display: inline-block;
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      margin: 0;
      margin-right: 20px;
      padding: 10px 23px 10px 0;
      font-size: 24px;
      font-weight: 500;
      vertical-align: top;
    }
    h2 {
      font-size: 14px;
      font-weight: normal;
      line-height: inherit;
      margin: 0;
      padding: 0;
    }
  `}
    </style>
  </div>
);

export default NotFound;
