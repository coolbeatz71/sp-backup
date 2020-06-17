import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./footer.module.scss";
import isFooterNonApplicable from "helpers/isFooterNonApplicable";

const Footer: React.FC<{}> = () => {
  const { pathname } = useRouter();
  const isApplicable = !isFooterNonApplicable(pathname);
  return isApplicable ? (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="footer-header">
          <img src="/logo.svg" className={styles.logo} alt="footer logo" />
          <span className={styles.labelCopyright}>copyright© 2020 exuus</span>
        </div>
        <div className={styles.links}>
          <Link href="#">
            <a>Blog</a>
          </Link>
          <Link href="#">
            <a>User Agreement</a>
          </Link>
          <Link href="#">
            <a>Privacy Policy</a>
          </Link>
        </div>
        <div className={styles.socialMedia}>
          <a href="#">
            <img src="/twitter-icon.svg" alt="" />
          </a>
          <a href="#">
            <img src="/ig-icon.svg" alt="" />
          </a>
          <a href="#">
            <img src="/facebook-icon.svg" alt="" />
          </a>
        </div>
        <div className={styles.contact}>
          <span>Contact us at </span>
          <a href="mailto:support@Saveplus.io?subject=Support from Our Site">
            support@Saveplus.io
          </a>
        </div>
      </div>
      <style jsx={true}>
        {`
          .footer-header {
            display: flex;
            flex-flow: column;
            justify-content: center;
          }
        `}
      </style>
    </div>
  ) : (
    <></>
  );
};

export default Footer;
