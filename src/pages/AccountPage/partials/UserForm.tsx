import { AccountType, TypeOfUserType } from "@type/accountType";
import { Avatar, Form, Input, Select } from "antd";
import { ButtonApp } from "components/shared";
import { useFormik } from "formik";
import React, { useState } from "react";
import { UploadAvatar } from ".";
import { StaticContent } from "constants/staticContent";
import * as yup from 'yup';
import { regexValidation } from "utils/regexValidation";

type UserFormProps = {
  userType: TypeOfUserType[];
  onFinish: (value: UserFormValueType) => void;
  defaultVal?: AccountType;
};

export interface UserFormValueType {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  numberPhone: string;
  address: string;
  userType: string;
  avatar: any;
}

const UserForm: React.FC<UserFormProps> = ({
  userType,
  onFinish,
  defaultVal,
}) => {
  const [resetImage, setResetImage] = useState<boolean>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: defaultVal?.userName ?? "",
      password: "",
      fullName: defaultVal?.fullName ?? "",
      email: defaultVal?.email ?? "",
      numberPhone: defaultVal?.numberPhone ?? "",
      address: defaultVal?.address ?? "",
      userType: defaultVal?.userType._id ?? "",
      avatar: null,
    },
    validationSchema: yup.object({
      userName: yup.string().required('user name is require').trim().matches(regexValidation.userName, 'user name must be text and number no space and special characters'),
      password: !defaultVal ?  yup.string().required("password require").matches(regexValidation.checkPassword, 'passwor must be have 1 uppercase 1 number 1 special character and as least 6 character') : yup.string(),
      fullName: yup.string().required("full name is require"),
      email: yup.string().email('not correct email pattent').required("email is required"),
      numberPhone: yup.string().required("phone number is require"),
      address: yup.string().required("address is require"),
      userType: yup.string().required("user type is require"),
    }),
    onSubmit: (value: UserFormValueType) => {
      onFinish(value);
      formik.resetForm();
      setResetImage(true);
    },
  });

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      {/* upload avatar */}
      <Form.Item label="Upload Avatar">
        <div className="flex items-center gap-8">
          {defaultVal && formik.values.avatar === null && (
            <div>
              <Avatar
                size={100}
                src={defaultVal.avatar.src ?? StaticContent.EMPTY_IMG}
              />
            </div>
          )}
          <UploadAvatar
            resetImage={resetImage}
            onUpload={(e) => formik.setFieldValue("avatar", e[0].originFileObj)}
          />
        </div>
      </Form.Item>

      {/* userName */}
      <Form.Item
        tooltip="account name use when you login"
        required
        label="User Name"
      >
        <Input
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          placeholder="Input user name"
        />
        {
          formik.touched.userName && formik.errors.userName && <p className="text-rose-600 mt-1">{formik.errors.userName}</p>
        }
      </Form.Item>

      {/* password */}
      <Form.Item
      name="password"
      required
        label="Password"
        hasFeedback
      >
        <Input.Password
        name="password"

          onChange={formik.handleChange}
          placeholder={defaultVal ? "∙∙∙∙∙∙∙∙∙∙" : "input your password"}
        />
        {
          formik.touched.password && formik.errors.password && <p className="text-rose-600 mt-1">{formik.errors.password}</p>
        }
      </Form.Item>
      {/* confirm password */}
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        tooltip="confirm password must be include password"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder={defaultVal ? "∙∙∙∙∙∙∙∙∙∙" : "input your password"}
        />
      </Form.Item>

      {/* full name */}
      <Form.Item required label="Full Name">
        <Input
          name="fullName"
          defaultValue={formik.values.fullName}
          onChange={formik.handleChange}
          placeholder="Input product name"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="text-rose-600">{formik?.errors.fullName}</p>
        )}
      </Form.Item>

      {/* email */}
      {/* number phone */}
      <Form.Item required label="Email">
        <Input
          name="email"
          placeholder="input your email"
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          style={{ width: "100%" }}
        />
        {
          formik.touched.email && formik.errors.email && <p className="text-rose-600 mt-1">{formik.errors.email}</p>
        }
      </Form.Item>

      {/* number phone */}
      <Form.Item required label="Phone Number">
        <Input
          name="numberPhone"
          value={formik.values.numberPhone}
          placeholder="input your number phone"
          onChange={formik.handleChange}
          style={{ width: "100%" }}
        />
        {
          formik.touched.numberPhone && formik.errors.numberPhone && <p className="text-rose-600 mt-1">{formik.errors.numberPhone}</p>
        }
      </Form.Item>

      {/* address */}
      {/* number phone */}
      <Form.Item required label="Address">
        <Input
          name="address"
          value={formik.values.address}
          placeholder="input your address"
          onChange={formik.handleChange}
        />
        {
          formik.touched.address && formik.errors.address && <p className="text-rose-600 mt-1">{formik.errors.address}</p>
        }
      </Form.Item>

      {/* user type */}
      <Form.Item required label="User Type">
        <Select
          onChange={(e) => formik.setFieldValue("userType", e)}
          defaultValue={{
            value: userType.find((ele) => ele._id === defaultVal?.userType._id)
              ?._id,
            label: userType.find((ele) => ele._id === defaultVal?.userType._id)
              ?.typeName,
          }}
          
        >
          {userType &&
            userType.filter(i => i.role !== 1).map((ele: TypeOfUserType) => (
              <Select.Option key={ele._id} value={ele._id}>
                {ele.typeName}
              </Select.Option>
            ))}
        </Select>
        {
          formik.touched.userType && formik.errors.userType && <p className="text-rose-600 mt-1">{formik.errors.userType}</p>
        }
      </Form.Item>

      {/* from action */}
      <Form.Item wrapperCol={{ offset: 6 }}>
        <ButtonApp htmlType="submit">
          {defaultVal ? "Update" : "Create New User"}
        </ButtonApp>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
