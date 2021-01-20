import { cloneElement, FC, ReactElement, useState } from "react";
import ReactPlayer from "react-player";
import { Modal } from "antd";

interface Props {
  url?: string;
  children: ReactElement;
}

const VideoPlayer: FC<Props> = ({ url = "", children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {cloneElement(children, {
        onClick: () => setVisible(true),
        disabled:
          [undefined, null, ""].includes(url) || !ReactPlayer.canPlay(url),
      })}
      <Modal
        destroyOnClose
        title="Cause Video"
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
        width={600}
        bodyStyle={{ padding: 0, backgroundColor: "#000000" }}
      >
        <ReactPlayer controls url={url} width="600px" height="400px" />
      </Modal>
    </>
  );
};

export default VideoPlayer;
