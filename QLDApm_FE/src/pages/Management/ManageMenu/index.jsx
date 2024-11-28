import './ManageMenu.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Space, DatePicker, Tag, Button, Popconfirm } from 'antd'
import { Icon } from '@iconify/react'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { CustomTable } from 'components'
import { useNavigate } from 'react-router-dom'

dayjs.extend(customParseFormat)
const { RangePicker } = DatePicker

const ManageMenu = () => {
  // useNavigate
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
  }

  const handleAdd = () => {
    navigate('add')
  }

  const handleEdit = (e) => {
    navigate(`edit/${e.dishId}`, {
      state: {
        key: 'edit',
        data: e,
      },
    })
  }

  const handleDelete = async (e) => {
    const updatedItems = data.filter((item) => JSON.stringify(item) !== JSON.stringify(e))
    setData(updatedItems)
    await axios.delete(`http://localhost:5000/api/v1/dish/${e.dishId}`)
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 50,
      fixed: 'left',
      isSearched: false,
    },
    {
      title: 'Tên món ăn',
      width: 200,
      dataIndex: 'dishName',
      key: 'name',
      fixed: 'left',
      isSearched: true,
    },
    {
      title: 'Giá',
      width: 140,
      dataIndex: 'price',
      key: 'price',
      render: (value) => formatCurrency(value),
      sorter: (a, b) => a.price - b.price,
      isSearched: false,
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updated_time',
      key: 'updated_time',
      width: 150,
      isSearched: false,
    },
    {
      title: 'Phân loại',
      dataIndex: 'classify',
      key: 'classify',
      width: 100,
      isSearched: false,
      filters: [
        {
          text: 'dessert',
          value: 'dessert',
        },
        {
          text: 'starter',
          value: 'starter',
        },
        {
          text: 'main',
          value: 'main',
        },
        {
          text: 'drinks',
          value: 'drinks',
        },
      ],
      onFilter: (value, record) => record.classify === value,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      render: (e) => <p>{e} stars</p>,
      sorter: (a, b) => a.rating - b.rating,
      isSearched: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'available',
      key: 'available',
      width: 120,
      render: (e) =>
        !e ? (
          <Tag color="#f50" style={{ fontSize: '.9rem', padding: '5px 10px', fontWeight: 'bold' }}>
            Ngừng phục vụ
          </Tag>
        ) : (
          <Tag
            color="#87d068"
            style={{ fontSize: '.9rem', padding: '5px 10px', fontWeight: 'bold' }}
          >
            Có phục vụ
          </Tag>
        ),
      isSearched: false,
      filters: [
        {
          text: 'Có phục vụ',
          value: true,
        },
        {
          text: 'Ngừng phục vụ',
          value: false,
        },
      ],
      onFilter: (value, record) => record.available === value,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <div className="btn-wrapper">
          {/* <Icon icon="lsicon:view-filled" width={28} height={28} /> */}
          <Button
            onClick={() => {
              return handleEdit(record)
            }}
          >
            <Icon icon="typcn:edit" width={28} height={28} />
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <Button>
              <Icon icon="material-symbols:delete" width={28} height={28} />
            </Button>
          </Popconfirm>
        </div>
      ),
      isSearched: false,
    },
  ]

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/dishes`)
      .then((response) => {
        setData(
          response.data.data.map((item, index) => ({
            ...item,
            stt: index + 1,
            key: index,
          }))
        )
        setLoading(false)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  return (
    <div className="ManageMenu">
      <Space className="manage-menu-filter">
        <div>
          <p>Lọc theo:</p>
          <div className="range-picker-container">
            <RangePicker
              disabledDate={disabledDate}
              format="DD/MM/YYYY"
              placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
            />
          </div>
        </div>
        <Button onClick={handleAdd}>THÊM MÓN ĂN</Button>
      </Space>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        searchText={searchText}
        searchedColumn={searchedColumn}
        setSearchText={setSearchText}
        setSearchedColumn={setSearchedColumn}
      />
    </div>
  )
}

export default ManageMenu
