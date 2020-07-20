import * as React from "react";
import styles from "./policies.module.scss";

const terms = [
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    paragraph: `It is a long established fact that a reader will be distracted by the readable content of a
page when looking at its layout. The point of using Lorem Ipsum is that it has a
more-or-less normal distribution of letters, as opposed to using 'Content here, content
here', making it look like readable English. Many desktop publishing packages and web
 page editors now use Lorem Ipsum as their default model text, and a search for '
lorem ipsum' will uncover many web sites still in their infancy. `,
  },
];

const PoliciesPage: React.SFC<{}> = () => {
  return (
    <div title="policies | Save Plus">
      <div className={styles.policies__overlay} />
      <div className={styles.policies__container}>
        <div className={styles.policies__container__header}>
          <h1>Our Terms and Policies</h1>
          <div className={styles.policies__container__header__desc}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since
            </p>
          </div>
        </div>
        <div className={styles.policies__container__terms}>
          {terms.map((term, index) => (
            <p key={index}>{term.paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
