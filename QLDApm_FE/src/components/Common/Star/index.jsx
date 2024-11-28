import { Icon } from '@iconify/react'

export const Star = ({ filled, half }) => {
  if (half) {
    return (
      <Icon
        icon="gravity-ui:star-fill"
        width={20}
        height={20}
        style={{ color: 'gold', marginRight: 5 }}
      />
    )
  } else {
    return (
      <Icon
        icon="gravity-ui:star-fill"
        width={20}
        height={20}
        style={{ color: filled ? 'gold' : 'gray', marginRight: 5 }}
      />
    )
  }
}
