import { Icon } from '@iconify/react'
import { OrderStatus } from 'constant/type'
import OrderDetails from '../OrderDetails'
import './OrderInfo.scss'
import OrderTracking from '../OrderTracking'
import { formatTime } from 'lib/utils'

const OrderInfo = ({ order }) => {
  return (
    <div className="order-info-container">
      <div className="order-info-header-card">
        <div className="card-header">
          <div className="order-id">
            <p>Order ID #{order.id}</p>
            <div className="copy-container">
              <Icon
                onClick={() => {
                  navigator.clipboard.writeText(order.id)
                }}
                icon="solar:copy-line-duotone"
                className="copy-icon"
              />
              <span className="copy-feedback">Copied!</span>
            </div>
          </div>
          <div className={`order_status ${order.status}`}>
            {order.status === OrderStatus.Delayed
              ? `Delay by ${Math.ceil(order.delayTime / (1000 * 60))} mins`
              : `Order ${order.status}`}
          </div>
        </div>
        <div className="card-title">
          <h1>{order.customerName}</h1>
          <span>
            {formatTime(order.time).formattedTime} | {formatTime(order.time).formattedDate}
          </span>
        </div>
      </div>
      <div className="order-info-main">
        <OrderDetails order={order} />
        <OrderTracking order={order} />
      </div>
    </div>
  )
}
export default OrderInfo
