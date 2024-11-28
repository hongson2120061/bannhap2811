import React, { useState } from 'react'
import { Button, Space, Modal } from 'antd'
import { CustomTable } from 'components'
import './ManageOrder.scss'

const ManageOrder = () => {
  // const [currentPage, setCurrentPage] = useState(1)
  // const pageSize = 10 // Number of items per page

  const [selectedOrder, setSelectedOrder] = useState(null) // Khai báo selectedOrder
  const [isModalVisible, setIsModalVisible] = useState(false) // Khai báo isModalVisible

  const data = [
    {
      key: '1',
      Order_ID: 'ORD001',
      user_ID: 'USR001',
      reservation_ID: 'RES001',
      order_date: '12 Feb 2024',
      total_price: '$8,542.82',
      status: 'Completed',
      date_created: '10 Feb 2024',
      date_updated: '12 Feb 2024',
    },
    {
      key: '2',
      Order_ID: 'ORD002',
      user_ID: 'USR002',
      reservation_ID: 'RES002',
      order_date: '15 Feb 2024',
      total_price: '$5,120.50',
      status: 'Pending',
      date_created: '13 Feb 2024',
      date_updated: '14 Feb 2024',
    },
    {
      key: '3',
      Order_ID: 'ORD003',
      user_ID: 'USR003',
      reservation_ID: 'RES003',
      order_date: '20 Feb 2024',
      total_price: '$3,250.00',
      status: 'Completed',
      date_created: '19 Feb 2024',
      date_updated: '20 Feb 2024',
    },
    {
      key: '4',
      Order_ID: 'ORD004',
      user_ID: 'USR004',
      reservation_ID: 'RES004',
      order_date: '22 Feb 2024',
      total_price: '$1,500.75',
      status: 'Cancelled',
      date_created: '21 Feb 2024',
      date_updated: '22 Feb 2024',
    },
    {
      key: '5',
      Order_ID: 'ORD005',
      user_ID: 'USR005',
      reservation_ID: 'RES005',
      order_date: '25 Feb 2024',
      total_price: '$2,800.90',
      status: 'Pending',
      date_created: '24 Feb 2024',
      date_updated: '25 Feb 2024',
    },
    {
      key: '6',
      Order_ID: 'ORD006',
      user_ID: 'USR006',
      reservation_ID: 'RES006',
      order_date: '28 Feb 2024',
      total_price: '$4,400.00',
      status: 'Completed',
      date_created: '27 Feb 2024',
      date_updated: '28 Feb 2024',
    },
    {
      key: '7',
      Order_ID: 'ORD007',
      user_ID: 'USR007',
      reservation_ID: 'RES007',
      order_date: '01 Mar 2024',
      total_price: '$6,750.25',
      status: 'Pending',
      date_created: '28 Feb 2024',
      date_updated: '01 Mar 2024',
    },
    {
      key: '8',
      Order_ID: 'ORD008',
      user_ID: 'USR008',
      reservation_ID: 'RES008',
      order_date: '03 Mar 2024',
      total_price: '$2,250.50',
      status: 'Completed',
      date_created: '02 Mar 2024',
      date_updated: '03 Mar 2024',
    },
    {
      key: '9',
      Order_ID: 'ORD009',
      user_ID: 'USR009',
      reservation_ID: 'RES009',
      order_date: '05 Mar 2024',
      total_price: '$7,350.00',
      status: 'Pending',
      date_created: '04 Mar 2024',
      date_updated: '05 Mar 2024',
    },
    {
      key: '10',
      Order_ID: 'ORD010',
      user_ID: 'USR010',
      reservation_ID: 'RES010',
      order_date: '07 Mar 2024',
      total_price: '$1,200.30',
      status: 'Cancelled',
      date_created: '06 Mar 2024',
      date_updated: '07 Mar 2024',
    },
  ]

  const columns = [
    {
      title: 'Order_ID',
      dataIndex: 'Order_ID',
      key: 'Order_ID',
      width: 120,
    },
    {
      title: 'user_ID',
      dataIndex: 'user_ID',
      key: 'user_ID',
      width: 120,
    },
    {
      title: 'reservation_ID',
      dataIndex: 'reservation_ID',
      key: 'reservation_ID',
      width: 150,
    },
    {
      title: 'order_date',
      dataIndex: 'order_date',
      key: 'order_date',
      width: 150,
    },
    {
      title: 'total_price',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 120,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: 'date_created',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 150,
    },
    {
      title: 'date_updated',
      dataIndex: 'date_updated',
      key: 'date_updated',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showOrderDetails(record)}>
            Detail
          </Button>
          <Button type="primary">Accept</Button>
          <Button type="primary">Cancel</Button>
        </Space>
      ),
    },
  ]

  const showOrderDetails = (order) => {
    setSelectedOrder(order) // Chọn đơn hàng hiện tại
    setIsModalVisible(true) // Hiển thị modal
  }

  const handleOk = () => {
    setIsModalVisible(false) // Đóng modal khi bấm OK
  }

  const handleCancel = () => {
    setIsModalVisible(false) // Đóng modal khi bấm Cancel
  }

  // const handlePageChange = (page) => {
  //   setCurrentPage(page)
  // }

  return (
    <div className="manage-order-container">
      <CustomTable
        className="ant-table"
        columns={columns}
        data={data}
        pagination={false}
        rowKey="key"
      />
      {/* <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
        />
      </div> */}

      {/* Modal chi tiết đơn hàng */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ style: { display: 'none' } }} // Ẩn nút cancel
      >
        {selectedOrder && (
          <div className="order-details">
            <p>
              <strong>Order ID:</strong> {selectedOrder.Order_ID}
            </p>
            <p>
              <strong>User ID:</strong> {selectedOrder.user_ID}
            </p>
            <p>
              <strong>Reservation ID:</strong> {selectedOrder.reservation_ID}
            </p>
            <p>
              <strong>Order Date:</strong> {selectedOrder.order_date}
            </p>
            <p>
              <strong>Total Price:</strong> {selectedOrder.total_price}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Date Created:</strong> {selectedOrder.date_created}
            </p>
            <p>
              <strong>Date Updated:</strong> {selectedOrder.date_updated}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ManageOrder
