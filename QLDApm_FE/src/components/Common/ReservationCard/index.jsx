import './ReservationCard.scss'
import { Card, Select, DatePicker, Button, Space, Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const ReservationCard = () => {
  const navigate = useNavigate()
  const [tableType, setTableType] = useState(1)
  const [tableCount, setTableCount] = useState(1)
  const [prevReservation, setPrevReservation] = useState([])
  const [reservationDate, setReservationDate] = useState(new Date())
  const [isLoading, setLoading] = useState(true)

  function formatDate(date) {
    const validDate = dayjs.isDayjs(date) ? date.toDate() : date

    if (!(validDate instanceof Date)) {
      throw new Error('Invalid date provided. Please provide a valid Date object.')
    }

    const day = String(validDate.getDate()).padStart(2, '0')
    const month = String(validDate.getMonth() + 1).padStart(2, '0')
    const year = String(validDate.getFullYear())

    return {
      day: day,
      month: month,
      year: year,
    }
  }

  const handleTableTypeChange = (value) => {
    setTableType(value)
  }

  const handleTableCountChange = (value) => {
    setTableCount(value)
  }

  const handleDateChange = (date) => {
    setReservationDate(date)
  }

  const handleNavPrev = (e) => {
    navigate(
      `/home/reservation/booking?day=${e.date.day}?month=${e.date.month}?year=${e.date.year}?id=${e.id}`
    )
  }

  const handleBooking = () => {
    const date = formatDate(reservationDate)
    const id = uuidv4()

    const newData = {
      id: id,
      date: date,
      tableType: tableType,
      tableCount: tableCount,
      time: dayjs(new Date(`${date.year}-${date.month}-${date.day}T01:00:00.000Z`)),
      checkedValue: 'morning',
      tableId: null,
      dishes: [],
    }

    const updatedReservation = [...prevReservation]

    if (!updatedReservation.map((obj) => JSON.stringify(obj)).includes(JSON.stringify(newData))) {
      updatedReservation.unshift(newData)
      if (updatedReservation.length > 4) {
        updatedReservation.pop()
      }
    } else {
      const index = updatedReservation.findIndex(
        (obj) => JSON.stringify(obj) === JSON.stringify(newData)
      )
      const [foundObject] = updatedReservation.splice(index, 1)
      updatedReservation.unshift(foundObject)
    }

    setPrevReservation(updatedReservation)
    localStorage.setItem('prevReservation', JSON.stringify(updatedReservation))
    navigate(
      `/home/reservation/booking?day=${date.day}?month=${date.month}?year=${date.year}?id=${id}`
    )
  }

  useEffect(() => {
    if (localStorage.getItem('prevReservation')) {
      setPrevReservation(JSON.parse(localStorage.getItem('prevReservation')))
      setLoading(false)
    } else {
      setLoading(false)
    }
    return () => {}
  }, [])

  return (
    !isLoading && (
      <div className="ReservationCard">
        <Card className="table-booking-card">
          <a href="/" className="booking-guide">
            Hướng dẫn đặt bàn
          </a>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} className="date-wrapper">
                <p style={{ paddingLeft: '12px' }}>Chọn ngày</p>
                <DatePicker
                  value={reservationDate ? dayjs(reservationDate) : null}
                  onChange={handleDateChange}
                  style={{ marginTop: 16, width: '100%', height: 60 }}
                  placeholder="Chọn ngày đặt bàn"
                  placement={'bottomRight'}
                  format={'DD/MM/YYYY'}
                  allowClear={false}
                  disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} className="table-wrapper">
                <Row>
                  <Col span={12}>
                    <p style={{ paddingLeft: '12px' }}>Loại bàn</p>
                    <Select
                      defaultValue={tableType}
                      style={{ width: '100%', marginTop: 16, height: 60 }}
                      onChange={handleTableTypeChange}
                      options={[
                        {
                          value: 1,
                          label: 'Một người',
                        },
                        {
                          value: 2,
                          label: 'Hai người',
                        },
                        {
                          value: 4,
                          label: 'Bốn người',
                        },
                        {
                          value: 6,
                          label: 'Sáu người',
                        },

                        {
                          value: 8,
                          label: 'Tám người',
                        },

                        {
                          value: 10,
                          label: 'Mười người',
                        },
                      ]}
                    ></Select>
                  </Col>
                  <Col span={12}>
                    <p style={{ paddingLeft: '12px' }}>Số bàn</p>
                    <Select
                      defaultValue={tableCount}
                      style={{ width: '100%', marginTop: 16, height: 60 }}
                      onChange={handleTableCountChange}
                      options={Array.from({ length: 10 }, (_, i) => ({
                        value: i + 1,
                        label: `${i + 1} bàn`,
                      }))}
                    ></Select>
                  </Col>
                </Row>
              </Col>
            </Row>
            <p style={{ paddingLeft: 12 }}>Tìm kiếm gần đây</p>
            <Row style={{ marginBottom: 24 }}>
              {prevReservation.length !== 0 &&
                prevReservation.map((item, index) => {
                  return (
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 6 }}
                      className="booking-recently"
                      key={`prev-reservation-${index}`}
                      onClick={() => {
                        handleNavPrev(item)
                      }}
                    >
                      <div>
                        <p>Ngày đặt {`${item.date.day}/${item.date.month}/${item.date.year}`}</p>
                        <p>
                          Bàn {item.tableType} người - {item.tableCount} bàn
                        </p>
                      </div>
                    </Col>
                  )
                })}
            </Row>
          </Space>
        </Card>
        <Button type="primary" className="book-table-button" onClick={handleBooking}>
          Tìm bàn
        </Button>
      </div>
    )
  )
}

export default ReservationCard
