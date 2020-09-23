import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Input as SemanticInput, Form } from "antd";
import { SocialButton } from "components/common/Button";
import SectionTitle from "components/common/SectionTitle";
import { InputPassword, Input } from "components/common/Input";
import changeName from "redux/actions/example/changeName";
import { IRootState } from "redux/initialStates";

const { Option } = Select;
const { Group: InputGroup } = SemanticInput;
import HowItWorks from "components/HowItWorks";

const Reference = () => {
  const dispatch = useDispatch();
  const clickExample = () => {
    //
  };

  const { currentName } = useSelector(
    ({ example: { changeName } }: IRootState) => changeName,
  );

  const handleChange = () => {
    //
  };

  return (
    <div title="Save Plus">
      <div className="index-container">
        <h1>Put a Smile on {currentName} Face </h1>
        <Button
          className="btn-primary"
          onClick={() => changeName("Redux")(dispatch)}
        >
          GET STARTED
        </Button>
        <div className="buttons">
          <Button className="btn-primary">PRIMARY</Button>
          <Button className="btn-primary-outline">OUTLINE</Button>
          <Button className="btn-secondary">SECONDARY</Button>
          <SocialButton onClick={clickExample} type="facebook" />
          <SocialButton onClick={clickExample} />
        </div>
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
      <HowItWorks />

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
        .field {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Reference;
