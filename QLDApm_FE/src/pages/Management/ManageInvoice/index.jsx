import React, { useState } from 'react'
import { Button, Space, Modal, Input } from 'antd'
import { CustomTable } from 'components'
import './ManageInvoice.scss'

const ManageInvoice = () => {
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCreateInvoiceVisible, setIsCreateInvoiceVisible] = useState(false) // State để quản lý modal tạo hóa đơn
  const [newInvoiceData, setNewInvoiceData] = useState({
    invoice_ID: '',
    order_ID: '',
    total_amount: '',
    invoice_date: '',
  })

  const data = [
    {
      key: '1',
      invoice_ID: 'INV001',
      order_ID: 'ORD001',
      total_amount: '$5,120.50',
      invoice_date: '13 Feb 2024',
    },
    {
      key: '2',
      invoice_ID: 'INV002',
      order_ID: 'ORD002',
      total_amount: '$5,120.50',
      invoice_date: '14 Feb 2024',
    },
  ]

  const columns = [
    {
      title: 'Invoice_ID',
      dataIndex: 'invoice_ID',
      key: 'invoice_ID',
      width: 120,
    },
    {
      title: 'Order_ID',
      dataIndex: 'order_ID',
      key: 'order_ID',
      width: 120,
    },
    {
      title: 'Total_amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 150,
    },
    {
      title: 'Invoice_date',
      dataIndex: 'invoice_date',
      key: 'invoice_date',
      width: 150,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showVoiceDetails(record)}>
            View
          </Button>
          <Button type="primary">Edit</Button>
          <Button type="primary">Delete</Button>
        </Space>
      ),
    },
  ]

  const showVoiceDetails = (voice) => {
    setSelectedVoice(voice) // Chọn đơn hàng hiện tại
    setIsModalVisible(true) // Hiển thị modal
  }

  const handleOk = () => {
    setIsModalVisible(false) // Đóng modal khi bấm OK
  }

  const handleCancel = () => {
    setIsModalVisible(false) // Đóng modal khi bấm Cancel
  }

  // Xem hoa don
  const showCreateInvoiceModal = () => {
    setIsCreateInvoiceVisible(true) // Hiển thị modal tạo hóa đơn
  }

  const handleCreateInvoice = () => {
    // Xử lý khi nhấn "Tạo"
    console.log('New Invoice Data:', newInvoiceData)
    setIsCreateInvoiceVisible(false) // Đóng modal tạo hóa đơn sau khi tạo
  }

  const handleCreateInvoiceCancel = () => {
    setIsCreateInvoiceVisible(false) // Đóng modal tạo hóa đơn khi bấm Cancel
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewInvoiceData({ ...newInvoiceData, [name]: value })
  }

  return (
    <div className="manage-invoice-container">
      {/* Nút tạo hóa đơn */}
      <div className="create-invoice-button">
        <Button type="primary" onClick={showCreateInvoiceModal}>
          Create Invoice
        </Button>
      </div>

      <CustomTable
        className="ant-table"
        columns={columns}
        data={data}
        pagination={false}
        rowKey="key"
      />

      {/* Modal chi tiết đơn hàng */}
      <Modal
        title="Invoice Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ style: { display: 'none' } }} // Ẩn nút cancel
      >
        {selectedVoice && (
          <div className="voice-details">
            <p>
              <strong>Invoice ID:</strong> {selectedVoice.invoice_ID}
            </p>
            <p>
              <strong>Order ID:</strong> {selectedVoice.order_ID}
            </p>
            <p>
              <strong>Total Amount:</strong> {selectedVoice.total_amount}
            </p>
            <p>
              <strong>Invoice Date:</strong> {selectedVoice.invoice_date}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal tạo hóa đơn mới */}
      <Modal
        title="Creat new invoice"
        visible={isCreateInvoiceVisible}
        onOk={handleCreateInvoice}
        onCancel={handleCreateInvoiceCancel}
        okText="Create"
        cancelText="Cancel"
        cancelButtonProps={{
          style: { backgroundColor: '#1890ff', color: '#ffffff', borderColor: '#1890ff' },
        }}
      >
        {/* Form nhập thông tin hóa đơn mới */}
        <div className="create-invoice-form">
          <p>Invoice ID:</p>
          <Input
            name="invoice_ID"
            value={newInvoiceData.invoice_ID}
            onChange={handleInputChange}
            placeholder="Enter Invoice ID"
          />
          <p>Order ID:</p>
          <Input
            name="order_ID"
            value={newInvoiceData.order_ID}
            onChange={handleInputChange}
            placeholder="Enter Order ID"
          />
          <p>Total Amount:</p>
          <Input
            name="total_amount"
            value={newInvoiceData.total_amount}
            onChange={handleInputChange}
            placeholder="Enter Total Amount"
          />
          <p>Invoice Date:</p>
          <Input
            name="invoice_date"
            value={newInvoiceData.invoice_date}
            onChange={handleInputChange}
            placeholder="Enter Invoice Date"
          />
        </div>
      </Modal>
    </div>
  )
}

export default ManageInvoice
