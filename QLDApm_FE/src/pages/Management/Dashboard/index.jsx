import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  InboxOutlined,
  PhoneFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { Divider, Select } from 'antd'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { OrderStatus } from 'constant/type'
import { formatTime } from 'lib/utils'
import { useState } from 'react'
import './Dashboard.scss'
import { MOCK_DATA, ORDER_LIST_MOCK_DATA } from './MOCK_DATA'
import OrderInfo from './OrderInfo'
import IconButton from 'components/Common/IconButton'

const CardItem = [
  {
    name: 'Total Orders',
    icon: <ShoppingCartOutlined style={{ color: '#28A1BB' }} />,
    key: 'total_orders',
  },
  {
    name: 'Total Delivered',
    icon: <InboxOutlined style={{ color: '#E4B83C' }} />,
    key: 'total_delivered',
  },
  {
    name: 'Total Revenue',
    icon: <DollarOutlined style={{ color: '#19ACA0' }} />,
    key: 'total_revenue',
  },
  {
    name: 'Total Cancelled',
    icon: <CloseCircleOutlined style={{ color: '#DE4444' }} />,
    key: 'total_cancelled',
  },
]

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(ORDER_LIST_MOCK_DATA[0])
  return (
    <div className="dashboard">
      <div className="top-card-container">
        {CardItem.map((item, index) => {
          const data = MOCK_DATA[item.key]
          const isPositiveTrend = data.trend >= 0
          const TrendIcon = isPositiveTrend ? ArrowUpOutlined : ArrowDownOutlined

          return (
            <div className="card" key={index}>
              <div className="trend">
                <TrendIcon className={`trend-icon ${isPositiveTrend ? 'positive' : 'negative'}`} />
                <span className={`Text ${isPositiveTrend ? 'positive' : 'negative'}`}>
                  {Math.abs(data.trend)}%
                </span>
              </div>
              <div className={`icon ${item.key}`}>{item.icon}</div>
              <div className="text-container">
                <p className="header">{item.name}</p>
                <p className="value">
                  {item.key === 'total_revenue' ? formatCurrency(data.value) : data.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="main-section">
        <div className="order-list-container">
          <p className="header">All Orders</p>
          <div className="order-list">
            {ORDER_LIST_MOCK_DATA.map((item, index) => {
              const { formattedTime, formattedDate } = formatTime(item.time)
              return (
                <div className="card" key={index} onClick={() => setSelectedOrder(item)}>
                  <div className="card-header">
                    <div className="order-id">
                      <p>Order ID #{item.id}</p>
                      <div className="copy-container">
                        <Icon
                          onClick={(event) => {
                            event.stopPropagation()
                            navigator.clipboard.writeText(item.id)
                          }}
                          icon="solar:copy-line-duotone"
                          className="copy-icon"
                        />
                        <span className="copy-feedback">Copied!</span>
                      </div>
                    </div>
                    <div className={`order_status ${item.status}`}>
                      {item.status === OrderStatus.Delayed
                        ? `Delay by ${Math.ceil(item.delayTime / (1000 * 60))} mins`
                        : `Order ${item.status}`}
                    </div>
                  </div>
                  <div className="card-title">
                    <h1>{item.customerName}</h1>
                    <span>
                      {formattedTime} | {formattedDate}
                    </span>
                  </div>
                  <Select
                    optionFilterProp="label"
                    size="large"
                    defaultValue={item.order[0].name}
                    options={item.order.map((order) => ({
                      label: `${order.quantity} x ${order.name}`,
                      value: order.name,
                    }))}
                    style={{
                      width: '100%',
                    }}
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                  />
                  <Divider style={{ marginBottom: '10px' }} />
                  <div className="card-footer">
                    <div className="address-container">
                      <Icon
                        icon="solar:map-point-bold"
                        color="#2D60FF"
                        style={{ fontSize: '25px' }}
                      />
                      <div className="address-content">
                        <h3>Address</h3>
                        <p>{item.address}</p>
                      </div>
                    </div>
                    <IconButton>
                      <PhoneFilled style={{ color: '#2D60FF' }} />
                    </IconButton>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <OrderInfo order={selectedOrder} />
      </div>
    </div>
  )
}
