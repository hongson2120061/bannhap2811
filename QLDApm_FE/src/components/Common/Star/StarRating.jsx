import { Star } from 'components'

export const StarRating = ({ rating }) => {
  const totalStars = 5
  const fullStars = Math.floor(rating) // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5 // Check for half star

  return (
    <div>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} filled={true} />
      ))}

      {/* Render half star if applicable */}
      {hasHalfStar && <Star half={true} />}

      {/* Render remaining empty stars */}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <Star key={fullStars + index + 1} filled={false} />
      ))}
    </div>
  )
}
