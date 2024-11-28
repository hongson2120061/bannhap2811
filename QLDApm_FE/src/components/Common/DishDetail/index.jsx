import './DishDetail.scss'
import { Col, Row, Image, InputNumber, Button, Modal } from 'antd'
import { Icon } from '@iconify/react'
import { StarRating, DishCarousel } from 'components'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { useNavigate } from 'react-router-dom'
import { Stamp } from 'components'
import { useEffect, useState } from 'react'

const DishDetail = ({ data, dishState, type }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(1)
  const [dataSource, setDataSource] = useState([])

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const handleAdd = () => {
    const currRes = JSON.parse(localStorage.getItem('currReservation'))
    if (currRes && currRes.length !== 0) {
      if (currRes.dishes.filter((item) => item.dishId === data.dishId).length !== 0) {
        const updatedDishes = currRes.dishes.map((item) =>
          item.dishId === data.dishId ? { ...item, quantity: amount } : item
        )
        const updatedReservation = {
          ...currRes,
          dishes: updatedDishes,
        }
        setDataSource(updatedDishes)
        localStorage.setItem('currReservation', JSON.stringify(updatedReservation))
      } else {
        currRes.dishes.filter((item) => item.dishId === data.dishId)
        const updatedReservation = {
          ...currRes,
          dishes: [...currRes.dishes, { ...data, quantity: amount }],
        }
        setDataSource([...currRes.dishes, { ...data, quantity: amount }])
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
    <div className="DishDetail">
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          xl={{ span: 12 }}
          className="image-wrapper"
        >
          <Image
            src={data.image}
            width={'100%'}
            height={'100%'}
            fallback={require('assets/images/image-not-found.png')}
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          xl={{ span: 12 }}
          className="dish-content"
        >
          <div>
            {data.available ? (
              <div className="status available-true">Có phục vụ</div>
            ) : (
              <div className="status available-false">Ngưng phục vụ</div>
            )}
            <Icon
              icon="grommet-icons:link-previous"
              width={32}
              height={32}
              className="prev-button"
              onClick={() => {
                if (type !== 'management') return navigate(-1)
              }}
            />
          </div>
          <p className="title">{data.dishName}</p>
          <p className="description">{data.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="price">{formatCurrency(data.price)}</p>

              <div className="rating">
                <StarRating rating={data.rating} />
                <p>{data.rating} ratings</p>
              </div>
            </div>
            <div>
              {data.classify === 'starter' && (
                <Stamp fontSize={'1.5rem'} type={'is-starter'} content={'Món khai vị'} />
              )}
              {data.classify === 'main' && (
                <Stamp fontSize={'1.5rem'} type={'is-main'} content={'Món chính'} />
              )}
              {data.classify === 'dessert' && (
                <Stamp fontSize={'1.5rem'} type={'is-dessert'} content={'Món tráng miệng'} />
              )}
              {data.classify === 'drinks' && (
                <Stamp fontSize={'1.5rem'} type={'is-drinks'} content={'Thức uống'} />
              )}
            </div>
          </div>
          <div className="quantity">
            <p>Số lượng:</p>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              style={{
                width: '200px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
              }}
            />
            <div className="btn-wrapper">
              <Button size={'large'} className="btn-cart" disabled={type === 'management'}>
                Thêm vào yêu thích
              </Button>
              <Button
                size={'large'}
                className="btn-buy"
                disabled={type === 'management'}
                onClick={showModal}
              >
                Đặt món
              </Button>
              <Modal
                title="Kiểm tra lại thông tin món ăn!"
                open={open}
                onOk={handleAdd}
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
                  Tên món ăn: <b>{data.dishName}</b>
                </p>
                <p style={{ paddingBottom: 5 }}>
                  Phân loại:{' '}
                  <b>
                    {data.classify === 'starter'
                      ? 'Món khai vị'
                      : data.classify === 'main'
                        ? 'Món chính'
                        : data.classify === 'drinks'
                          ? 'Thức uống'
                          : 'Món tráng miệng'}
                  </b>
                </p>
                <p style={{ paddingBottom: 5 }}>
                  Giá tiền: <b>{formatCurrency(data.price)}</b>
                </p>
                <p style={{ paddingBottom: 5 }}>
                  Đánh giá: <b>{data.rating}</b> sao
                </p>
                <p id="check-d">Mô tả: {data.description}</p>
                <div id="quantity">
                  <p>Số lượng:</p>
                  <InputNumber
                    size="large"
                    min={1}
                    max={100000}
                    defaultValue={1}
                    onChange={onChange}
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <p>Danh sách món ăn:</p>
                  <ul style={{ fontStyle: 'italic', marginLeft: 50 }}>
                    {dataSource.length === 0 ? (
                      <p style={{ marginTop: 10 }}>Không có món ăn được chọn</p>
                    ) : (
                      dataSource.map((item, index) => {
                        return (
                          <li key={`d-detail-list-item-${index}`} style={{ marginTop: 5 }}>
                            {item.dishName} x{item.quantity}
                          </li>
                        )
                      })
                    )}
                  </ul>
                </div>
              </Modal>
            </div>
          </div>
          <p className="category">Phân loại: {data.categoryName}</p>
          <div className="share">
            <p>Chia sẽ:</p>
            <Icon icon="ic:sharp-facebook" width={32} height={32} className="s-fb" />
            <Icon icon="ant-design:twitter-circle-filled" width={32} height={32} className="s-tw" />
            <Icon icon="mage:instagram-circle" width={32} height={32} className="s-is" />
          </div>
        </Col>
      </Row>
      <div className="description">
        <p className="tabs">Mô tả chi tiết</p>
        {data.description.split('\n').map((item, index) => {
          return <p key={`dish-index-${index}`}>{item}</p>
        })}
      </div>
      <div className="similar-dishes">
        <p>Món ăn tương tự</p>
        {type !== 'management' ? (
          <DishCarousel
            data={dishState.lsDishes.filter((item) => item.classify === data.classify)}
          />
        ) : (
          <DishCarousel data={[data, data, data, data, data]} type={type} />
        )}
      </div>
    </div>
  )
}

export default DishDetail
