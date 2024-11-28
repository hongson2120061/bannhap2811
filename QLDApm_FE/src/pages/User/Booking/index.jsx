import './Booking.scss'
import dayjs from 'dayjs'
import { Icon } from '@iconify/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReservationCard } from 'components'
import {
  Card,
  Col,
  Row,
  Checkbox,
  Tag,
  Popconfirm,
  Button,
  Table,
  TimePicker,
  Input,
  Modal,
  Skeleton,
} from 'antd'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { StarRating } from 'components'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from './rdBooking'

const Booking = ({ GetReservations, orderState }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const headerStickyRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const [capacity, setCapacity] = useState(null)
  const [morningData, setMorningData] = useState(0)
  const [afternoonData, setAfternoonData] = useState(0)
  const [eveningData, setEveningData] = useState(0)
  const [reservation, setReservation] = useState({})
  const [checkedValue, setCheckedValue] = useState('morning')
  const [open, setOpen] = useState(false)
  const [showDiv, setShowDiv] = useState(false)

  const [dataSource, setDataSource] = useState([])
  const [time, setTime] = useState()

  const columns = [
    {
      title: 'Món ăn',
      dataIndex: 'dishName',
      key: 'dishNameBT',
      width: '35%',
      render: (_, record) => (
        <div className="d-wrapper">
          <img src={record.image} alt="dish" />
          <div>
            <p
              style={{ fontWeight: 'bold' }}
              onClick={() => {
                navigate(`/home/menu/dish/${record.id}`)
              }}
            >
              {record.dishName}
            </p>
            <StarRating rating={record.rating} />
          </div>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'priceBT',
      width: '20%',
      render: (e) => formatCurrency(e),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantityBT',
      width: '15%',
    },
    {
      title: 'Tổng',
      dataIndex: 'summaryPrice',
      key: 'summaryPriceBT',
      width: '20%',
      render: (_, record) => formatCurrency(record.price * record.quantity),
    },
    {
      title: 'Xóa',
      key: 'deleteBT',
      width: '10%',
      render: (_, record) => (
        <div className="btn-wrapper">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <Button>
              <Icon icon="material-symbols:delete" width={28} height={28} />
            </Button>
          </Popconfirm>
        </div>
      ),
      isSearched: false,
    },
  ]

  const updateReservation = (columns, value) => {
    let updatedReservation = JSON.parse(localStorage.getItem('prevReservation')).map((obj) =>
      obj.id === reservation.id
        ? {
            ...reservation,
            [columns]: value,
          }
        : obj
    )

    localStorage.setItem('prevReservation', JSON.stringify(updatedReservation))

    setReservation((prevData) => ({
      ...prevData,
      [columns]: value,
    }))
  }

  const hours = useMemo(() => {
    if (!(Object.keys(params).length === 0 && params.constructor === Object)) {
      let time = `01`
      const hoursArray = []
      if (checkedValue === 'morning') {
        for (let i = 0; i < 24; i++) {
          if (i < 8 || i > 11) {
            hoursArray.push(i)
          }
        }
        time = `01`
      } else if (checkedValue === 'afternoon') {
        for (let i = 0; i < 24; i++) {
          if (i < 12 || i > 16) {
            hoursArray.push(i)
          }
        }
        time = `05`
      } else if (checkedValue === 'evening') {
        for (let i = 0; i < 24; i++) {
          if (i < 17 || i > 19) {
            hoursArray.push(i)
          }
        }
        time = `10`
      }

      const newTime = dayjs(
        new Date(`${params.year}-${params.month}-${params.day}T${time}:00:00.000Z`)
      )

      setTime(newTime)
      updateReservation('time', newTime)
      return hoursArray
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedValue, params])

  const disabledTime = () => {
    return {
      disabledHours: () => hours,
    }
  }

  const onChangeTime = (time) => {
    setTime(time)
    updateReservation('time', time)
  }

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const handleDelete = (e) => {
    const updatedData = dataSource.filter((item) => item.dishId !== e.dishId)
    setDataSource(updatedData)
    updateReservation('dishes', updatedData)
  }

  const handleCheckboxChange = (e) => {
    const { name } = e.target
    setCheckedValue(name)
    updateReservation('checkedValue', name)
  }

  const handleTable = (e) => {
    const selectedTags = document.querySelectorAll('.pt.selected')
    selectedTags.forEach((tag) => tag.classList.remove('selected'))
    e.target.classList.add('selected')
    const text = e.target.textContent
    const firstPart = parseInt(text.split(' ')[0])
    setCapacity(firstPart)
    updateReservation('tableType', firstPart)
  }

  const handleArea = (e, tableId) => {
    const selectedTags = document.querySelectorAll('.ar.selected')
    selectedTags.forEach((tag) => tag.classList.remove('selected'))
    e.target.classList.add('selected')
    updateReservation('tableId', tableId)
  }

  const handleAdd = () => {
    localStorage.setItem('currReservation', JSON.stringify(reservation))
    navigate('/home/menu/detail')
  }

  useEffect(() => {
    if (capacity) {
      setShowDiv(true)
    }
  }, [capacity])

  useEffect(() => {
    const handleScroll = () => {
      if (headerStickyRef.current) {
        const offsetTop = headerStickyRef.current.getBoundingClientRect().top
        setIsSticky(offsetTop <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const paramsArray = location.search.split('?').slice(1)

    const newParams = {}

    paramsArray.forEach((param) => {
      const [key, value] = param.split('=')
      newParams[key] = value
    })
    setParams(newParams)

    if (!orderState.r_status) {
      GetReservations(
        `${newParams.year}-${newParams.month}-${newParams.day} 00:00:00`,
        `${newParams.year}-${newParams.month}-${newParams.day} 24:00:00`
      )
    } else {
      let result = orderState.table.filter(
        (item1) =>
          !orderState.reservation.some((item2) => {
            const isSameTable = item2.tableId === item1.tableId
            const [hours, minutes] = item2.reservationTime.split(' ')[1].split(':').map(Number)
            const timeInMinutes = hours * 60 + minutes

            const startTime = 8 * 60
            const endTime = 11 * 60 + 59

            return isSameTable && timeInMinutes >= startTime && timeInMinutes <= endTime
          })
      )
      setMorningData(result.length)

      result = orderState.table.filter(
        (item1) =>
          !orderState.reservation.some((item2) => {
            const isSameTable = item2.tableId === item1.tableId
            const [hours, minutes] = item2.reservationTime.split(' ')[1].split(':').map(Number)
            const timeInMinutes = hours * 60 + minutes

            const startTime = 12 * 60
            const endTime = 16 * 60 + 59

            return isSameTable && timeInMinutes >= startTime && timeInMinutes <= endTime
          })
      )
      setAfternoonData(result.length)

      result = orderState.table.filter(
        (item1) =>
          !orderState.reservation.some((item2) => {
            const isSameTable = item2.tableId === item1.tableId
            const [hours, minutes] = item2.reservationTime.split(' ')[1].split(':').map(Number)
            const timeInMinutes = hours * 60 + minutes

            const startTime = 17 * 60
            const endTime = 20 * 60 + 0

            return isSameTable && timeInMinutes >= startTime && timeInMinutes <= endTime
          })
      )
      setEveningData(result.length)
    }

    const data = JSON.parse(localStorage.getItem('prevReservation')).filter(
      (item) =>
        item.date.day === newParams.day &&
        item.date.month === newParams.month &&
        item.date.year === newParams.year &&
        item.id === newParams.id
    )

    if (data && data.length !== 0) {
      setReservation(data[0])

      setCheckedValue(data[0].checkedValue)

      if (data[0].tableType) {
        setCapacity(data[0].tableType)
        let selectedTags = document.querySelectorAll('.pt.selected')
        selectedTags.forEach((tag) => tag.classList.remove('selected'))
        const spans = document.querySelectorAll('.pt')
        const spanWithValue = Array.from(spans).filter(
          (span) => span.textContent.trim() === `${data[0].tableType} người`
        )
        spanWithValue.forEach((span) => span.classList.add('selected'))

        selectedTags = document.querySelectorAll('.ar.selected')
        selectedTags.forEach((tag) => tag.classList.remove('selected'))
        const targetElement = document.getElementById(data[0].tableId)
        if (targetElement) {
          targetElement.classList.add('selected')
        }
      }

      const currData = JSON.parse(localStorage.getItem('currReservation'))
      if (currData && currData.length !== 0 && currData.id === data[0].id) {
        updateReservation('dishes', currData.dishes)
        setDataSource(currData.dishes)
      } else {
        if (data[0].dishes) {
          setDataSource(data[0].dishes)
        }
      }
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GetReservations, location.search, orderState.loading])

  return orderState.loading ? (
    <Skeleton
      active
      style={{
        marginTop: '40px',
        marginBottom: '40px',
      }}
      paragraph={{ rows: 10 }}
    />
  ) : (
    <div className="Booking">
      <ReservationCard />
      <Row>
        <Col sm={{ span: 0 }} md={{ span: 10 }} style={{ paddingRight: 60 }}>
          <Card className={`header-sticky ${isSticky ? 'sticky' : ''}`} ref={headerStickyRef}>
            <p>Bộ lọc tìm kiếm</p>
            <div style={{ marginBottom: 20 }}>
              <p>Khung giờ</p>
              <div>
                <Checkbox
                  name="morning"
                  checked={checkedValue === 'morning'}
                  onChange={handleCheckboxChange}
                  disabled={morningData === 0}
                >
                  Buổi sáng 08:00 - 12:00 ({morningData})
                </Checkbox>
                <Checkbox
                  name="afternoon"
                  checked={checkedValue === 'afternoon'}
                  onChange={handleCheckboxChange}
                  disabled={afternoonData === 0}
                >
                  Buổi chiều 12:00 - 17:00 ({afternoonData})
                </Checkbox>
                <Checkbox
                  name="evening"
                  checked={checkedValue === 'evening'}
                  onChange={handleCheckboxChange}
                  disabled={eveningData === 0}
                >
                  Buổi tối 17:00 - 20:00 ({eveningData})
                </Checkbox>
              </div>
            </div>
            <div className="t-b-type">
              <p>Loại bàn</p>
              <div>
                {[...new Map(orderState.table.map((item) => [item.capacity, item])).values()]
                  .sort((a, b) => a.capacity - b.capacity)
                  .map((item, index) => {
                    return (
                      <Tag className="pt" key={`type-table-${index}`} onClick={handleTable}>
                        {item.capacity} người
                      </Tag>
                    )
                  })}
              </div>
            </div>
            <div className={`t-b-type area ${showDiv ? 'show' : ''} `}>
              <p>Khu vực</p>
              <div>
                {[
                  ...new Map(
                    orderState.table
                      .filter((item) => item.capacity === capacity)
                      .map((item) => [item.area, item])
                  ).values(),
                ]
                  .sort((a, b) => a.area - b.area)
                  .map((item, index) => {
                    return (
                      <Tag
                        className="ar"
                        id={item.tableId}
                        key={`area-table-${index}`}
                        onClick={(e) => {
                          handleArea(e, item.tableId)
                        }}
                      >
                        {item.area}
                      </Tag>
                    )
                  })}
              </div>
            </div>
            <div className="payment">
              <p style={{ marginBottom: 25 }}>Coupon</p>
              <Input
                size="large"
                placeholder="large size"
                prefix={
                  <Icon icon="mingcute:coupon-line" width={28} height={28} style={{ height: 32 }} />
                }
              />
            </div>
          </Card>
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 14 }} className="m-content">
          <div className="t-wrapper">
            <div>
              <p>Giờ nhận bàn:</p>
              <TimePicker
                value={time}
                onChange={onChangeTime}
                size="large"
                format={'HH:mm'}
                allowClear={false}
                disabledTime={disabledTime}
              />
            </div>
            <div className="btn-order" onClick={showModal}>
              Đặt bàn
            </div>
            <Modal
              title="Kiểm tra lại thông tin đặt bàn!"
              open={open}
              onOk={hideModal}
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
            >
              <p style={{ paddingTop: 20, paddingBottom: 5 }}>
                Ngày đặt bàn: <b>{`${params.day}/${params.month}/${params.year}`}</b>
              </p>
              <p style={{ paddingBottom: 5 }}>
                Giờ đặt bàn:{' '}
                <b>
                  {new Date(reservation.time).getHours()}:
                  {String(new Date(reservation.time).getMinutes()).padStart(2, '0')}
                </b>
              </p>
              <p style={{ paddingBottom: 5 }}>
                Loại bàn: <b>{reservation.tableType}</b> người
              </p>
              <p style={{ paddingBottom: 5 }}>
                Tổng số bàn: <b>{reservation.tableCount}</b> bàn
              </p>
              <div>
                <p>Món ăn:</p>
                <ul style={{ marginLeft: 50 }}>
                  {dataSource.map((item, index) => {
                    return (
                      <li key={`list-item-${index}`}>
                        {item.dishName} x{item.quantity}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Modal>
          </div>
          {reservation.tableId ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              className="d-table"
              pagination={false}
              footer={() => (
                <div className="d-t-footer" onClick={handleAdd}>
                  Thêm món
                </div>
              )}
            />
          ) : (
            <div className="notification-content" style={{ maxHeight: 500 }}>
              <img src={require('assets/images/notiMenu.png')} alt="" />
              <p>Vui lòng chọn bàn!</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
