import './NavBar.scss'
import axios from 'axios'
import { Icon } from '@iconify/react'
import { Row, Col, Dropdown, Space } from 'antd'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './rdUser'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NavBar = ({ page, GetUser, userState }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [userName, setUserName] = useState()

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
        <span
          rel="noopener noreferrer"
          onClick={() => {
            navigate('/user/profile')
          }}
        >
          Thông tin cá nhân
        </span>
      ),
    },
    {
      key: '3',
      danger: true,
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ]

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setUserName(userState.data.data.username)
    }
    return () => {}
  }, [GetUser, userState])

  return (
    // !isLoading &&
    <Row className={`NavBar ${page === 'Home' ? 'h' : ''}`}>
      <Col xs={{ span: 20 }} sm={{ span: 8 }} md={{ span: 6 }} xl={{ span: 5 }}>
        <span
          className="brand"
          onClick={() => {
            navigate('/')
          }}
        >
          SFlavors
        </span>
      </Col>
      <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 0 }} xl={{ span: 11 }} className="nav-d">
        <p
          className={`${location.pathname === '/' ? 'selected' : ''}`}
          onClick={() => {
            return navigate('/')
          }}
        >
          Trang chủ
        </p>
        <p
          onClick={() => {
            return navigate('/home/menu')
          }}
          className={`${location.pathname.split('/')[2] === 'menu' ? 'selected' : ''} `}
        >
          Thực đơn
        </p>
        <p
          onClick={() => {
            return navigate('/home/reservation')
          }}
          className={`${location.pathname.split('/')[2] === 'reservation' ? 'selected' : ''} `}
        >
          Đặt chỗ
        </p>
        <p
          onClick={() => {
            return navigate('/home/about-us')
          }}
          className={`${location.pathname === '/home/chefs' ? 'selected' : ''} `}
        >
          Về chúng tôi
        </p>
      </Col>
      <Col xs={{ span: 4 }} sm={{ span: 16 }} md={{ span: 18 }} xl={{ span: 8 }} className="user-f">
        {!localStorage.getItem('accessToken') ? (
          <Icon
            icon="uil:user"
            width={26}
            height={26}
            className="user-f-action"
            onClick={() => {
              return navigate('/auth/login')
            }}
            color="#FFFFFF"
          />
        ) : (
          <Dropdown
            menu={{
              items,
            }}
          >
            <Space>
              <p className="user-name">{userName}</p>
            </Space>
          </Dropdown>
        )}
        <Icon
          icon="solar:cart-4-outline"
          width={26}
          height={26}
          className="user-f-action"
          onClick={() => {
            return navigate('/home/reservation/order')
          }}
          color="#FFFFFF"
        />
        <Icon icon="ooui:menu" width={26} height={26} className="menu" />
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
