import { LockOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Divider, Dropdown, Input ,MenuProps} from 'antd';
import React from 'react';
import styles from './Header.module.scss';

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/auth";
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
     <div>
        <UserOutlined />
        <a>My account</a>
     </div>
    ),
  },
  {
    key: '2',
    label: (
      <div>
        <SettingOutlined />
      <a>
        Settings
    </a>
    </div>
    ),
  },
  {
    key: '3',
    label: (
        <Divider style={{margin:0}} />
    ),
  },
  {
    key: '4',
    label: (
      <div onClick={handleLogout}>
      <LogoutOutlined />
      <a>
        Logout
      </a>
    </div>
    ),
  },
];

interface HeaderProps {
  onCollapsed: () => void,
  collapsed: boolean
}
const Header = ({onCollapsed,collapsed}: HeaderProps) => {

  return <div className={styles.header}>
    <div>
      <img className={styles.logo} src='./assets/logo.png' alt='logo'/>
    </div>
      <div> 
        {
          collapsed ? <MenuUnfoldOutlined onClick={() => onCollapsed()}/> : <MenuFoldOutlined onClick={() => onCollapsed()} />
        }
      </div>
      <div>
      <LockOutlined />
      </div>
      <div>
      <AutoComplete
    dropdownMatchSelectWidth={500}
    // options={options}
  >
    <Input.Search style={{width:1024}} size="large" placeholder="input here" />
    </AutoComplete>
      </div>
        <Dropdown className={styles.menu} menu={{ items }} placement="bottomRight" trigger={["click"]}>
          <Avatar />
         </Dropdown>
  </div>
}

export default Header