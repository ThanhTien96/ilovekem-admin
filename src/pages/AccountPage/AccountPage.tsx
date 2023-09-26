import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "reduxStore";
import {
  thunkGetAllAccount,
  thunkGetAllUserType,
} from "reduxStore/common/account/accountAsyncThunk";
import { Table, Tag, Avatar, Drawer, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AccountType, TableDataType } from "@type/accountType";
import { StaticContent } from "constants/staticContent";
import { ButtonApp, WrapperLayout } from "components/shared";
import { UserAddOutlined } from "@ant-design/icons";
import { UserForm } from "./partials";
import { UserFormValueType } from "./partials/UserForm";
import { AccountService } from "services/accountService";
import { setPageAccountLoading } from "reduxStore/common/account/accountSlice";

const columns: ColumnsType<TableDataType> = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (_, avatar) => (
      <Avatar size={64} src={avatar?.avatar?.src ?? StaticContent.EMPTY_IMG} />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "User Type",
    dataIndex: "userType",
    key: "userType",
    render: (_, type) => {
      const color =
        type.userType.role === 1
          ? "volcano"
          : type.userType.role === 2
          ? "green"
          : "geekblue";
      return (
        <div>
          <Tag color={color}>{type.userType.typeName}</Tag>
        </div>
      );
    },
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Number Phone",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Address",
    key: "6",
    dataIndex: "address",
  },
  {
    title: "Action",
    key: "7",
  },
];

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { accountList, userType, pageAccountLoading } = useAppSelector(
    (state) => state.common.accountSlice
  );
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  useEffect(() => {
    dispatch(thunkGetAllAccount());
    dispatch(thunkGetAllUserType());
  }, []);

  const data: TableDataType[] = accountList.map((ele: AccountType) => ({
    key: ele._id,
    avatar: {
      src: ele.avatar.src,
      fileName: ele.avatar.fileName,
    },
    name: ele.fullName,
    userType: {
      _id: ele.userType._id,
      typeName: ele.userType.typeName,
      role: ele.userType.role,
    },
    email: ele.email,
    phone: ele.numberPhone,
    address: ele.address,
    action: ele._id,
  }));

  const handleCreateAccount = async (value: UserFormValueType) => {
    setOpenDrawer(false)
    dispatch(setPageAccountLoading(true));
    const formData = new FormData();

    formData.append("userName", value.userName.trim());
    formData.append("password", value.password);
    formData.append("fullName", value.fullName);
    formData.append("email", value.email);
    formData.append("numberPhone", value.numberPhone);
    formData.append("address", value.address);
    formData.append("userType", value.userType);
    formData.append("avatar", value.avatar);

    try {
      const res = await AccountService.createAccount(formData);
      if (res.status === 200) {
        message.success("create account successfully");
        dispatch(thunkGetAllAccount());
      }
    } catch (err) {
      message.error("create account faild");
    } finally {
      dispatch(setPageAccountLoading(false));
    }
  };

  return (
    <WrapperLayout>
      <Spin spinning={pageAccountLoading}>
        <div className="flex justify-between mb-8">
          <h1 className="text-xl font-semibold">Account</h1>
          <div>
            <ButtonApp
              onClick={() => setOpenDrawer(true)}
              children={
                <div>
                  <UserAddOutlined className="mr-2" /> Create Account
                </div>
              }
            />
          </div>
        </div>
        <Table columns={columns} dataSource={data} />

        {/* drawer add user */}
        <Drawer
          width={"40%"}
          title="Create User"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
        >
          <UserForm onFinish={handleCreateAccount} userType={userType} />
        </Drawer>
      </Spin>
    </WrapperLayout>
  );
};

export default AccountPage;
