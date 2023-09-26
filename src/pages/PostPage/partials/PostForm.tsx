import React, { useState } from "react";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { ButtonApp, TextEditor, UploadMedia } from "components/shared";
import * as yup from 'yup';
import { PostType } from "@type/postType";

type PostFormProps = {
    defaultVal?: PostType;
    onFinish: (value: PostFormValueType) => void;
};

export type PostFormValueType = {
  title: string;
  content: string;
  subContent: string;
  media: any;
};

const PostForm: React.FC<PostFormProps> = ({defaultVal, onFinish}) => {
    const [resetImage, setResetImage] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: defaultVal?.title ?? "",
      content: defaultVal?.content ?? "",
      subContent: defaultVal?.subContent ?? "",
      media: null,
    },
    validationSchema: yup.object({
        title: yup.string().required('this field is require'),
        content: yup.string().required('this field is require'),
        subContent: yup.string().required('this field is require')
    }),
    onSubmit: (value: PostFormValueType) => {
      onFinish(value);
      formik.resetForm();
      setResetImage(true)
    },
  });
  return (
    <Form
    onSubmitCapture={formik.handleSubmit}
    size="large"
    layout="vertical"
    >
      {/* title */}
      <Form.Item required label="Title">
        <Input
          value={formik.values.title}
          name="title"
          onChange={formik.handleChange}
          placeholder="Input product name"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-rose-600">{formik?.errors.title}</p>
        )}
      </Form.Item>

      {/* media */}
      <Form.Item required label="Image">
        
        <UploadMedia
        resetImageList={resetImage}
          onUpload={(files) => formik.setFieldValue("media", files)}
        />
        <p>media can be emty, max is 6 image</p>
      </Form.Item>

      {/* content */}
      <Form.Item label="content" required>
        <TextEditor
          defaultVal={formik.values.content}
          onEditor={(value) => formik.setFieldValue("content", value)}
        />
        {formik.touched.content && formik.errors.content && (
          <p className="text-rose-600">{formik?.errors.content}</p>
        )}
      </Form.Item>

      {/* subcontent */}
      <Form.Item required label="Sort Content">
        <TextArea
          value={formik.values.subContent}
          name="subContent"
          onChange={formik.handleChange}
          rows={10}
        />
        {formik.touched.subContent && formik.errors.subContent && (
          <p className="text-rose-600">{formik?.errors.subContent}</p>
        )}
      </Form.Item>

      {/* submit button */}
      <Form.Item >
        <ButtonApp htmlType="submit" children="add Post" />
      </Form.Item>
    </Form>
  );
};

export default PostForm;
