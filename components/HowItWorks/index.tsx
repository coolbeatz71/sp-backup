import * as React from "react";
import Swipeable from "react-swipeable-views";
import Feature from "./Feature";
import styles from "./feature.module.scss";

export const features: { icon: any; title: string; description: string }[] = [
  {
    icon: "/icons/beans.svg",
    title: "Sign Up on SAVE Plus",
    description:
      "With just your phone number, you can signup and start a cause on SAVE Plus. With this account you can monitor your cause(s), donate to other cause(s) and collect raised funds seamlessly.",
  },
  {
    icon: "/icons/seed.svg",
    title: "Create a Cause and Donate",
    description:
      "Create a cause and set the target of how much you want to fundraise with ease. Once done, the cause will be viewed publicly for public causes and privately for private causes.",
  },
  {
    icon: "/icons/forest.svg",
    title: "Invite Others to Donate",
    description:
      "After successfully creating a cause, invite friends and family to start donating. Upon hitting the target, funds are automatically disbursed to the cause creator account (MTN MoMo or Airtel Money).",
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
