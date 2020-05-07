import React from "react";
import Layout from "../components/Layout";
import { Button, Select, Input as SemanticInput, Form } from "antd";
import { SocialButton } from "components/common/Button";
import CauseCard from "components/common/CauseCard";
import SectionTitle from "components/common/SectionTitle";
import { InputPassword, Input } from "components/common/Input";

const { Option } = Select;
const { Group: InputGroup } = SemanticInput;
import HowItWorks from "components/HowItWorks";

const IndexPage = () => {
  const clickExample = () => console.log("here social clicked");

  const handleChange = ({ target }: any) => console.log("here ", target.value);

  return (
    <Layout title="Save Plus">
        <div className="index-container">
          <h1>Put a Smile on Someone's Face </h1>
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
            avatar:
              "https://res.cloudinary.com/dutstern8/image/upload/v1583071786/yAJ2TZk4XFsNkKanjppChiWW.png",
            name: "by Dative Kamana",
            verified: true,
          }}
          amountRaised={5100}
          amountToReach={"600000"}
          progress={50}
          status="open"
          rating={4}
          daysToGo={72}
        />
        <div className="inputs">
          <div className="field">
            <SemanticInput placeholder="Standard Input" />
          </div>
          <div className="field">
            <Input
              name="namey"
              placeholder="Custom Input"
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <InputPassword
              placeholder="Password"
              visibilityToggle={true}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <InputGroup compact>
              <Select defaultValue="250" style={{ width: "20%" }}>
                <Option value="250">+250</Option>
                <Option value="254">+254</Option>
                <Option value="243">+243</Option>
              </Select>
              <SemanticInput style={{ width: "80%" }} placeholder="Telephone" />
            </InputGroup>
          </div>
          <Form>
            <Form.Item validateStatus="error" help="Should be a number">
              <Input placeholder="Validation Error" />
            </Form.Item>
            <Input
              name="namey"
              placeholder="Custom Input"
              onChange={handleChange}
            />
          </Form>
        </div>
      </div>

      <SectionTitle title="How It Works" icon="icons/gardening.png" />

      <style jsx={true}>{`
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
        .inputs {
          width: 40%;
          margin: 1rem 0;
        }
      `}</style>
    </Layout>
  );
};

export default IndexPage;
