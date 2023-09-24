import "./AppLayout.style.less";
import { Layout, Menu, Input } from "antd";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import menus from "configs/sidemenu";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
  UserButton,
  NotificationButton,
  QuestionButton,
  MessageButton,
  ApplicationButton,
} from "./partials";
import  pagePath  from "constants/pagePath";

const { Search } = Input;

export interface AppLayoutProps {
  children?: React.ReactElement;
}

const XLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleNavigate = ({ key: path }: { key: React.Key }) => {
    navigate(path as string);
  };

  const handleToggle = (value: boolean) => setCollapsed(value);

  return (
    <Layout className='flex-row h-screen'>
      <Sider collapsible collapsed={collapsed} onCollapse={handleToggle}>
        <div className='logo' />
        <Menu
          defaultSelectedKeys={[pagePath.home]}
          mode='inline'
          onClick={handleNavigate}
          items={menus}
          className='h-full border-none'
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-header'>
          {/* Left section */}
          <div className='flex gap-4'>
            <ApplicationButton />
            <Search className='w-[300px]' placeholder='input search text' />
          </div>
          {/* Right section */}
          <div className='flex gap-4 items-center'>
            <MessageButton />
            <QuestionButton />
            <NotificationButton />
            <UserButton />
          </div>
        </Header>
        <Content className='flex flex-col h-[100vh] overflow-y-scroll' style={{ margin: "0 16px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default XLayout;