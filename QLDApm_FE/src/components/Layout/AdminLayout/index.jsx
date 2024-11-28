import './AdminLayout.scss'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Layout, theme } from 'antd'
import { AdminHeader, AdminSider } from 'components'
const { Content } = Layout

export default function AdminLayout() {
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const isSpecialPage = location.pathname === '/management/'
  useEffect(() => {
    const count = location.pathname.split('/').length
    switch (count) {
      case 2:
        setTitle('Dashboard')
        setDefaultSelectedKeys('')
        setLoading(false)
        break
      case 3:
        switch (location.pathname.split('/')[2]) {
          case 'account':
            setTitle('Quản lý tài khoản')
            setDefaultSelectedKeys('account')
            break
          case 'menu':
            setTitle('Quản lý thực đơn')
            setDefaultSelectedKeys('menu')
            break
          case 'order':
            setTitle('Đơn đặt hàng')
            setDefaultSelectedKeys('order')
            break
          case 'report':
            setTitle('Báo cáo doanh thu')
            setDefaultSelectedKeys('report')
            break
          case 'table':
            setTitle('Quản lý bàn ăn')
            setDefaultSelectedKeys('table')
            break
          default:
            break
        }
        setLoading(false)
        break
      case 4:
        switch (location.pathname.split('/')[3]) {
          case 'add':
            setTitle('Thêm món ăn')
            setDefaultSelectedKeys('menu')
            break
          default:
            break
        }
        setLoading(false)
        break
      case 5:
        switch (location.pathname.split('/')[3]) {
          case 'edit':
            setTitle('Chỉnh sửa món ăn')
            setDefaultSelectedKeys('menu')
            break
          default:
            break
        }
        setLoading(false)
        break
      default:
        break
    }
    return () => {}
  }, [location])

  return (
    !isLoading && (
      <Layout className="AdminLayout">
        <AdminSider collapsed={collapsed} defaultSelectedKeys={defaultSelectedKeys} />
        <Layout>
          <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} title={title} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: isSpecialPage ? 'none' : colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    )
  )
}
