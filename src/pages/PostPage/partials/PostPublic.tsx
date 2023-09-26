import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { CloudUploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";

type PostPublicProps = {
  className?: string;
  isPublic: boolean;
  onPublic?: () => void;
  unPublic?: () => void;
};

const PostPublic: React.FC<PostPublicProps> = ({ className, isPublic, onPublic, unPublic }) => {
  const [openPublic, setOpenPublic] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenPublic(false);
      }
    };
    window.addEventListener("scroll", () => {
      setOpenPublic(false);
    });
    window.addEventListener("mousedown", handleClickOutSide);
    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
      window.removeEventListener("scroll", () => {
        setOpenPublic(false);
      });
    };
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={() => {
        setOpenPublic((current) => !current);
      }}
      className={clsx(
        className,
        "absolute top-2 px-2 py-1 left-0 bg-white shadow-lg border border-solid border-gray-200 cursor-pointer"
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={clsx("w-3 h-3 rounded-full", {
            "bg-green-600": isPublic,
            "bg-rose-600": !isPublic,
          })}
        ></div>
        <p className="text-[12px] font-bold">
          {isPublic ? "Public" : "Unpublic"}
        </p>
      </div>
      {/* public action */}
      {openPublic && (
        <div className="absolute top-[105%] right-0 bg-white border border-solid border-gray-400">
          {!isPublic ? (
            <div 
            onClick={onPublic}
            className="flex items-center gap-2 hover:bg-gray-200 p-2">
              <CloudUploadOutlined className="text-[18px] font-bold text-green-600" />
              <p className="text-[16px]">public</p>
            </div>
          ) : (
            <div 
            onClick={unPublic}
            className="flex items-center gap-2 hover:bg-gray-200 p-2">
              <CloudDownloadOutlined className="text-[18px] font-bold text-rose-600" />
              <p className="text-[16px]">unpublic</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostPublic;
