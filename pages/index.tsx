import React from "react";
import Layout from "../components/Layout";
import { Button } from "antd";
import { SocialButton } from "components/common/Button";
import CauseCard from "components/common/CauseCard";

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
        <CauseCard
          title="by Dative Kamana"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud"
          cover="https://res.cloudinary.com/dutstern8/image/upload/v1588675939/Rectangle_79_q3ljb6.png"
          owner={{ 
            avatar: "https://res.cloudinary.com/dutstern8/image/upload/v1583071786/yAJ2TZk4XFsNkKanjppChiWW.png",
            name: "by Dative Kamana",
            verified: true
          }}
          amountRaised={5100}
          amountToReach={"600000"}
          progress={50}
          status="open"
          rating={4}
          daysToGo={72}
        />
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
