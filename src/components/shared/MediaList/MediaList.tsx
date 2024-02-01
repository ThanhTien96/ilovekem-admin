import React, { useState } from "react";
import ImageItem from "./partials/ImageItem";
import { StoreMediaType } from "@type/mediaType";
import Lightbox, { ImagesListType } from "react-spring-lightbox";

type MediaListProps = {
  mediaData?: StoreMediaType[];
};

const MediaList: React.FC<MediaListProps> = ({ mediaData }) => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const imagesList: ImagesListType =
    mediaData && Array.isArray(mediaData)
      ? mediaData.map((ele) => ({
          src: ele.secure_url,
          loading: "lazy",
          alt: ele.public_id,
        }))
      : [];

     
  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < imagesList.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <div className="grid grid-cols-12 gap-2">
      {mediaData &&
        Array.isArray(mediaData) &&
        mediaData.length > 0 &&
        mediaData.map((ele: StoreMediaType) => (
          <ImageItem
            onShowImage={() => {
              const findIndex = imagesList.findIndex(
                (i) => i.src === ele.secure_url
              );
              setCurrentIndex(findIndex);
              setShowImage(true)
            }}
            className="col-span-2 border border-solid border-gray-300"
            key={ele.asset_id}
            src={ele.secure_url}
            alt={ele.filename}
            fileName={ele.public_id}
          />
        ))}

      {/* react spring light box */}
      {
        showImage && <Lightbox
        isOpen={true}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={imagesList}
        currentIndex={currentImageIndex}
        className="cool-class"
        onClose={() => setShowImage(false)}
        style={{ background: "#80808073" }}
        singleClickToZoom
      />
      }
    </div>
  );
};

export default MediaList;
