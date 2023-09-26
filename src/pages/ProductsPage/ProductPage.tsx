import React, { useEffect } from "react";
import { ProductCart } from "./partials";
import { useAppDispatch, useAppSelector } from "reduxStore";
import { ProductType } from "@type/product";
import { Pagination, Spin, Empty } from "antd";
import { thunkGetAllProduct } from "reduxStore/common/product/productAsyncThunk";
import { ButtonApp, WrapperLayout } from "components/shared";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import pagePaths from "constants/pagePath";
const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(thunkGetAllProduct({ page: 1 }));
  }, []);

  const { productList, pageLoading } = useAppSelector(
    (state) => state.common.productSlice
  );

  return (
    <WrapperLayout>
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-semibold">Product</h1>
        <div>
          <ButtonApp
            onClick={() => {
              navigate(`/${pagePaths.addProduct}`);
            }}
            children={
              <div>
                <AppstoreAddOutlined className="mr-2" /> Add Product
              </div>
            }
          />
        </div>
      </div>
      <Spin spinning={pageLoading}>
        <React.Suspense fallback={<Empty />}>
          {productList && Array.isArray(productList.data) && productList.data.length > 0 ? (
            <div className="h-full">
              <div className="grid grid-cols-12">
                {productList?.data?.map(
                  (ele: ProductType, index: React.Key) => {
                    return (
                      <ProductCart
                        key={index}
                        data={ele}
                        className="col-span-6 py-4 px-4"
                      />
                    );
                  }
                )}
              </div>
              {productList && (
                <div className=" flex justify-center items-center mt-8 mb-14">
                  <Pagination
                    onChange={(e) => {
                      dispatch(thunkGetAllProduct({ page: e }));
                    }}
                    defaultCurrent={1}
                    total={productList?.total}
                  />
                </div>
              )}
            </div>
          ) : (
            <Empty />
          )}
        </React.Suspense>
      </Spin>
    </WrapperLayout>
  );
};

export default ProductPage;
