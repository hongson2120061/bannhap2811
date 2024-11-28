import './AdminHeader.scss'
import { Icon } from '@iconify/react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Badge, Avatar, Dropdown, Space, theme } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const { Header } = Layout

function AdminHeader({ collapsed, setCollapsed, title }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/logout`, {
        accessToken: localStorage.getItem('accessToken'),
      })
      console.log(response)
      localStorage.removeItem('accessToken')
      navigate('/')
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/management/profile">
          Thông tin cá nhân
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/management/profile">
          Đổi mật khẩu
        </a>
      ),
    },
    {
      key: '3',
      danger: true,
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ]

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
      className="AdminHeader"
    >
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <p>{title}</p>
      </div>
      <div>
        <Icon icon="mi:email" width={26} height={26} className="btn-mail" />
        <Badge count={1}>
          <Avatar
            shape="circle"
            icon={<Icon icon="lucide:bell" width={26} height={26} />}
            style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
            className="btn-noti"
          />
        </Badge>
        <Dropdown
          menu={{
            items,
          }}
        >
          <Space>
            <Avatar
              src="https://cdn.tuoitre.vn/zoom/700_525/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
              style={{ width: 48, height: 48 }}
            />
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default AdminHeader
