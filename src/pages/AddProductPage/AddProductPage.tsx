import React, { useEffect, useState } from "react";
import { ProductForm, WrapperLayout } from "components/shared";
import { useAppDispatch, useAppSelector } from "reduxStore";
import { thunkFetchProductType, thunkGetAllProduct } from "reduxStore/common/product/productAsyncThunk";
import { ProductFromValueType } from "components/shared/ProductForm/ProductForm";
import { ProductService } from "services/prouductService";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import pagePaths from "constants/pagePath";


const AddProduct: React.FC = () => {
  const { productType } = useAppSelector((state) => state.common.productSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(thunkFetchProductType());
  }, [dispatch]);

  const handleFinish = async (value: ProductFromValueType) => {
    setPageLoading(true)
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
      value.media.forEach((image) => {
        formData.append(`media`, image.originFileObj);
      });
    }
    try {
      const res = await ProductService.createProduct(formData);
      if(res.status === 200) {
        message.success(res.data.message);
        await dispatch(thunkGetAllProduct({page:1}));
        navigate(`/${pagePaths.product}`)
      }
    } catch (err) {
      message.error("add product faild")
    } finally {
      setPageLoading(false)
    }
  };

  return (
    <WrapperLayout>
      <Spin spinning={pageLoading}>
        <div>
          <h1>Add Product</h1>
        </div>

        <ProductForm onFinish={handleFinish} productTypeData={productType} />
      </Spin>
    </WrapperLayout>
  );
};

export default AddProduct;
