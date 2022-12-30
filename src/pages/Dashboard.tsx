import { Layout as AntLayout} from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React, { useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import styles from './Dashboard.module.scss'
import Quanlychamcong from '../components/QuanLyChamCong'
import type { MenuProps } from 'antd';
import { Menu } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Dashboard = () => {

  const [collapsed,setCollapsed] = useState(false)

  type MenuItem = Required<MenuProps>['items'][number];

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
    getItem('Danh mục', ''),
    getItem('Hồ sơ nhân viên', '1', <TeamOutlined />, [getItem('Hồ sơ', '2')]),
    getItem('Quản lý nhân hợp đồng', '3', <DesktopOutlined />, [getItem('Danh sách hợp đồng', '4')]),
    getItem('Quản lý công', 'sub1', <UserOutlined />, [
      getItem('Quản lý chấm công', '5'),
      getItem('Quản lý - Quản lý chấm công', '6'),
      getItem('Kế toán - Quản lý chấm công', '7'),
    ]),
    getItem('Đánh giá kết quả công việc', 'sub2', <TeamOutlined />, [
      getItem('Đánh giá kết quả công việc', '8'),
      getItem('Quản lý tiêu chí đánh giá', '9'),
      getItem('Quản lý mẫu đánh giá hiệu quả làm việc', '10')]),
    getItem('Danh mục', '11', <FileOutlined />, [
      getItem('Phòng ban', '12'),
      getItem('Chức danh', '13'),
      getItem('Ngày nghỉ lễ', '14'),
      getItem('Loại ngày nghỉ', '15'),
      getItem('Dự án', '16'),
      getItem('Nhân viên - Dự án', '17'),
      getItem('Quản lý thiết bị', '18')]),
  ];

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }
  return  <Layout>
    <Header collapsed={collapsed} onCollapsed={handleCollapse}/>
    <AntLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.menuNav} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Quanlychamcong/>
      <Layout>
        <div className={styles.navbar}>
        </div>
        <div className={styles.content}>
        </div>
      </Layout>
    </AntLayout>
  </Layout>
}

export default Dashboard
