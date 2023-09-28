import { Button, Avatar, Typography, Popover, Space, Divider } from "antd";
import {
  LogoutOutlined,
  CoffeeOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "reduxStore";



const { Text } = Typography;

interface MenuItemProps {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface MenuProps {
  items?: (MenuItemProps | null)[];
}

function Menu(props: MenuProps) {
  const { items } = props;

  return (
    <Space direction='vertical' className='w-full'>
      {items &&
        items.map((value) => {
          if (!value) {
            return <Divider className='my-0' />;
          }
          return (
            <Button
              type='text'
              icon={value.icon}
              onClick={value.onClick}
              key={value.key}
              className='w-full text-start'
            >
              {value.label}
            </Button>
          );
        })}
    </Space>
  );
}

function UserButton() {
  const {profile} = useAppSelector(state => state.common.userSlice);
  const navigate = useNavigate();

  const handleNavigate = (url: string) => navigate(url);

  // TODO
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("exp");
    
    navigate('/login')
  };

  const menuItems: (MenuItemProps | null)[] = [
    {
      key: "profile",
      label: "Profile",
      icon: <ProfileOutlined />,
      onClick: () => handleNavigate('/profile'),
    },
    {
      key: "discussion",
      label: "Discussion",
      icon: <CoffeeOutlined />,
    },
    null,
    {
      key: "help",
      label: "Help",
      icon: <InfoCircleOutlined />,
    },
    {
      key: "setting",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: () => handleNavigate(`/settings`),
    },
    null,
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Popover
      placement='bottomRight'
      title={"Information"}
      content={<Menu items={menuItems} />}
      trigger='click'
    >
      <Button type='text' className='h-[45px] px-2'>
        <div className='flex flex-row gap-4 items-center'>
          <Avatar src={profile?.avatar.src} />
          <Text className="font-semibold">{profile?.fullName}</Text>
        </div>
      </Button>
    </Popover>
  );
}

export default UserButton;
