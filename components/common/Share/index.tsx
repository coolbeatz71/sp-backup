import React, { useState } from "react";
import styles from "./share.module.scss";
import { useCopyToClipboard } from "react-use";
import { Modal } from "antd";
import getPlatformUrl from "helpers/getPlatformUrl";
import { useRouter } from "next/router";
import { CREATE_CAUSE_PATH } from "helpers/paths";
import notification from "utils/notification";
import { CheckOutlined } from "@ant-design/icons";
import { SUCCESS } from "constants/colors";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const [copy, setCopy] = useState(true);
  const [, copyToClipboard] = useCopyToClipboard();
  const [modalVisible, setModalVisible] = useState(false);
  const URL = `${getPlatformUrl()}/causes/${slug}`;
  const encodedURL = encodeURI(`${title} \n\n${URL}`);

  const onCopyClick = () => {
    copyToClipboard(URL);
    setCopy(false);
    notification("Cause link copied", "success", "top-center");
    setTimeout(() => {
      setCopy(true);
      // tslint:disable-next-line: align
    }, 4000);
  };

  return (
    <div className={`${styles.share} share`}>
      {label && <span>{t("share").toUpperCase()}</span>}
      {pathname !== CREATE_CAUSE_PATH && (
        <a rel="stylesheet">
          {copy ? (
            <img
              className="social__share__icon"
              src="/icons/share-url.svg"
              onClick={() => onCopyClick()}
              alt="copy url"
            />
          ) : (
            <CheckOutlined style={{ fontSize: 23, color: SUCCESS }} />
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
          alt="ussd icon"
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
          alt="facebook icon"
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
          alt="whatsapp icon"
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
          alt="twitter icon"
        />
      </a>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={false}
      >
        <h6 className="mt-4 text-center">{t("this cause till number is")}</h6>
        <h6 className="text-center">{tillNumber}</h6>
        <h6 className="text-center mt-4">
          {t("make your donation using ussd code")}
        </h6>
        <h6 className="mb-4 text-center">{`*777*77*${tillNumber}*Donation#`}</h6>
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
