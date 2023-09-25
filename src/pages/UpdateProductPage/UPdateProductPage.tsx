import { ProductForm, WrapperLayout } from "components/shared";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "reduxStore";
import {
  thunkFetchDetailProduct,
  thunkFetchProductType,
  thunkGetAllProduct,
} from "reduxStore/common/product/productAsyncThunk";
import { Spin, message } from "antd";
import { ProductFromValueType } from "components/shared/ProductForm/ProductForm";
import { ProductService } from "services/prouductService";
import { setproductLoading } from "reduxStore/common/product/productSlice";
import pagePaths from "constants/pagePath";
type UPdateProductPageProps = {};

const UPdateProductPage: React.FC<UPdateProductPageProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const { productDetail, productType, pageLoading } = useAppSelector(
    (state) => state.product.productSlice
  );

  useEffect(() => {
    dispatch(thunkFetchProductType());
  }, [dispatch]);
  /** handle fetch detail Product */
  useEffect(() => {
    if (productId) {
      dispatch(thunkFetchDetailProduct(productId));
    }
  }, [productId]);

  /** handle finish input */
  const handleFinishInput = async (value: ProductFromValueType) => {
    dispatch(setproductLoading(true))
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    formData.append("productName", value.productName);
    formData.append("productType", value.productType);
    formData.append("originalPrice", value.originalPrice.toString());
    formData.append("overwritePrice", value.overwritePrice.toString());
    formData.append("rate", value.rate.toString());
    formData.append("description", value.description);
    formData.append("sortDescription", value.sortDescription);

    if (value.media) {
      value.media.forEach((image, index) => {
        formData.append(`media`, image.originFileObj);
      });
    }
    try {
      if (productDetail) {
        const res = await ProductService.updateProduct(
          productDetail?._id,
          formData
        );
        message.success(res.data.message);
        dispatch(thunkGetAllProduct({page: 1}));
        navigate(`/${pagePaths.product}`)
      }
    } catch (err) {
      message.error("update product faild");
    } finally {
        dispatch(setproductLoading(false));
    }
  };

  return (
    <WrapperLayout>
      <Spin spinning={pageLoading}>
        <ProductForm
          onFinish={handleFinishInput}
          defaultVal={productDetail}
          productTypeData={productType}
        />
      </Spin>
    </WrapperLayout>
  );
};

export default UPdateProductPage;
