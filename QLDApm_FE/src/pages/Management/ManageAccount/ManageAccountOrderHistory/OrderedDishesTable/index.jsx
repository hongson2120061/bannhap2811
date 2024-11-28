import { CustomTable } from 'components'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'

const OrderedDishesTable = ({ data }) => {
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 50,
      render: (_, __, index) => index + 1,
      isSearched: false,
    },
    {
      title: 'Dish Name',
      dataIndex: 'dishName',
      key: 'dishName',
      width: 200,
      isSearched: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      isSearched: false,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price) => formatCurrency(price),
      sorter: (a, b) =>
        a.items.reduce((sum, item) => sum + item.dish.price, 0) -
        b.items.reduce((sum, item) => sum + item.dish.price, 0),
      isSearched: false,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 150,
      render: (total) => formatCurrency(total),
      sorter: (a, b) => a.total - b.total,
      isSearched: false,
    },
  ]

  return (
    <div>
      <CustomTable columns={columns} data={data} />
    </div>
  )
}
export default OrderedDishesTable
