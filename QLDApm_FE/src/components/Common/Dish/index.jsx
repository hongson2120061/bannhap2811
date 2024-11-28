import './Dish.scss'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { Image } from 'antd'
import { Icon } from '@iconify/react'
import { StarRating } from 'components'
import { useNavigate } from 'react-router-dom'

export default function Dish({ dataDish, cls = '', type, showModal, setDishState }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (type !== 'management') {
      navigate(`/home/menu/dish/${dataDish.dishId}`)
      if (cls === 'carousel') {
        window.location.reload()
      }
    }
  }

  return (
    <div className="Dish">
      <div>
        <Image
          width={'100%'}
          height={'200px'}
          preview={false}
          src={dataDish.image}
          fallback={require('assets/images/image-not-found.png')}
          onClick={handleClick}
        />
        <div className="dish-action">
          <div className="favorite-action"></div>
          <Icon icon="pepicons-pop:line-y" width={32} height={32} />
          <div
            className="cart-action"
            onClick={() => {
              setDishState(dataDish)
              showModal()
            }}
          ></div>
        </div>
      </div>
      <div>
        <div>
          <p onClick={handleClick}>{dataDish.dishName}</p>
          <StarRating rating={dataDish.rating} />
        </div>
        <p>{formatCurrency(dataDish.price)}</p>
      </div>
    </div>
  )
}
