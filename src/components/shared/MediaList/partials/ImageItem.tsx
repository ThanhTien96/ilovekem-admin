import clsx from "clsx";
import { StaticContent } from "constants/staticContent";
import React from "react";
import { DeleteFilled, EyeOutlined } from "@ant-design/icons";
import styles from "./ImageItem.module.scss";
import { Popconfirm, message } from "antd";
import { MediaService } from "services/mediaService";
import { useAppDispatch } from "reduxStore";
import { thunkGetAllMedia } from "reduxStore/common/media/mediaAsyncThunk";
import { setMediaLoading } from "reduxStore/common/media/mediaSlice";

type ImageItemProps = {
  src?: string;
  alt?: string;
  className?: string;
  fileName: string;
  onShowImage?: () => void;
};

const ImageItem: React.FC<ImageItemProps> = ({ src, alt, className, fileName, onShowImage }) => {
  const dispatch = useAppDispatch();

  // handle delete image =>
  const handleDeleteImage = async (fileName: string) => {
    dispatch(setMediaLoading(true))
    try {
      const res = await MediaService.deleteImage(fileName);
      if(res.status === 200) {
        message.success(res.data.message);
        dispatch(thunkGetAllMedia());
      }
    } catch (err) {
      message.error("delete image faild!")
    } finally {
      dispatch(setMediaLoading(false));
    }
  }
  return (
    <div className={clsx(className)}>
      <div className={clsx("w-full h-[250px] relative", styles.imageItem)}>
        <img
          className="inline-block w-full h-full object-cover"
          src={src ?? StaticContent.EMPTY_IMG}
          alt={alt ?? "..."}
        />
        {/* media action */}
        <div
          className={clsx(
            "absolute top-0 bottom-0 right-0 bg-black/40 flex items-center justify-center gap-8",
            styles.itemAction
          )}
        >
          <div>
            <EyeOutlined 
            onClick={onShowImage}
            className="text-white text-2xl cursor-pointer hover:text-gray-300 transiton-all duration-300" />
          </div>
          <div>
            <Popconfirm
              title="Delete image"
              description="Are you sure to delete this image?"
              onConfirm={() => handleDeleteImage(fileName)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteFilled className="text-white text-2xl cursor-pointer hover:text-gray-300 transiton-all duration-300" />
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageItem;
