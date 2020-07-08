import React, { useState } from "react";
import Link from "next/link";
import { useCopyToClipboard } from "react-use";
import { CheckCircleTwoTone } from "@ant-design/icons";
import getPlatformUrl from "helpers/getPlatformUrl";
import { Modal } from "antd";

export interface SuccessProps {
  slug: string;
  summary: string;
  till_number: number;
}

const Success: React.SFC<SuccessProps> = ({ slug, summary, till_number }) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [modalVisible, setModalVisible] = useState(false);
  const URL = `${getPlatformUrl()}/causes/${slug}`;
  const encodedURL = encodeURI(`${summary} \n\n${URL}`);

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="d-flex flex-center flex-column">
      <img src="/success-cause.svg" alt="cause success" />
      <div className="social__share">
        <h6 className="share__cause__tag">SHARE THE CAUSE</h6>
        <div className="social__share__icons">
          <a
            rel="stylesheet"
            onClick={() => setModalVisible(true)}
          >
            <img
              className="social__share__icon mr-4"
              src="/icons/smartphone-ussd.svg"
              alt=""
            />
          </a>
          <a
            rel="stylesheet"
            href={`https://www.facebook.com/sharer/sharer.php?display=page&u=${URL}&quote=${summary}`}
            target="_blank"
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
          >
            <img
              className="social__share__icon mx-4"
              src="/icons/whatsapp-share.svg"
              alt=""
            />
          </a>
          <a
            rel="stylesheet"
            href={`http://twitter.com/share?text=${encodedURL}`}
            target="_blank"
          >
            <img
              className="social__share__icon"
              src="/icons/twitter-share.svg"
              alt=""
            />
          </a>
        </div>
      </div>
      <Link href="/">
        <a className="text-center my-3 back__home__link">BACK HOME</a>
      </Link>
      <div className="copy__link d-flex w-75 mx-auto mt-3">
        <span className="url__text">{URL}</span>
        {state.value ? (
          <CheckCircleTwoTone style={{ fontSize: 20 }} twoToneColor="#52c41a" />
        ) : (
          <img
            className="ml-2"
            role="button"
            src="/icons/copy.svg"
            alt="copy url"
            onClick={() => copyToClipboard(URL)}
          />
        )}
      </div>
      <Modal
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={false}
      >
        <h6 className="text-center mt-5">People can donate using the USSD Code</h6>
        <h6 className="my-4 text-center">{`*777*77*${till_number}#`}</h6>
      </Modal>
      <style jsx>{`
        .share__cause__tag {
          color: #219bb2;
          display: inline-block;
          width: fit-content;
          padding: 8px;
          margin: 0 auto;
          border-radius: 5px;
        }
        .back__home__link {
          width: fit-content;
          margin: 0 auto;
        }
        .social__share {
          display: flex;
          justify-content: center;
          align-content: center;
          flex-direction: column;
          margin: 0 auto;
          width: 50%;
        }
        .social__share__icons {
          display: flex;
          justify-content: center;
          margin: 1rem 0;
          margin-top: 2rem;
        }
        a {
          text-decoration: underline;
        }
        .copy__link {
          font-size: 0.8em;
          background: #f4fafb;
          color: #444;
          padding: 5px;
          border-radius: 4px;
        }
        .url__text {
          overflow: hidden;
          text-overflow: ellipsis;
          color: #333;
          opacity: 0.5;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default Success;
