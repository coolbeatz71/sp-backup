import React from "react";
import Layout from "../components/Layout";
import { Button } from "antd";
import { SocialButton } from "components/common/Button";

const IndexPage = () => {
  const clickExample = () => console.log("here social clicked");

  return (
    <Layout title="Save Plus">
      <div className="index-container">
        <h1>Put a Smile on Someone Face </h1>
        <Button className="btn-primary">GET STARTED</Button>
        <div className="buttons">
          <Button className="btn-primary">PRIMARY</Button>
          <Button className="btn-primary-outline">OUTLINE</Button>
          <Button className="btn-secondary">SECONDARY</Button>
          <SocialButton onClick={clickExample} type="facebook" />
          <SocialButton onClick={clickExample} />
        </div>
      </div>

      <style jsx>{`
        .index-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: inherit;
          flex-direction: column;
          background: #f4fafd;
        }
        h1 {
          text-align: center;
          font-size: 30px;
          font-weight: 500;
          font-style: normal;
        }
        .buttons {
          display: flex;
          width: 60%;
          margin-top: 1rem;
          justify-content: space-around;
        }
      `}</style>
    </Layout>
  );
};

export default IndexPage;
