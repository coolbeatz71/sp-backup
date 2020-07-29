import React from "react";

const NotFound = () => (
  <div className="error">
    <div className="illustration">
      <img src="/404.svg" alt="404" />
    </div>
    <style jsx={true}>
      {`
        .error {
          color: #000;
          background: #f4fafb;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI",
            "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
          height: calc(100vh - (68.5px + 226px));
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .illustration {
          width: 80%;
        }

        .illustration img {
          width: 50%;
        }
      `}
    </style>
  </div>
);

export default NotFound;
