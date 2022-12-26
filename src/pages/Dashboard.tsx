import { Layout as AntLayout} from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import styles from './Dashboard.module.scss'


const Dashboard = () => {

  const [collapsed,setCollapsed] = useState(false)


  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }   
  return  <Layout>
    <Header collapsed={collapsed} onCollapsed={handleCollapse}/>
  <AntLayout>
    <Sider  trigger={null} collapsible collapsed={collapsed}>
    </Sider>
    <Layout>
      <div className={styles.navbar}></div>
      <div className={styles.content}></div>
    </Layout>
  </AntLayout>
  </Layout>
}

export default Dashboard