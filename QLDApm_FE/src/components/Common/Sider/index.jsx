import './AdminSider.scss'
import { Icon } from '@iconify/react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Sider } = Layout

const AdminSider = ({ collapsed, defaultSelectedKeys }) => {
  const navigate = useNavigate()

  const handleMenuClick = (e) => {
    if (e !== '') {
      navigate(`/management/${e}`)
    } else {
      navigate(`/management`)
    }
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="AdminSider">
      <div className="logo-vertical">
        <img src={require('assets/images/logo.jpg')} alt="" />
        <div>
          <p>Sublime Flavor</p>
          <p>Vietnamese Restaurant</p>
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[defaultSelectedKeys]}
        onClick={({ key }) => handleMenuClick(key)}
        items={[
          {
            key: '',
            icon: <Icon icon="fluent:home-20-filled" width={24} height={24} color="#a9a9a9" />,
            label: 'Dashboard',
          },
          {
            key: 'account',
            icon: <Icon icon="fa-solid:user-alt" width={22} height={22} color="#a9a9a9" />,
            label: 'Quản lý tài khoản',
          },
          {
            key: 'menu',
            icon: <Icon icon="mdi:food" width={24} height={24} color="#a9a9a9" />,
            label: 'Thực đơn',
          },
          {
            key: 'table',
            icon: <Icon icon="ic:round-table-bar" width={24} height={24} color="#a9a9a9" />,
            label: 'Bàn ăn',
          },
          {
            key: 'order',
            icon: <Icon icon="lsicon:order-filled" width={24} height={24} color="#a9a9a9" />,
            label: 'Đơn đặt hàng',
          },
          // {
          //   key: 'invoice',
          //   icon: <Icon icon="lsicon:order-filled" width={24} height={24} color="#a9a9a9" />,
          //   label: 'Hoá đơn',
          // },
          {
            key: 'report',
            icon: <Icon icon="mdi:report-multiline" width={24} height={24} color="#a9a9a9" />,
            label: 'Báo cáo',
          },
        ]}
      />
    </Sider>
  )
}

export default AdminSider
