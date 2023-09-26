import { MenuProps } from "antd";
import {
  PieChartOutlined,
  ProjectOutlined,
  AppstoreAddOutlined,
  ContainerFilled,
  WeiboOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import  pagePaths  from "constants/pagePath";


export type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard",pagePaths.home , <ProjectOutlined />),
  getItem("Product",'allProduct', <PieChartOutlined />, [
    getItem("Add Product", pagePaths.addProduct, <AppstoreAddOutlined />),
    getItem("Product", pagePaths.product, <ContainerFilled />),
  ]),
  getItem("Post",'allPost', <WeiboOutlined />, [
    getItem("Post", pagePaths.post, <DropboxOutlined />),
  ]),
];

export default items;