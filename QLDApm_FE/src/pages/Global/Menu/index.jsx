import './Menu.scss'
import { Col, Row, Skeleton } from 'antd'
import { useEffect } from 'react'
import { MenuWrapper } from 'components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './rdMenu'

function Menu(props) {
  const { GetDishes, dishState } = props

  useEffect(() => {
    if (!dishState.status) {
      GetDishes()
    }
  }, [GetDishes, dishState.status])

  return (
    <>
      {dishState.loading ? (
        <Skeleton
          active
          style={{
            marginTop: '40px',
            marginBottom: '40px',
          }}
          paragraph={{ rows: 10 }}
        />
      ) : (
        <div className="Menu">
          <MenuWrapper
            title={'Thực đơn khai vị'}
            data={dishState.lsDishes.filter((item) => item.classify === 'starter')}
            type={'right'}
          />
          <MenuWrapper
            title={'Món chính'}
            data={dishState.lsDishes.filter((item) => item.classify === 'main')}
            type={'left'}
          />
          <div className="menu-background">
            <div>
              <img src={require('assets/images/menu-background.png')} alt="" />
              <div className="overlay"></div>
            </div>
            <div className="m-b-content">
              <Row className="r-wrapper">
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  xl={{ span: 6 }}
                  className="c-wrapper"
                >
                  <img src={require('assets/images/chef-icon.png')} alt="" />
                  <p>16</p>
                  <p>Đầu bếp</p>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  xl={{ span: 6 }}
                  className="c-wrapper"
                >
                  <img src={require('assets/images/food-icon.png')} alt="" />
                  <p>320</p>
                  <p>Món ăn</p>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  xl={{ span: 6 }}
                  className="c-wrapper"
                >
                  <img src={require('assets/images/experience-icon.png')} alt="" />
                  <p>30+</p>
                  <p>Năm kinh nghiệm</p>
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  xl={{ span: 6 }}
                  className="c-wrapper"
                >
                  <img src={require('assets/images/customer-icon.png')} alt="" />
                  <p>220+</p>
                  <p>Khách hàng</p>
                </Col>
              </Row>
            </div>
          </div>
          <MenuWrapper
            title={'Món tráng miệng'}
            data={dishState.lsDishes.filter((item) => item.classify === 'dessert')}
            type={'right'}
          />
          <MenuWrapper
            title={'Thức uống'}
            data={dishState.lsDishes.filter((item) => item.classify === 'drinks')}
            type={'left'}
          />
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
