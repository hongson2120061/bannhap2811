import { Divider } from 'antd'
import './OrderDetails.scss'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { OrderHistory } from 'constant/type'
import { formatTime } from 'lib/utils'
import { Icon } from '@iconify/react'
import { BillDetailsValue } from 'constant/type'
import IconButton from 'components/Common/IconButton'

const OrderHistoryTextIcon = {
  [OrderHistory.Accepted]: {
    text: 'Order Accepted',
    icon: <Icon icon="iconoir:cutlery" color="#2D60FF" style={{ fontSize: '20px' }} />,
  },
  [OrderHistory.Prepaired]: {
    text: 'Food preparing done',
    icon: <Icon icon="hugeicons:pot-02" color="#2D60FF" style={{ fontSize: '20px' }} />,
  },
  [OrderHistory.Delivered]: {
    text: 'Out for delivery',
    icon: <Icon icon="lucide:door-open" color="#2D60FF" style={{ fontSize: '20px' }} />,
  },
}

const OrderDetails = ({ order: { history, bill, order } }) => {
  return (
    <div className="order-info-children order-details">
      <h1>Order Details</h1>
      <div className="order-detail-container">
        <div className="card order-history">
          <div style={{ marginBottom: '20px' }}>
            {order.map((item, index) => (
              <h2 key={index}>
                {item.quantity} x {item.name}
              </h2>
            ))}
          </div>
          {Object.entries(history).map(([key, value], index) => {
            return (
              <div key={key}>
                <div className="order-history-item">
                  <IconButton>{OrderHistoryTextIcon[key].icon}</IconButton>
                  <div className="order-history-content">
                    <h3>{OrderHistoryTextIcon[key].text}</h3>
                    <p>By {formatTime(value).formattedTime}</p>
                  </div>
                </div>
                {index !== Object.keys(history).length - 1 && (
                  <Divider
                    type="vertical"
                    variant="dashed"
                    style={{ borderColor: '#EAEFFF', height: '40px', marginLeft: '15px' }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="card bill-details">
          <h2>Bill Details</h2>
          <div className="bill-details-container">
            {Object.entries(bill).map(([key, value]) => (
              <div className="bill-details-item" key={key}>
                <p className="name">{BillDetailsValue[key]}</p>
                <p className="value">{value}</p>
              </div>
            ))}
          </div>
          <Divider style={{ marginTop: '18px', marginBottom: '10px' }} />
          <div className="total-bill">
            <div className="name">
              <p className="text">Total Bill</p>
              <p className="subtext">Incl. all taxes & charges</p>
            </div>
            <p className="value">
              {formatCurrency(
                Object.entries(bill).reduce((acc, [key, value]) => {
                  return key === 'discount' ? acc - value : acc + value
                }, 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderDetails
