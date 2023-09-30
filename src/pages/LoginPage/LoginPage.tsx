import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Typography,
  Input,
  Button,
  Form,
  Tabs,
  Space,
  Checkbox,
  Divider,
  Spin,
  message,
} from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "reduxStore";
import { LoginPayloadType } from "@type/accountType";
import { thunkFetchProfile } from "reduxStore/common/user/userAsyncThunk";
import { AccountService } from "services/accountService";
import { setUserLoading } from "reduxStore/common/user/userSlice";

const { Content } = Layout;
const { Text, Title } = Typography;

function DefaultLoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginPayloadType) => {
    dispatch(setUserLoading(true));
    try {
      const res = await AccountService.userLogin(data);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refeshToken", res.data.refeshToken);
        localStorage.setItem("exp", res.data.exp);
        if (localStorage.getItem("token")) {
          await dispatch(thunkFetchProfile());
          message.success("login successfull");
          navigate("/home");
        }
      }
    } catch (err: any) {
      message.error(err.response.data.message);
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={handleLogin}>
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form-butto w-full">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}


const Page: React.FC = () => {
  const { userLoading } = useAppSelector((state) => state.common.userSlice);
  return (
    <Layout className="flex items-center h-screen w-full justify-center">
      <Spin spinning={userLoading}>
        <Content className="flex items-center">
          <Space direction="vertical">
            <Title level={2} className="text-center">
              I Love Kem System
            </Title>
            <Divider className="my-0">
              <Text type="secondary" className="text-center">
                Admin Manament
              </Text>
            </Divider>
            <Tabs
              defaultActiveKey="1"
              centered
              className="h-[280px] w-[400px]"
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <LoginOutlined />
                      Default
                    </span>
                  ),
                  children: <DefaultLoginForm />,
                },
              ]}
            />
            <Divider className="my-0">
              <Text type="secondary" className="text-center">
                Our contacts
              </Text>
            </Divider>
            <div className="flex flex-row items-center gap-4 justify-center">
              <Button shape="circle" icon={<GithubOutlined />} />
              <Button shape="circle" icon={<TwitterOutlined />} />
              <Button shape="circle" icon={<FacebookOutlined />} />
            </div>
          </Space>
        </Content>
      </Spin>
    </Layout>
  );
};

export default Page;
