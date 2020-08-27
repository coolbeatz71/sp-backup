import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./footer.module.scss";
import isFooterNonApplicable from "helpers/isFooterNonApplicable";
import { POLICIES_PATH } from "helpers/paths";

const Footer: React.FC<{}> = () => {
  const { pathname } = useRouter();
  const isApplicable = !isFooterNonApplicable(pathname);
  return isApplicable ? (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className="footer-header">
          <img src="/logo-beta.svg" className={styles.logo} alt="footer logo" />
          <span className={styles.labelCopyright}>copyright© 2020 exuus</span>
        </div>
        <div className={styles.links}>
          <Link href="">
            <a href="https://getsave.io/" target="_blank">
              Save
            </a>
          </Link>
          <Link href="#">
            <a>Blog</a>
          </Link>
          <Link href="#">
            <a>User Agreement</a>
          </Link>
          <Link href={POLICIES_PATH}>
            <a>Privacy Policy</a>
          </Link>
        </div>
        <div className={styles.socialMedia}>
          <a href="https://twitter.com/SavePlusHQ" target="_blank">
            <img src="/twitter-icon.svg" alt="" />
          </a>
          <a href="https://www.instagram.com/saveplus.hq/" target="_blank">
            <img src="/ig-icon.svg" alt="" />
          </a>
          <a
            href="https://www.facebook.com/SavePlus.HQ/?_rdc=1&_rdr"
            target="_blank"
          >
            <img src="/facebook-icon.svg" alt="" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCvkbUBLHH69822CjWWM8D8A/?guided_help_flow=5"
            target="_blank"
          >
            <img src="/youtube-icon.svg" alt="" />
          </a>
        </div>
        <div className={styles.contact}>
          <span>Contact us at </span>
          <a href="mailto:support@saveplus.io?subject=Support from Our Site">
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
