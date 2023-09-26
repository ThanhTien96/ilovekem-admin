import { TypeOfUserType } from "@type/accountType";
import { Form, Input, Select } from "antd";
import { ButtonApp } from "components/shared";
import { useFormik } from "formik";
import React, {useState} from "react";
import { UploadAvatar } from ".";

type UserFormProps = {
  userType: TypeOfUserType[];
    onFinish: (value: UserFormValueType) => void;
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultActiveFirstOption style={{ width: 70 }}>
      <Select.Option value="84">+84</Select.Option>
      <Select.Option value="86">+86</Select.Option>
      <Select.Option value="87">+87</Select.Option>
    </Select>
  </Form.Item>
);

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

const UserForm: React.FC<UserFormProps> = ({ userType, onFinish }) => {
  const [resetImage, setResetImage] = useState<boolean>(false);
  
    const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      fullName: "",
      email: "",
      numberPhone: "",
      address: "",
      userType: "",
      avatar: null,
    },
    onSubmit: (value: UserFormValueType) => {
      onFinish(value);
      formik.resetForm();
      setResetImage(true)
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
      <Form.Item
        name="avatar"
        rules={[
            { required: true, message: "Please choose avatar!" }
        ]}
        label="Upload Avatar"
      >
        <UploadAvatar resetImage={resetImage} onUpload={(e) => formik.setFieldValue('avatar', e[0].originFileObj)} />
      </Form.Item>

      {/* userName */}
      <Form.Item
        name="userName"
        rules={[
            { required: true, message: "Please input user name!" },
            { pattern: /^[a-zA-Z0-9]*$/, message: "user name only allow text and number no space"}
    ]}
        tooltip="account name use when you login"
        required
        label="User Name"
      >
        <Input
          value={formik.values.userName}
          onChange={formik.handleChange}
          placeholder="Input user name"
        />
      </Form.Item>

      {/* password */}
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          onChange={formik.handleChange}
          placeholder="input your password"
        />
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
        <Input.Password placeholder="confirm your password" />
      </Form.Item>

      {/* full name */}
      <Form.Item
        rules={[{ required: true, message: "Please input full name!" }]}
        name="fullName"
        label="Full Name"
      >
        <Input
          value={formik.values.fullName}
          onChange={formik.handleChange}
          placeholder="Input product name"
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="text-rose-600">{formik?.errors.fullName}</p>
        )}
      </Form.Item>

      {/* email */}
      {/* number phone */}
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input email!" }]}
        label="Email"
      >
        <Input
          placeholder="input your email"
          onChange={formik.handleChange}
          type="email"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* number phone */}
      <Form.Item
        rules={[{ required: true, message: "Please input phone number!" }]}
        name="numberPhone"
        label="Phone Number"
      >
        <Input
          placeholder="input your number phone"
          onChange={formik.handleChange}
          addonBefore={prefixSelector}
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* address */}
      {/* number phone */}
      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please input address!" }]}
        label="Address"
      >
        <Input
          placeholder="input your address"
          onChange={formik.handleChange}
        />
      </Form.Item>

      {/* user type */}
      <Form.Item
        name="userType"
        label="User Type"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select
          onSelect={(e) => formik.setFieldValue("userType", e)}
          placeholder="select user type"
        >
          {userType &&
            userType.map((ele: TypeOfUserType) => (
              <Select.Option key={ele._id} value={ele._id}>
                {ele.typeName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      {/* from action */}
      <Form.Item wrapperCol={{ offset: 6 }}>
        <ButtonApp htmlType="submit">Create New User</ButtonApp>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
