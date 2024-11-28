import { Layout, Space } from 'antd'
import './HomeLayout.scss'
import { UserFooter } from 'components'
import { Outlet } from 'react-router-dom'
import { NavBar } from 'components'

const { Content } = Layout

const contentStyle = {
  minHeight: 120,
  backgroundColor: '#ffffff',
  lineHeight: '120px',
}

export default function HomeLayout() {
  return (
    <div className="HomeLayout container">
      <div className="container-wrapper">
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={[0, 48]}
        >
          <Layout style={{ backgroundColor: '#FFFFFF' }}>
            <div style={{ position: 'relative', height: '80px' }}>
              <NavBar page="Home" />
            </div>
            <Content style={contentStyle}>
              <Outlet />
            </Content>
            <UserFooter />
          </Layout>
        </Space>
      </div>
    </div>
  )
}
