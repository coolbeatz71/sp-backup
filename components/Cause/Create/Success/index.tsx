import Link from "next/link";
import { useCopyToClipboard } from "react-use";
import { CheckCircleTwoTone } from "@ant-design/icons";
import getPlatformUrl from "helpers/getPlatformUrl";
import Share from "components/common/Share";

export interface SuccessProps {
  slug: string;
  summary: string;
  till_number: string;
}

const Success: React.SFC<SuccessProps> = ({ slug, summary, till_number }) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const URL = `${getPlatformUrl()}/causes/${slug}`;

  return (
    <div className="d-flex flex-center flex-column">
      <img
        className="success-img"
        src="/success-cause.gif"
        alt="cause success"
      />
      <div className="social__share">
        <h6 className="share__cause__tag">SHARE THE CAUSE</h6>
        <Share
          title={summary}
          tillNumber={till_number}
          slug={slug}
          position="center"
          label={false}
        />
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
      <style jsx>{`
        .success-img {
          margin: auto;
          padding: 1rem 0 0;
          width: 260px;
          height: 260px;
        }
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
