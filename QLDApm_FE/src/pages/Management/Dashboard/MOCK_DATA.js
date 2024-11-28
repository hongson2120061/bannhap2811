import { OrderStatus } from 'constant/type'

export const MOCK_DATA = {
  total_orders: {
    value: 100,
    trend: -10,
  },
  total_delivered: {
    value: 100,
    trend: 10,
  },
  total_revenue: {
    value: 100000,
    trend: -2,
  },
  total_cancelled: {
    value: 100,
    trend: 2,
  },
}

export const ORDER_LIST_MOCK_DATA = [
  {
    id: 123456,
    status: OrderStatus.Cancelled,
    customerName: 'John Doe',
    time: '2023-09-10T14:15:00Z',
    address: '456 Park Ave, New York, NY 10022',
    history: {
      accepted: '2023-09-10T14:10:00Z',
      prepaired: '2023-09-10T14:12:00Z',
      delivered: '2023-09-10T14:30:00Z',
    },
    order: [
      {
        id: 1,
        name: 'Pepperoni Pizza',
        quantity: 1,
        price: 120,
      },
      {
        id: 2,
        name: 'Garlic Bread',
        quantity: 2,
        price: 30,
      },
      {
        id: 3,
        name: 'Diet Coke 500ml',
        quantity: 2,
        price: 60,
      },
    ],
    bill: {
      total: 240,
      discount: 15,
      handlingCharge: 10,
      deliveryFee: 5,
    },
  },
  {
    id: 123457,
    status: OrderStatus.Completed,
    customerName: 'Jane Miller',
    time: '2023-09-09T11:00:00Z',
    address: '789 Broadway, Brooklyn, NY 11221',
    history: {
      accepted: '2023-09-09T11:05:00Z',
      prepaired: '2023-09-09T11:20:00Z',
      delivered: '2023-09-09T12:00:00Z',
    },
    bill: {
      total: 310,
      discount: 20,
      handlingCharge: 12,
      deliveryFee: 8,
    },
    order: [
      {
        id: 1,
        name: 'Vegan Burger',
        quantity: 3,
        price: 150,
      },
      {
        id: 2,
        name: 'Lemonade 300ml',
        quantity: 3,
        price: 40,
      },
    ],
  },
  {
    id: 123458,
    status: OrderStatus.Delayed,
    delayTime: 25 * 1000 * 60,
    customerName: 'Jake Thompson',
    time: '2023-09-08T20:30:00Z',
    address: '123 Ocean Drive, Miami, FL 33139',
    history: {
      accepted: '2023-09-08T20:35:00Z',
      prepaired: '2023-09-08T20:50:00Z',
      delivered: '2023-09-08T21:45:00Z',
    },
    bill: {
      total: 450,
      discount: 30,
      handlingCharge: 15,
      deliveryFee: 12,
    },
    order: [
      {
        id: 1,
        name: 'Seafood Platter',
        quantity: 2,
        price: 200,
      },
      {
        id: 2,
        name: 'Wine Bottle',
        quantity: 1,
        price: 250,
      },
    ],
  },
  {
    id: 123459,
    status: OrderStatus.Completed,
    customerName: 'Lisa Zhang',
    time: '2023-09-07T18:45:00Z',
    address: '987 Market St, San Francisco, CA 94103',
    history: {
      accepted: '2023-09-07T18:50:00Z',
      prepaired: '2023-09-07T19:05:00Z',
      delivered: '2023-09-07T19:30:00Z',
    },
    bill: {
      total: 185,
      discount: 10,
      handlingCharge: 5,
      deliveryFee: 5,
    },
    order: [
      {
        id: 1,
        name: 'Pad Thai Noodles',
        quantity: 1,
        price: 90,
      },
      {
        id: 2,
        name: 'Spring Rolls',
        quantity: 3,
        price: 30,
      },
      {
        id: 3,
        name: 'Green Tea',
        quantity: 2,
        price: 40,
      },
    ],
  },
  {
    id: 123460,
    status: OrderStatus.Cancelled,
    customerName: 'Michael Lee',
    time: '2023-09-06T15:30:00Z',
    address: '250 1st Ave, Los Angeles, CA 90001',
    history: {
      accepted: '2023-09-06T15:35:00Z',
      prepaired: '2023-09-06T15:45:00Z',
      delivered: '2023-09-06T16:15:00Z',
    },
    bill: {
      total: 295,
      discount: 25,
      handlingCharge: 10,
      deliveryFee: 10,
    },
    order: [
      {
        id: 1,
        name: 'Sushi Platter',
        quantity: 2,
        price: 150,
      },
      {
        id: 2,
        name: 'Miso Soup',
        quantity: 2,
        price: 45,
      },
    ],
  },
  {
    id: 123461,
    status: OrderStatus.Completed,
    customerName: 'Emma Williams',
    time: '2023-09-05T13:15:00Z',
    address: '654 Elm St, Austin, TX 78701',
    history: {
      accepted: '2023-09-05T13:20:00Z',
      prepaired: '2023-09-05T13:35:00Z',
      delivered: '2023-09-05T14:00:00Z',
    },
    bill: {
      total: 210,
      discount: 15,
      handlingCharge: 10,
      deliveryFee: 5,
    },
    order: [
      {
        id: 1,
        name: 'Grilled Chicken Salad',
        quantity: 1,
        price: 90,
      },
      {
        id: 2,
        name: 'Iced Coffee',
        quantity: 2,
        price: 60,
      },
      {
        id: 3,
        name: 'Brownie',
        quantity: 1,
        price: 40,
      },
    ],
  },
]
