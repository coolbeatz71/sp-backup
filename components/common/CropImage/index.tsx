import React from "react";
import ReactCrop from "react-image-crop";
import { Modal, Upload, message } from "antd";
import moment from "moment";
import validator from "validator";
import { CameraOutlined } from "@ant-design/icons";

import drawImage, { clearImage } from "./drawImage";
import generateBlob from "./generateBlob";

import styles from "./index.module.scss";

const globalAny: any = global;

interface Props {
  isProfile?: boolean;
  file: any[];
  image: any;
  onCancel: () => void;
  onOk: (image: any, file: any[], uploadFile: any) => void;
}

const CropImage: React.FC<Props> = ({
  isProfile = false,
  file: fl,
  image,
  onCancel,
  onOk,
}) => {
  const [crop, setCrop] = React.useState<any>({
    aspect: isProfile ? 1 : 16 / 9,
    width: 100,
    unit: "%",
  });
  const [cropped, setCropped] = React.useState<any>();
  const [completedCrop, setCompletedCrop] = React.useState<any>(image);

  const [file, setFile] = React.useState<any[]>(fl);
  const [show, setShow] = React.useState<boolean>(false);

  const imgRef = React.useRef(null);
  const previewCanvasRef = React.useRef(null);
  const cropOuter = React.useRef(null);

  const props = {
    name: "image",
    multiple: false,
    accept: "image/*",
    fileList: file,
    showUploadList: !isProfile,
    beforeUpload: () => false,
    onChange: ({ file, fileList }: any) => {
      if (fileList.length > 0) {
        setFile([file]);
        setShow(true);
        setCropped(null);
      } else {
        cancel(previewCanvasRef);
      }
    },
  };

  const cancel = React.useCallback((r) => {
    setFile([]);
    setShow(false);
    setCropped(null);
    setCompletedCrop(null);

    clearImage(r);

    onCancel();
  }, []);

  React.useEffect(() => {
    if (file.length > 0 && show) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setCropped(reader.result));
      reader.readAsDataURL(file[0]);
    }
  }, [file, show]);

  React.useEffect(() => {
    setFile(fl);
  }, [fl]);

  React.useEffect(() => {
    setCompletedCrop(image);
  }, [image]);

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      if (globalAny.imgRefCurrent) {
        drawImage(
          globalAny.imgRefCurrent,
          previewCanvasRef,
          completedCrop,
          true,
        );
      }
      return;
    }

    drawImage(imgRef, previewCanvasRef, completedCrop);
  }, [
    completedCrop,
    previewCanvasRef.current,
    imgRef.current,
    cropOuter.current,
  ]);

  const onLoad = React.useCallback((img) => {
    const canvasRefAny: any = previewCanvasRef.current;
    globalAny.imgRefCurrent = {
      current: img,
      height: canvasRefAny?.height,
      width: canvasRefAny?.width,
    };
    imgRef.current = img;
  }, []);

  return (
    <div className={styles.cropping} data-profile-canvas={isProfile}>
      {!isProfile && <strong>Image</strong>}
      {isProfile && (
        <div className={styles.cropping__profile_hint}>
          <CameraOutlined />
        </div>
      )}
      <Upload.Dragger className={styles.cropping__upload} {...props}>
        <div className={styles.cropping__upload__inner}>
          <div
            className={styles.cropping__upload__inner__canvas}
            data-profile-canvas={isProfile}
          >
            {validator.isURL(
              typeof completedCrop === "string" ? completedCrop : "",
            ) ? (
              <img src={completedCrop} />
            ) : (
              <canvas ref={previewCanvasRef} />
            )}
          </div>
        </div>
        {!isProfile && (
          <p className={styles.cropping__upload__hint}>
            {completedCrop ? "Change image" : "Choose an image to upload"}
          </p>
        )}
      </Upload.Dragger>
      <Modal
        title="Crop Image"
        visible={show}
        destroyOnClose
        onCancel={() => cancel(previewCanvasRef)}
        onOk={() => {
          setShow(false);

          generateBlob(previewCanvasRef.current, crop)
            ?.then((blob: any) => {
              onOk(
                completedCrop,
                file,
                new File([blob], `${moment().unix()}`, {
                  type: "image/png",
                  lastModified: moment().unix(),
                }),
              );
            })
            .catch((exc) => {
              message.error(exc.message);
              cancel(previewCanvasRef);
            });
        }}
        okText="DONE"
        okButtonProps={{
          disabled:
            !completedCrop ||
            completedCrop?.width === 0 ||
            completedCrop?.height === 0,
        }}
      >
        <ReactCrop
          src={cropped}
          crop={crop}
          onImageLoaded={onLoad}
          onChange={(c: any) => setCrop(c)}
          onComplete={(c: any) => setCompletedCrop(c)}
        />
      </Modal>
    </div>
  );
};

export default CropImage;
