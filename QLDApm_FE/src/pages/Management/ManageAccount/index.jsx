import { Icon } from '@iconify/react'
import { Button, Popconfirm, Space } from 'antd'
import axios from 'axios'
import { CustomTable } from 'components'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ManageMenu.scss'

dayjs.extend(customParseFormat)

const ManageAccount = () => {
  // useNavigate
  const navigate = useNavigate()

  const [data, setData] = useState([])

  const [isLoading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const handleAdd = () => {
    navigate('add')
  }

  const handleEdit = (e) => {
    navigate(`edit/${e.userId}`, {
      state: {
        key: 'edit',
        data: e,
      },
    })
  }
  const handleViewOrderHistory = (userId) => {
    navigate(`history/${userId}`)
  }

  const handleDelete = async (e) => {
    const updatedItems = data.filter((item) => JSON.stringify(item) !== JSON.stringify(e))
    setData(updatedItems)
    await axios.delete(`http://localhost:5000/api/v1/user/${e.dishId}`)
  }

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 100,
      isSearched: false,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Họ',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 150,
      isSearched: true,
    },
    {
      title: 'Tên',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 150,
      isSearched: true,
    },
    {
      title: 'Vai trò',
      dataIndex: 'nameRole',
      key: 'nameRole',
      width: 130,
      filters: [
        { text: 'STAFF', value: 'STAFF' },
        { text: 'USER', value: 'USER' },
      ],
      onFilter: (value, record) =>
        record.nameRole === value || (value === 'USER' && !record.nameRole),
      render: (role) => role || 'USER',
      isSearched: false,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 150,
      render: (gender) => (gender ? 'Nam' : 'Nữ'),
      filters: [
        { text: 'Nam', value: true },
        { text: 'Nữ', value: false },
      ],
      onFilter: (value, record) => record.gender === value,
      isSearched: false,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: 150,
      render: (date) => (date ? new Date(date).toLocaleDateString() : 'N/A'),
      isSearched: false,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 250,
      render: (address) => address || 'N/A',
      isSearched: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      isSearched: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (phone) => phone || 'N/A',
      isSearched: false,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <div className="btn-wrapper">
          <Button onClick={() => handleViewOrderHistory(record.userId)}>
            <Icon icon="solar:history-bold" width={28} height={28} />
          </Button>
          <Button onClick={() => handleEdit(record)}>
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
      .get(`http://localhost:5000/api/v1/users`)
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
          <div className="range-picker-container"></div>
        </div>
        <Button onClick={handleAdd}>THÊM TÀI KHOẢN</Button>
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

export default ManageAccount
