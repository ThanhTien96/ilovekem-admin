
import React from "react";
import ImageItem from "./partials/ImageItem";
import { StoreMediaType } from "@type/mediaType";

type MediaListProps = {
  mediaData?: StoreMediaType[];
};

const MediaList: React.FC<MediaListProps> = ({ mediaData }) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      {mediaData &&
        Array.isArray(mediaData) &&
        mediaData.length > 0 &&
        mediaData.map((ele: StoreMediaType) => (
          <ImageItem 
          className="col-span-2 border border-solid border-gray-300"
          key={ele.asset_id} 
          src={ele.secure_url} 
          alt={ele.filename} />
        ))}
    </div>
  );
};

export default MediaList;
