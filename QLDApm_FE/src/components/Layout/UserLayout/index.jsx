import { Layout, Space } from 'antd'
import './UserLayout.scss'
import { UserHeader, UserFooter } from 'components'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const contentStyle = {
  minHeight: 120,
  backgroundColor: '#ffffff',
  lineHeight: '120px',
}

export default function UserLayout() {
  return (
    <div className="UserLayout container">
      <div className="container-wrapper">
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
          size={[0, 48]}
        >
          <Layout style={{ backgroundColor: '#FFFFFF' }}>
            <UserHeader />
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
