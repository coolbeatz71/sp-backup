import Img from "react-optimized-image";
import verified from "public/icons/cause-verified-grey.png";

const Icon = () => (
  <Img
    src={verified}
    alt="verified icon"
    style={{
      width: "1em",
      height: "1em",
    }}
  />
);

export default Icon;
