import * as React from "react";
import { shallow } from "enzyme";
import Index from "../../pages";

const component = shallow(<Index />);

describe("<Index />", () => {
  it("Should render without crashing", () => {
    expect(component).toBeDefined();
  });
});
