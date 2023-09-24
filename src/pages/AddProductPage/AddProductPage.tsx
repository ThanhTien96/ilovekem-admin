import React, { useEffect } from "react";
import { ProductForm, WrapperLayout } from "components/shared";
import { useAppDispatch, useAppSelector } from "reduxStore";
import { thunkFetchProductType } from "reduxStore/common/product/productAsyncThunk";
import { ProductFromValueType } from "components/shared/ProductForm/ProductForm";
import { ProductService } from "services/prouductService";

type AddProductProps = {};

const AddProduct: React.FC<AddProductProps> = (props) => {
  const { productType } = useAppSelector((state) => state.product.productSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkFetchProductType());
  }, [dispatch]);

  const handleFinish = async (value: ProductFromValueType) => {

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
        formData.append(`media`, image.originFileObj
        );
      });
    }
    try {
      const res = await ProductService.createProduct(formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WrapperLayout>
      <div>
        <h1>Add Product</h1>
      </div>

      <ProductForm onFinish={handleFinish} productTypeData={productType} />
    </WrapperLayout>
  );
};

export default AddProduct;
