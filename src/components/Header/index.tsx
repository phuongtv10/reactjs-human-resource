import { LockOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Divider, Dropdown, Input ,MenuProps} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';




interface HeaderProps {
  onCollapsed: () => void,
  collapsed: boolean
}
const Header = ({onCollapsed,collapsed}: HeaderProps) => {

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