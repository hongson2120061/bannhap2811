import { useEffect } from 'react'
import './SignUp.scss'
import { connect } from 'react-redux'
import { Button, Col, DatePicker, Form, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { mapDispatchToProps, mapStateToProps } from './rdSignup'

const SignUp = ({ Signup, userState }) => {
  // useNavigate
  const navigate = useNavigate()

  // Function
  const logIn = () => {
    navigate('/auth/login')
  }

  const onFinish = (values) => {
    const { confirm: confirmation, ...data } = values
    Signup(data)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (userState.data.status) {
      navigate('/auth/login')
    }
    return () => {}
  }, [userState, navigate])

  return (
    <div className="Signup">
      <div className="signup-wrapper">
        <div className="select">
          <Row>
            <Col span={12} className="select-log-in" onClick={logIn}>
              <p>ĐĂNG NHẬP</p>
            </Col>
            <Col span={12} className="select-sign-up selected">
              <p>ĐĂNG KÝ</p>
            </Col>
          </Row>
        </div>
        <div className="signup-data">
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
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống họ!',
                },
              ]}
              className="default-input"
            >
              <Input placeholder="Họ" />
            </Form.Item>

            <Form.Item
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống tên!',
                },
              ]}
              className="default-input"
            >
              <Input placeholder="Tên" />
            </Form.Item>

            <Form.Item name="dateOfBirth" className="default-input">
              <DatePicker
                style={{ width: '100%', height: '40px' }}
                format={'DD/MM/YYYY'}
                placeholder="Ngày sinh (DD/MM/YYYY)"
              />
            </Form.Item>

            <Form.Item name="address" className="default-input">
              <Input placeholder="Địa chỉ chi tiết" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Email không chính xác!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập email!',
                },
              ]}
              className="default-input"
            >
              <Input placeholder="Email (*)" />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ]}
              className="default-input"
            >
              <Input placeholder="Tên đăng nhập (*)" />
            </Form.Item>

            <Form.Item
              name="passwords"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
                {
                  min: 9,
                  message: 'Mật khẩu phải có ít nhất 9 ký tự!',
                },
                {
                  max: 32,
                  message: 'Mật khẩu không được quá 32 ký tự!',
                },
                {
                  pattern: /[A-Z]/,
                  message: 'Mật khẩu phải chứa ít nhất một ký tự viết hoa!',
                },
              ]}
              className="password"
            >
              <Input.Password placeholder="Mật khẩu (*)" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['passwords']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passwords') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Mật khẩu không khớp!'))
                  },
                }),
                {
                  min: 8,
                  message: 'Mật khẩu phải có ít nhất 8 ký tự!',
                },
                {
                  max: 32,
                  message: 'Mật khẩu không được quá 32 ký tự!',
                },
                {
                  pattern: /[A-Z]/,
                  message: 'Mật khẩu phải chứa ít nhất một ký tự viết hoa!',
                },
              ]}
              className="password"
            >
              <Input.Password placeholder={'Xác nhận mật khẩu (*)'} />
            </Form.Item>

            <Form.Item>
              <div className="btn">
                <Button className="btn-sign-up" size="large" htmlType="submit">
                  ĐĂNG KÝ
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
