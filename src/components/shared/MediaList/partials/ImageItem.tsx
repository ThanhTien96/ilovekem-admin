import clsx from "clsx";
import { StaticContent } from "constants/staticContent";
import React from "react";

type ImageItemProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const ImageItem: React.FC<ImageItemProps> = ({ src, alt, className }) => {
  return (
    <div className={clsx(className)}>
      <div className="w-full h-[250px]">
        <img
          className="inline-block w-full h-full object-cover"
          src={src ?? StaticContent.EMPTY_IMG}
          alt={alt ?? "..."}
        />
      </div>
    </div>
  );
};

export default ImageItem;
