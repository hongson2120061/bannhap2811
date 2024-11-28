import './UserHeader.scss'
import { NavBar } from 'components'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'

function UserHeader() {
  const [title, setTitle] = useState('404 Not Found')
  const [route, setRoute] = useState([])
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.split('/')[3] === 'dish') {
      setTitle('Chi tiết món ăn')
      setRoute([
        {
          title: 'Trang chủ',
          href: '/',
        },
        {
          title: 'Thực đơn',
          href: '/home/menu',
        },
        {
          title: 'Chi tiết món ăn',
        },
      ])
    } else if (location.pathname.split('/')[3] === 'booking') {
      setTitle('Chọn bàn')
      setRoute([
        {
          title: 'Trang chủ',
          href: '/',
        },
        {
          title: 'Đặt chỗ trước',
          href: '/home/reservation',
        },
        {
          title: 'Chọn bàn',
        },
      ])
    } else {
      switch (location.pathname) {
        case '/user/profile':
          setTitle('Hồ sơ cá nhân')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Hồ sơ cá nhân',
            },
          ])
          break
        case '/home/reservation':
          setTitle('Đặt chỗ trước')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Đặt chỗ trước',
            },
          ])
          break
        case '/auth/login':
          setTitle('Đăng nhập')
          setRoute([])
          break
        case '/auth/signup':
          setTitle('Đăng ký')
          setRoute([])
          break
        case '/home/reservation/order':
          setTitle('Chọn món ăn')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Đặt chỗ trước',
              href: '/home/reservation',
            },
            {
              title: 'Chọn món ăn',
            },
          ])
          break
        case '/home/reservation/payment':
          setTitle('Thanh toán')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },

            {
              title: 'Đặt chỗ trước',
              href: '/home/reservation',
            },
            {
              title: 'Thanh toán',
            },
          ])
          break
        case '/home/chefs':
          setTitle('Đầu bếp')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Đầu bếp',
            },
          ])
          break
        case '/home/menu':
          setTitle('Thực đơn')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Thực đơn',
            },
          ])
          break
        case '/home/menu/detail':
          setTitle('Thực đơn chi tiết')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Thực đơn',
              href: '/home/menu',
            },
            {
              title: 'Thực đơn chi tiết',
            },
          ])
          break
        case '/user/orders':
          setTitle('Lịch sử đặt chỗ')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Lịch sử đặt chỗ',
            },
          ])
          break
        case '/user/change-password':
          setTitle('Đổi mật khẩu')
          setRoute([
            {
              title: 'Trang chủ',
              href: '/',
            },
            {
              title: 'Đổi mật khẩu',
            },
          ])
          break
        default:
          break
      }
    }
    return () => {}
  }, [location])

  return (
    <div className="UserHeader">
      <NavBar />
      <div className="header-content">
        <img src={require('assets/images/header_background.png')} alt="" />
        <div>
          <p className="title f-t-sm">{title}</p>
          <Breadcrumb className="t-route" separator=">" items={route} />
        </div>
      </div>
    </div>
  )
}

export default UserHeader
