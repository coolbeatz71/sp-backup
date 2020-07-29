import React, { useState } from "react";
import styles from "./share.module.scss";
import { Modal } from "antd";
import getPlatformUrl from "helpers/getPlatformUrl";

export interface ShareProps {
  title: string;
  slug: string | string[];
  tillNumber: string;
  position?: "center";
  label?: boolean;
  hideCausePopover?: () => void;
}

const Share: React.FC<ShareProps> = ({
  title,
  slug,
  tillNumber,
  position,
  label = true,
  hideCausePopover = () => null,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const URL = `${getPlatformUrl()}/causes/${slug}`;
  const encodedURL = encodeURI(`${title} \n\n${URL}`);

  return (
    <div className={`${styles.share} share`}>
      {label && <span>Share</span>}
      <a
        rel="stylesheet"
        onClick={() => {
          hideCausePopover();
          setModalVisible(true);
        }}
      >
        <img
          className="social__share__icon"
          src="/icons/smartphone-ussd.svg"
          alt=""
        />
      </a>
      <a
        rel="stylesheet"
        href={`https://www.facebook.com/sharer/sharer.php?display=page&u=${URL}&quote=${title}`}
        target="_blank"
        onClick={() => hideCausePopover()}
      >
        <img
          className="social__share__icon"
          src="/icons/facebook-share.svg"
          alt=""
        />
      </a>
      <a
        rel="stylesheet"
        href={`https://api.whatsapp.com/send?text=${encodedURL}`}
        target="_blank"
        onClick={() => hideCausePopover()}
      >
        <img
          className="social__share__icon"
          src="/icons/whatsapp-share.svg"
          alt=""
        />
      </a>
      <a
        rel="stylesheet"
        href={`http://twitter.com/share?text=${encodedURL}`}
        target="_blank"
        onClick={() => hideCausePopover()}
      >
        <img
          className="social__share__icon"
          src="/icons/twitter-share.svg"
          alt=""
        />
      </a>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={false}
      >
        <h6 className="text-center mt-5">
          Make your donation using the USSD Code
        </h6>
        <h6 className="my-4 text-center">{`*777*77*${tillNumber}#`}</h6>
      </Modal>
      <style jsx>{`
        .share {
          justify-content: ${position === "center" && "center"};
        }
      `}</style>
    </div>
  );
};

export default Share;
