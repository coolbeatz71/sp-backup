import * as React from "react";
import Swipeable from "react-swipeable-views";
import Feature from "./Feature";
import styles from "./feature.module.scss";

export const features: { icon: any; title: string; description: string }[] = [
  {
    icon: "icons/beans.svg",
    title: "Sign Up on SAVE Plus",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tenetur mollitia eum deserunt quis quas nulla fugit voluptatem fuga velit!",
  },
  {
    icon: "icons/seed.svg",
    title: "Create a Cause and Donate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tenetur mollitia eum deserunt quis quas nulla fugit voluptatem fuga velit!",
  },
  {
    icon: "icons/forest.svg",
    title: "Invite Others to Donate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tenetur mollitia eum deserunt quis quas nulla fugit voluptatem fuga velit!",
  },
];

const Features: React.FC<{}> = () => (
  <div className="features">
    <div className={styles.featureList}>
      {features.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          icon={feature.icon}
          description={feature.description}
        />
      ))}
    </div>
    <div className={styles.featureListMobile}>
      <Swipeable>
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
          />
        ))}
      </Swipeable>
    </div>
  </div>
);

export default Features;
