import { MenuProps } from "antd";
import {
  PieChartOutlined,
  ProjectOutlined,
  AppstoreAddOutlined,
  ContainerFilled,
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
  getItem("Product",'', <PieChartOutlined />, [
    getItem("Add Product", pagePaths.addProduct, <AppstoreAddOutlined />),
    getItem("Product", pagePaths.product, <ContainerFilled />),
  ]),
];

export default items;