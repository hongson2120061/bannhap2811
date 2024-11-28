export const OrderStatus = {
  Cancelled: 'Cancelled',
  Delayed: 'Delayed',
  Completed: 'Completed',
}

export const OrderHistory = {
  Accepted: 'accepted',
  Prepaired: 'prepaired',
  Delivered: 'delivered',
}
export const BillDetails = {
  Total: 'total',
  HandlingCharge: 'handlingCharge',
  DeliveryFee: 'deliveryFee',
  Discount: 'discount',
}
export const BillDetailsValue = {
  [BillDetails.Total]: 'Total',
  [BillDetails.HandlingCharge]: 'Handling Charge',
  [BillDetails.DeliveryFee]: 'Delivery Fee',
  [BillDetails.Discount]: 'Discount',
}

export const OrderStatusValues = [OrderStatus.Cancelled, OrderStatus.Delayed, OrderStatus.Completed]
