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
import { UserAddOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { UserForm } from "./partials";
import { UserFormValueType } from "./partials/UserForm";
import { AccountService } from "services/accountService";
import { setPageAccountLoading } from "reduxStore/common/account/accountSlice";
import { truncateText } from "utils/commonFunc";
import styles from "./AccountPage.module.scss";
import clsx from "clsx";

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { accountList, userType, pageAccountLoading } = useAppSelector(
    (state) => state.common.accountSlice
  );
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDrawerUpdate, setOpenDrawerUpdate] = useState<boolean>(false);
  const [detailUser, setDetailUser] = useState<AccountType>();
  useEffect(() => {
    dispatch(thunkGetAllAccount());
    dispatch(thunkGetAllUserType());
  }, []);

  /** handle delete account */
  const handleDeleteAccount = async (id: string) => {
    dispatch(setPageAccountLoading(true));
    try {
      const res = await AccountService.deleteAccount(id);
      if (res.status === 200) {
        message.success(res.data.message);
        dispatch(thunkGetAllAccount());
      }
    } catch (err) {
      message.error("delete account faild");
    } finally {
      dispatch(setPageAccountLoading(false));
    }
  };

  /** handle update account */
  const handleInitilizeUpdate = async (id: string) => {
    dispatch(setPageAccountLoading(true));
    try {
      const res = await AccountService.getDetailAccount(id);
      if (res.status === 200) {
        await setDetailUser(res.data);
        setOpenDrawerUpdate(true);
      }
    } catch (err) {
      message.error("get detail account faild");
    } finally {
      dispatch(setPageAccountLoading(false));
    }
  };

  const handleUpdateAccount = async (value: UserFormValueType) => {
    dispatch(setPageAccountLoading(true));
    const formData = new FormData();

    formData.append("userName", value.userName.trim());
    if (value.password) {
      formData.append("password", value.password);
    }
    formData.append("fullName", value.fullName);
    formData.append("email", value.email);
    formData.append("numberPhone", value.numberPhone);
    formData.append("address", value.address);
    formData.append("userType", value.userType);
    if (value.avatar) {
      formData.append("avatar", value.avatar);
    }

    try {
      if (detailUser) {
        const res = await AccountService.updateAccount(
          detailUser._id,
          formData
        );
        if (res.status === 200) {
          message.success(res.data.message);
          dispatch(thunkGetAllAccount());
          setDetailUser(undefined);
          setOpenDrawerUpdate(false);
        }
      }
    } catch (err) {
      message.error("update account faild");
    } finally {
      dispatch(setPageAccountLoading(false));
    }
  };

  const columns: ColumnsType<TableDataType> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: '5%',
      render: (_, avatar) => (
        <Avatar
          size={64}
          src={avatar?.avatar?.src ?? StaticContent.EMPTY_IMG}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%"
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      width: "10%",
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
      title: "User Name",
      key: "userName",
      dataIndex: "userName",
      width: "15%",
      render: (_, value) => {
        return (
          <p className="text-[14px] font-semibold" key={value.userName}>
            {" "}
            {value.userName}
          </p>
        );
      },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: '15%',
      render: (_, value) => {
        return (
          <div
            key={value.email}
            className={clsx("relative cursor-pointer", styles.tableItem)}
          >
            <p className="text-[14px] font-semibold">
              {truncateText(value.email, 20)}
            </p>
            <div
              className={clsx(
                "absolute bottom-full left-0 p-2 bg-gray-800 text-white shadow-lg z-50",
                styles.tableItemHover
              )}
            >
              <p>{value.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Number Phone",
      key: "phone",
      dataIndex: "phone",
      width: '10%'
    },
    {
      title: "Address",
      key: "6",
      dataIndex: "address",
      width: "20%",
      render: (_, value) => {
        return (
          <div
            key={value.address}
            className={clsx("relative cursor-pointer", styles.tableItem)}
          >
            <p className="text-[14px] font-semibold">
              {truncateText(value.address, 20)}
            </p>
            <div
              className={clsx(
                "absolute bottom-full left-0 p-2 bg-gray-800 text-white shadow-lg",
                styles.tableItemHover
              )}
            >
              <p>{value.address}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "7",
      dataIndex: "action",
      render: (_, value) => {
        return (
          value?.userType?.role !== 1 && (
            <div key={value.action}>
              <EditFilled
                onClick={() => handleInitilizeUpdate(value.action)}
                className="text-[20px] cursor-pointer text-green-600 mr-4 transition-all duration-200 hover:text-green-900"
              />

              <DeleteFilled
                onClick={() => handleDeleteAccount(value.action)}
                className="text-[20px] cursor-pointer text-rose-600 transition-all duration-200 hover:text-rose-900"
              />
            </div>
          )
        );
      },
    },
  ];

  const data: TableDataType[] = accountList.map((ele: AccountType) => ({
    key: ele._id,
    avatar: {
      src: ele.avatar.src,
      fileName: ele.avatar.fileName,
    },
    name: ele.fullName,
    userName: ele.userName,
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
    setOpenDrawer(false);
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

        {/* drawer update user */}
        <Drawer
          width={"40%"}
          title="Update User"
          placement="right"
          onClose={() => setOpenDrawerUpdate(false)}
          open={openDrawerUpdate}
        >
          {detailUser && (
            <UserForm
              defaultVal={detailUser}
              onFinish={handleUpdateAccount}
              userType={userType}
            />
          )}
        </Drawer>
      </Spin>
    </WrapperLayout>
  );
};

export default AccountPage;
