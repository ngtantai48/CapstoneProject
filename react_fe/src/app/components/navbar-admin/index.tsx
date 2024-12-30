import {
  AppstoreOutlined,
  AreaChartOutlined,
  ChromeOutlined,
  CodeSandboxOutlined,
  CreditCardOutlined,
  DingtalkOutlined,
  FacebookOutlined,
  MoneyCollectOutlined,
  RiseOutlined,
  AimOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <AreaChartOutlined />,
  },
  {
    key: 'management',
    label: 'Management',
    icon: <AppstoreOutlined />,
    children: [
      { key: '1', label: 'User', icon: <UserOutlined /> },
      { key: '2', label: 'Post', icon: <FileTextOutlined /> },
    ],
  },
  {
    key: 'ai',
    label: 'AI Career Connect',
    icon: <AimOutlined />,
    children: [
      { key: '3', label: 'VietnamSalary', icon: <MoneyCollectOutlined /> },
      { key: '4', label: 'Job opportunity', icon: <RiseOutlined /> },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'crawl',
    label: 'Crawl data',
    icon: <ChromeOutlined />,
    children: [
      { key: '5', label: 'Facebook', icon: <FacebookOutlined /> },
      { key: '6', label: 'Vieclam24h', icon: <CodeSandboxOutlined /> },
      { key: '7', label: 'Topdev', icon: <DingtalkOutlined /> },
    ],
  },
  { key: '8', label: 'Giao dịch', icon: <CreditCardOutlined /> },
];

interface Props {
  setMenuId: (menuId: string) => void;
}

const NavBarAdmin = ({ setMenuId }: Props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    setMenuId(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256, height: 'calc(100vh - 72px)' }}
      defaultSelectedKeys={['dashboard']}
      defaultOpenKeys={['ai', 'crawl']}
      mode="inline"
      items={items}
    />
  );
};

export default NavBarAdmin;
