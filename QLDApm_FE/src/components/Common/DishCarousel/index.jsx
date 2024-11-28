import './DishCarousel.scss'
import { Dish } from 'components'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

export default function DishCarousel({ data, type }) {
  const [index, setIndex] = useState(0)
  const [dishesPerSlide, setDishesPerSlide] = useState(4)

  const nextSlide = () => {
    const slides = document.querySelectorAll('.carousel-slide .dish')
    const totalSlides = slides.length / dishesPerSlide
    let currentIndex = Math.floor((index + 1) % totalSlides)
    if (currentIndex === 0) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
    document.querySelector('.carousel-container').style.transform =
      `translateX(-${currentIndex * 100}%)`
  }

  const prevSlide = () => {
    const slides = document.querySelectorAll('.carousel-slide .dish')
    const totalSlides = slides.length

    let currentIndex = (index - 1 + totalSlides) % totalSlides
    setIndex(index - 1)
    document.querySelector('.carousel-container').style.transform =
      `translateX(-${currentIndex * 100}%)`
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 2000) {
        setDishesPerSlide(5) // For large screens
      } else if (width >= 1200) {
        setDishesPerSlide(4)
      } else if (width >= 768) {
        setDishesPerSlide(3) // For tablets
      } else if (width >= 576) {
        setDishesPerSlide(2) // For small screens
      } else {
        setDishesPerSlide(1) // For mobile devices
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call initially to set correct dishs per slide
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="DishCarousel">
      <div className="carousel-container">
        <div className="carousel-slide">
          {data.map((item, index) => {
            return (
              <div
                className="dish"
                key={`dish-cart-${index}`}
                style={{ flex: `0 0 ${100 / dishesPerSlide}%` }}
              >
                <Dish dataDish={item} cls={'carousel'} type={type} />
              </div>
            )
          })}
        </div>
      </div>
      {index !== 0 && (
        <Icon
          icon="iconamoon:player-previous-fill"
          onClick={prevSlide}
          className="carousel-button left"
          width={32}
          height={32}
        />
      )}
      <Icon
        icon="iconamoon:player-next-fill"
        onClick={nextSlide}
        className="carousel-button right"
        width={32}
        height={32}
      />
    </div>
  )
}
