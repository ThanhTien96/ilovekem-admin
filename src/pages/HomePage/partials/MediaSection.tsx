import { ButtonApp } from "components/shared";
import React, { useState } from "react";
import { Empty, Modal, Spin, message } from "antd";
import clsx from "clsx";
import { StoreMediaType } from "@type/mediaType";
import MediaList from "components/shared/MediaList";
import UploadSingle from "components/shared/UploadSingle";
import { MediaService } from "services/mediaService";
import { useAppDispatch } from "reduxStore";
import { thunkGetAllMedia } from "reduxStore/common/media/mediaAsyncThunk";
import { setMediaLoading } from "reduxStore/common/media/mediaSlice";
type MediaSectionProps = {
  className?: string;
  isLoading?: boolean;
  data?: StoreMediaType[];
};

const MediaSection: React.FC<MediaSectionProps> = ({
  className,
  isLoading,
  data,
}) => {
  const dispatch = useAppDispatch();
  const [openModelUpload, setOpenModelUpload] = useState<boolean>(false);
  const [isResetImage, setIsResetImage] = useState<boolean>(false);
  const [dataUpload, setDataUpload] = useState<any[]>();

  // handle upload img
  const handleUploadImage = async () => {
    if (dataUpload && dataUpload.length) {
      dispatch(setMediaLoading(true));

      const formData = new FormData();
      formData.append("image", dataUpload[0].originFileObj);
      try {
        const res = await MediaService.postMedia(formData);
        if (res.status === 200) {
          message.success(res.data.message);
          dispatch(thunkGetAllMedia());
        }
      } catch (err) {
        message.error("upload image faild");
      } finally {
        dispatch(setMediaLoading(false));
        setIsResetImage(true);
      }
    }
  };
  return (
    <div className={clsx(className)}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Media</h1>
        <ButtonApp onClick={() => setOpenModelUpload(true)}>
          {" "}
          Add Media
        </ButtonApp>
      </div>

      <div>
        <Spin spinning={isLoading}>
          {data && Array.isArray(data) && data.length > 0 ? (
            <MediaList mediaData={data} />
          ) : (
            <Empty />
          )}
        </Spin>

        {/* model upload media */}
        <Modal
          title="Upload Image"
          onOk={() => {
            handleUploadImage();
            setOpenModelUpload(false);
          }}
          open={openModelUpload}
          onCancel={() => setOpenModelUpload(false)}
        >
          {openModelUpload && (
            <UploadSingle
              resetImageList={isResetImage}
              onUpload={(e) => setDataUpload(e)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MediaSection;
