import { LockOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Divider, Dropdown, Input ,MenuProps} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

interface HeaderProps {
  onCollapsed: () => void,
  collapsed: boolean
}
const Header = ({ onCollapsed, collapsed }: HeaderProps) => {
  const [widthScreen, setWidth] = useState(2450);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const navigate = useNavigate()

  const handleLogout = () => {
    
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
       <div onClick={() => navigate('/account')}>
          <UserOutlined />
          <a>My account</a>
       </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => navigate('/settings')}>
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

  return <div className={styles.header}>
    <div>
      <img className={styles.logo} src='./assets/logo.png' alt='logo' />
    </div>
    <div style={{ paddingLeft: '4rem' }}>
      {
        collapsed ? <MenuUnfoldOutlined onClick={() => onCollapsed()} /> : <MenuFoldOutlined onClick={() => onCollapsed()} />
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
        <Input prefix={<SearchOutlined style={{ 'height': '1rem' }} />} style={{ width: `calc(${widthScreen}px - 100vh)`, 'maxHeight': '2.3rem' }} size="large" placeholder="Search for people, file, photos..." />
      </AutoComplete>
    </div>
    <div>
      <SettingOutlined />
    </div>
    <Dropdown className={styles.menu} menu={{ items }} placement="bottomRight" trigger={["click"]}>
      {/* <Avatar /> */}
      <div>
        <img className={styles.userImg} src='./assets/avatar.jpeg' alt='logo' />
      </div>
    </Dropdown>
  </div>
}

export default Header