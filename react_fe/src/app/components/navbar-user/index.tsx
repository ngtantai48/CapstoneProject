import {
  AimOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  HeartOutlined,
  MoneyCollectOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'account',
    label: 'Thông tin cá nhân',
    icon: <UserOutlined />,
    children: [
      { key: '1', label: 'Tài khoản', icon: <UsergroupAddOutlined /> },
      { key: '2', label: 'Skill làm việc', icon: <CheckCircleOutlined /> },
    ],
  },
  {
    key: 'ai',
    label: 'AI Career Connect',
    icon: <AimOutlined />,
    children: [
      { key: '3', label: 'VietnamSalary', icon: <MoneyCollectOutlined /> },
      { key: '4', label: 'Career opportunity', icon: <RiseOutlined /> },
    ],
  },
  {
    type: 'divider',
  },
  { key: '5', label: 'Việc làm đã lưu', icon: <HeartOutlined /> },
  { key: '6', label: 'Premium account', icon: <CreditCardOutlined /> },
];

interface Props {
  setMenuId: (menuId: string) => void;
}

const NavBarUser = ({ setMenuId }: Props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    setMenuId(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, height: 'calc(100vh - 72px)' }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['account', 'ai']}
      mode="inline"
      items={items}
    />
  );
};

export default NavBarUser;
