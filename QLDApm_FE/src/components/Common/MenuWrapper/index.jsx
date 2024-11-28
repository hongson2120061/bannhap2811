import './MenuWrapper.scss'
import { Icon } from '@iconify/react'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { useNavigate } from 'react-router-dom'

export default function MenuWrapper({ title, data, type }) {
  const navigate = useNavigate()

  const handleClickDish = (id) => {
    navigate(`dish/${id}`)
  }

  const handleClickDetail = () => {
    navigate('detail')
  }

  return (
    <div className={`MenuWrapper ${type === 'right' ? 'd-right' : 'd-left'}`}>
      <div className="main-dish-image">
        <img src={data[0].image} alt="" style={{ borderRadius: 10 }} />
      </div>
      <div className="content-wrapper">
        <Icon icon="solar:tea-cup-outline" width={32} height={32} color="orange" />
        <p className="title" onClick={handleClickDetail}>
          {title}
        </p>
        {data.slice(0, 4).map((item, index) => {
          return (
            <div className="item" key={`dish-item-${index}`}>
              <div className="name">
                <p
                  onClick={() => {
                    return handleClickDish(item.dishId)
                  }}
                >
                  {item.dishName}
                </p>
                <p className="price">{formatCurrency(item.price)}</p>
              </div>
              <p className="description">{item.description}</p>
              <p className="rating">{item.rating} ratings</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
