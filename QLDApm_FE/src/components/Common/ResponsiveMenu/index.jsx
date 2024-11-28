import './ResponsiveMenu.scss'
import { Row, Col, Modal, InputNumber } from 'antd'
import { Dish } from 'components'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResponsiveMenu = ({ data }) => {
  const navigate = useNavigate()
  const [dishState, setDishState] = useState({
    dishName: '',
    classify: 'starter',
    rating: 4,
    price: 0,
    description: '',
  })
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(1)
  const [dataSource, setDataSource] = useState([])

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const handleAdd = (dish) => {
    const currRes = JSON.parse(localStorage.getItem('currReservation'))
    if (currRes && currRes.length !== 0) {
      if (currRes.dishes.filter((item) => item.dishId === dish.dishId).length !== 0) {
        const updatedDishes = currRes.dishes.map((item) =>
          item.dishId === dish.dishId ? { ...item, quantity: amount } : item
        )
        const updatedReservation = {
          ...currRes,
          dishes: updatedDishes,
        }
        setDataSource(updatedDishes)
        localStorage.setItem('currReservation', JSON.stringify(updatedReservation))
      } else {
        const updatedReservation = {
          ...currRes,
          dishes: [...currRes.dishes, { ...dish, quantity: amount }],
        }
        setDataSource([...currRes.dishes, { ...dish, quantity: amount }])
        localStorage.setItem('currReservation', JSON.stringify(updatedReservation))
      }

      setOpen(false)
    } else {
      navigate('/home/reservation')
    }
  }

  const onChange = (value) => {
    setAmount(value)
  }

  useEffect(() => {
    const currRes = JSON.parse(localStorage.getItem('currReservation'))
    if (currRes && currRes.length !== 0) {
      setDataSource(currRes.dishes)
    }
    return () => {}
  }, [])

  return (
    <div className="ResponsiveMenu">
      {data.length !== 0 ? (
        <Row>
          {data.map((item, index) => {
            return (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                xl={{ span: 6 }}
                className="product-wrapper"
                key={`dish-index-${index}`}
              >
                <Dish
                  dataDish={item}
                  cls={''}
                  showModal={showModal}
                  setDishState={(e) => {
                    setDishState(e)
                  }}
                />
              </Col>
            )
          })}
          <Modal
            title="Kiểm tra lại thông tin món ăn!"
            open={open}
            onOk={() => {
              handleAdd(dishState)
            }}
            onCancel={hideModal}
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{
              style: {
                height: '42px',
              },
            }}
            cancelButtonProps={{
              style: {
                height: '42px',
              },
            }}
            className="modal-check"
          >
            <p style={{ paddingTop: 20, paddingBottom: 5 }}>
              Tên món ăn: <b>{dishState.dishName}</b>
            </p>
            <p style={{ paddingBottom: 5 }}>
              Phân loại:{' '}
              <b>
                {dishState.classify === 'starter'
                  ? 'Món khai vị'
                  : dishState.classify === 'main'
                    ? 'Món chính'
                    : dishState.classify === 'drinks'
                      ? 'Thức uống'
                      : 'Món tráng miệng'}
              </b>
            </p>
            <p style={{ paddingBottom: 5 }}>
              Giá tiền: <b>{formatCurrency(dishState.price)}</b>
            </p>
            <p style={{ paddingBottom: 5 }}>
              Đánh giá: <b>{dishState.rating}</b> sao
            </p>
            <p id="check-d">Mô tả: {dishState.description}</p>
            <div id="quantity">
              <p>Số lượng:</p>
              <InputNumber size="large" min={1} max={100000} defaultValue={1} onChange={onChange} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p>Danh sách món ăn:</p>
              <ul style={{ fontStyle: 'italic', marginLeft: 50 }}>
                {dataSource.length === 0
                  ? 'Không có món ăn được chọn'
                  : dataSource.map((subitem, index) => {
                      return (
                        <li key={`d-list-item-${index}`} style={{ marginTop: 5 }}>
                          {subitem.dishName} x{subitem.quantity}
                        </li>
                      )
                    })}
              </ul>
            </div>
          </Modal>
        </Row>
      ) : (
        <div className="notification-content">
          <img src={require('assets/images/notiMenu.png')} alt="" />
          <p>Không có món ăn liên quan!</p>
        </div>
      )}
    </div>
  )
}

export default ResponsiveMenu
