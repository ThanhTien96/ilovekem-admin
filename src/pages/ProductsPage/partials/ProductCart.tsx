import { ProductType } from "@type/product";
import clsx from "clsx";
import React from "react";
import ProductAction from "./ProductAction";
import { StaticContent } from "constants/staticContent";

type ProductCartProps = {
  className?: string;
  data?: ProductType;
};

const ProductCart: React.FC<ProductCartProps> = ({ className, data }) => {
  return (
    <div className={clsx(className)}>
      <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xxl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-l-lg"
          src={(data?.media &&Array.isArray(data?.media) && data?.media?.length > 0) ? data?.media[0].src : StaticContent.EMPTY_IMG}
          alt="..."
        />

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-xl line-clamp-2 font-bold tracking-tight text-gray-900 dark:text-white">
            {data?.productName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
            {data?.sortDescription}
          </p>
          <div className="flex gap-8">
            <span>
              <b>Giá Gốc:</b> {data?.originalPrice.toLocaleString()} vnđ
            </span>
            <span>
              <b>Giá Giảm:</b> {data?.overwritePrice.toLocaleString()} vnđ
            </span>
          </div>
        </div>

        {/* action row */}
        <ProductAction />
      </div>
    </div>
  );
};

export default ProductCart;
