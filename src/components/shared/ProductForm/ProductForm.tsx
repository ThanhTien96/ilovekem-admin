import { Form, Input, Select, InputNumber, Upload } from "antd";
import React from "react";
import { ButtonApp, TextEditor, UploadMedia } from "..";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { FormikFormProps, useFormik } from "formik";
import * as yup from "yup";
import { TypeOfProductType } from "@type/productType";
import { ProductType } from "@type/product";

type ProductFormProps = {
  productTypeData?: TypeOfProductType[];
  onFinish?: (value: ProductFromValueType) => void;
  defaultVal?: ProductType;
};

export interface ProductFromValueType {
  productName: string;
  productType: string;
  originalPrice: number;
  overwritePrice: number;
  rate: number;
  description: string;
  sortDescription: string;
  media: any[] | null;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productTypeData,
  onFinish,
  defaultVal,
}) => {

  const formik = useFormik({
    initialValues: {
      productName: defaultVal?.productName ?? "",
      productType: defaultVal?.productType._id ?? "",
      originalPrice: defaultVal?.originalPrice ?? 0,
      overwritePrice: defaultVal?.overwritePrice ?? 0,
      rate: defaultVal?.rate ?? 0,
      description: defaultVal?.description ?? "",
      sortDescription: defaultVal?.sortDescription ?? "",
      media: null,
    },
    validationSchema: yup.object({
      productName: yup.string().required("product name is require"),
      productType: yup.string().required("product type is require"),
      originalPrice: yup
        .number()
        .min(1, "you need to input a number")
        .required("original price is require"),
      overwritePrice: yup
        .number()
        .min(1, "you need to input a number")
        .required("overwrite price is require"),
      rate: yup
        .number()
        .min(1, "you need to select one option")
        .required("rate is require"),
      description: yup.string().required("description is require"),
      sortDescription: yup.string().required("sort description is require"),
    }),
    onSubmit: (value: ProductFromValueType) => {
      onFinish && onFinish(value);
    },
  });

  return (
    <Form
      scrollToFirstError
      onSubmitCapture={formik.handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      size="large"
    >
      <Form.Item required label="Product Name">
        <Input
          value={formik.values.productName}
          name="productName"
          onChange={formik.handleChange}
          placeholder="Input product name"
        />
        {formik.touched.productName && formik.errors.productName && (
          <p className="text-rose-600">{formik?.errors.productName}</p>
        )}
      </Form.Item>
      <Form.Item required label="Product Type">
        <Select
          defaultValue={defaultVal?.productType.typeName}
          onChange={(value) => {
            formik.setFieldValue("productType", value);
          }}
          placeholder={"select product type"}
        >
          {productTypeData ? (
            productTypeData.map((ele: TypeOfProductType) => (
              <Select.Option key={ele._id} value={ele._id}>
                {ele.typeName}
              </Select.Option>
            ))
          ) : (
            <Select.Option value="demo">No matched ...</Select.Option>
          )}
        </Select>
        {formik.touched.productType && formik.errors.productType && (
          <p className="text-rose-600">{formik?.errors.productType}</p>
        )}
      </Form.Item>

      <Form.Item required label="Original Price">
        <InputNumber
          value={formik.values.originalPrice}
          onChange={(value) => formik.setFieldValue("originalPrice", value)}
          placeholder="input your original price"
          className="w-full"
          suffix="VND"
        />
        {formik.touched.originalPrice && formik.errors.originalPrice && (
          <p className="text-rose-600">{formik?.errors.originalPrice}</p>
        )}
      </Form.Item>

      <Form.Item required label="Overwrite Price">
        <InputNumber
          value={formik.values.overwritePrice}
          onChange={(value) => formik.setFieldValue("overwritePrice", value)}
          placeholder="input your overwrite price"
          className="w-full"
          suffix="VND"
        />
        {formik.touched.overwritePrice && formik.errors.overwritePrice && (
          <p className="text-rose-600">{formik?.errors.overwritePrice}</p>
        )}
      </Form.Item>

      <Form.Item required label="Rate Of Star">
        <Select
          defaultValue={formik.values.rate +' ' + ' star'}
          placeholder="select your rate"
          onSelect={(value) => formik.setFieldValue("rate", Number(value))}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Select.Option key={index} value={index + 1}>
              {index + 1} star
            </Select.Option>
          ))}
        </Select>
        {formik.touched.rate && formik.errors.rate && (
          <p className="text-rose-600">{formik?.errors.rate}</p>
        )}
      </Form.Item>

      <Form.Item required label="Description">
        <TextEditor
        defaultVal={formik.values.description}
          onEditor={(value) => formik.setFieldValue("description", value)}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-rose-600 mt-4">{formik?.errors.description}</p>
        )}
      </Form.Item>

      <Form.Item required label="Sort Description">
        <TextArea
        value={formik.values.sortDescription}
          name="sortDescription"
          onChange={formik.handleChange}
          rows={10}
        />
        {formik.touched.sortDescription && formik.errors.sortDescription && (
          <p className="text-rose-600">{formik?.errors.sortDescription}</p>
        )}
      </Form.Item>
      <Form.Item required label="Image">
        <UploadMedia
          onUpload={(files) => formik.setFieldValue("media", files)}
        />
        {formik.touched.media && formik.errors.media && (
          <p className="text-rose-600">{formik?.errors.media}</p>
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <ButtonApp htmlType="submit" children="add Product" />
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
