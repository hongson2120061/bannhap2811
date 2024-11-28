import './OrderTracking.scss'
import { Icon } from '@iconify/react'
import { Divider } from 'antd'
import IconButton from 'components/Common/IconButton'
import { PhoneFilled } from '@ant-design/icons'

const ORDER_TRACKING_MOCK_DATA = [
  {
    name: 'Paradise Apartments',
    address: '123, Paradise Apartments, Sector 56, Gurgaon',
    type: 'destination',
  },
  {
    name: 'Hunger Bowl Restaurant',
    address: '456, Hunger Bowl Restaurant, Sector 56, Gurgaon',
    type: 'restaurant',
  },
]

const OrderTrackingIcon = {
  destination: (
    <Icon icon="carbon:location-filled" style={{ color: '#2D60FF', fontSize: '20px' }} />
  ),
  restaurant: <Icon icon="carbon:restaurant" style={{ color: '#2D60FF', fontSize: '20px' }} />,
}

const OrderTracking = () => {
  return (
    <div className="order-info-children order-tracking">
      <h1>Order Tracking</h1>
      <div className="card order-tracking-container">
        <img
          src={require('assets/images/Map.png')}
          alt="map-mock"
          style={{
            width: '100%',
          }}
        />
        <div>
          {ORDER_TRACKING_MOCK_DATA.map((item, index) => {
            return (
              <div key={index}>
                <div className="order-tracking-item">
                  <IconButton>{OrderTrackingIcon[item.type]}</IconButton>
                  <div className="order-tracking-content">
                    <h3>{item.name}</h3>
                    <p>{item.address}</p>
                  </div>
                </div>
                {index !== ORDER_TRACKING_MOCK_DATA.length - 1 && (
                  <Divider
                    type="vertical"
                    variant="dashed"
                    style={{ borderColor: '#EAEFFF', height: '30px', marginLeft: '17px' }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="delivery-partner">
          <h1>Delivery Partner</h1>
          <div className="delivery-partner-content">
            <div className="delivery-partner-info">
              <img
                src="https://i.pravatar.cc/150"
                alt="delivery-partner"
                style={{
                  height: '45px',
                  aspectRatio: '1',
                  borderRadius: '50%',
                }}
              />
              <div className="delivery-partner-details">
                <h3>John Doe</h3>
                <p>1000+ five star deliveries</p>
              </div>
            </div>
            <div className="button-group">
              <IconButton>
                <Icon icon="ant-design:message-filled" color="#2D60FF" />
              </IconButton>
              <IconButton>
                <PhoneFilled style={{ color: '#2D60FF' }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderTracking
