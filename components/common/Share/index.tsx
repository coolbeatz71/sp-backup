import React, { useState } from "react";
import styles from "./share.module.scss";
import { useCopyToClipboard } from "react-use";
import { Modal } from "antd";
import getPlatformUrl from "helpers/getPlatformUrl";
import { useRouter } from "next/router";
import { CREATE_CAUSE_PATH } from "helpers/paths";
import notification from "utils/notification";
import { CheckCircleTwoTone } from "@ant-design/icons";

export interface ShareProps {
  title: string;
  slug: string | string[];
  tillNumber: string;
  position?: "center";
  label?: boolean;
  hideCausePopover?: () => void;
  visible?: boolean;
}

const Share: React.FC<ShareProps> = ({
  title,
  slug,
  tillNumber,
  position,
  label = true,
  hideCausePopover = () => null,
  visible = false,
}) => {
  const [isVisible, setVisible] = useState(visible);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [modalVisible, setModalVisible] = useState(false);
  const { pathname } = useRouter();
  const URL = `${getPlatformUrl()}/causes/${slug}`;
  const encodedURL = encodeURI(`${title} \n\n${URL}`);

  return (
    <div className={`${styles.share} share`}>
      {label && <span>Share</span>}
      {pathname !== CREATE_CAUSE_PATH && (
        <a rel="stylesheet">
          {isVisible || !state.value ? (
            <img
              className="social__share__icon"
              src="/icons/share-url.svg"
              onClick={() => {
                copyToClipboard(URL);
                notification("Cause link copied", "success", "top-center");
                setVisible(false);
              }}
              alt="copy url"
            />
          ) : (
            !isVisible &&
            state.value && (
              <CheckCircleTwoTone
                style={{ fontSize: 22 }}
                twoToneColor="#52c41a"
              />
            )
          )}
        </a>
      )}
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
        <h6 className="mt-4 text-center">Save plus Bill for this cause is</h6>
        <h6 className="text-center">{tillNumber}</h6>
        <h6 className="text-center mt-4">
          Make your donation using the USSD Code
        </h6>
        <h6 className="mb-4 text-center">{`*777*77*Save plus Bill*Donation#`}</h6>
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
