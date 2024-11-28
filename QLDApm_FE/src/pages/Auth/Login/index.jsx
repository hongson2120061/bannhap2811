import './Login.scss'
import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { mapDispatchToProps, mapStateToProps } from './rdLogin'
import { Button, Col, Divider, Form, Input, Row } from 'antd'
import axios from 'axios'

const Login = ({ Login, GetUser, userState }) => {
  // useNavigate
  const navigate = useNavigate()

  // Function
  const signUp = () => {
    navigate('/auth/signup')
  }

  const onFinish = (values) => {
    Login({
      username: values.username,
      password: values.password,
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userState.data.status) {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/user/info`, {
            headers: {
              Authorization: `Bearer ${userState.data.data.accessToken}`,
            },
          })
          if (response.data.data.nameRole === 'CUSTOMER') {
            userState.status = false
            navigate('/')
          } else if (
            response.data.data.nameRole === 'ADMIN' ||
            response.data.data.nameRole === 'STAFF'
          ) {
            userState.status = false
            navigate('/management')
          }
        } catch (error) {
          console.error('Error fetching user info:', error.response?.data || error.message)
        }
      }
    }

    fetchData()
    return () => {}
  }, [userState, navigate])

  return (
    <div className="Login">
      <div className="login-wrapper">
        <div className="select">
          <Row>
            <Col span={12} className="select-log-in selected">
              <p>ĐĂNG NHẬP</p>
            </Col>
            <Col span={12} className="select-sign-up" onClick={signUp}>
              <p>ĐĂNG KÝ</p>
            </Col>
          </Row>
        </div>
        <div className="login-data">
          <Form
            name="basic"
            style={{
              width: '100%',
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ]}
              className="username"
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
              className="password"
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <div className="btn">
                <Button className="btn-log-in" size="large" htmlType="submit">
                  ĐĂNG NHẬP
                </Button>
                <Button type="link" className="btn-forget-password">
                  Quên mật khẩu?
                </Button>
                <Divider
                  orientation="center"
                  style={{
                    width: '80%',
                    fontSize: '1.1rem',
                    marginTop: '40px',
                    marginBottom: '30px',
                  }}
                >
                  Hoặc
                </Divider>
                <Button className="btn-facebook" size="large">
                  <Icon icon="logos:facebook" style={{ marginRight: '5px' }} />
                  Đăng nhập với Facebook
                </Button>
                <Button className="btn-google" size="large">
                  <Icon icon="devicon:google" style={{ marginRight: '5px' }} />
                  Đăng nhập với Google
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
