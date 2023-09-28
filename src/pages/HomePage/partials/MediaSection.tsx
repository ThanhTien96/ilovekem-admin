import { ButtonApp } from "components/shared";
import React from "react";
import {Empty} from 'antd'
import clsx from "clsx";
type MediaSectionProps = {
    className?: string;
};

const MediaSection: React.FC<MediaSectionProps> = ({className}) => {
  return (
    <div className={clsx(className)}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Media</h1>
        <ButtonApp> Add Media</ButtonApp>
      </div>

      <div>
        <Empty/>
      </div>
    </div>
  );
};

export default MediaSection;
