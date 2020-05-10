import * as React from "react";
import Layout from "../components/Layout";
import PricingCard from "../components/Pricing";

const PricingPage = () => {
  return (
    <Layout title="Pricing | Save Plus">
      <div className="pricing__container">
        <div className="pricing__grid">
          <PricingCard
            plan="free plan"
            description="Lorem ipsum another text that comes in my mind"
          />
          <PricingCard
            plan="standard"
            description="Lorem ipsum another text that comes in my mind"
          />
          <PricingCard
            plan="premium"
            description="Lorem ipsum another text that comes in my mind"
          />
        </div>
      </div>
      <style jsx={true}>
        {`
          .pricing__container {
            background: #3c3f59;
            height: 100vh;
            padding: 10px;
            display: flex;
            justify-content: center;
            text-align: center;
          }
          .pricing__grid {
            display: flex;
            margin-top: 20%;
          }
        `}
      </style>
    </Layout>
  );
};

export default PricingPage;
