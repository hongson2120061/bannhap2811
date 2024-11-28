import React, { useState } from 'react'
import './RevenueReport.scss'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Col, Row, Select, Statistic } from 'antd'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'

const { Option } = Select

const yearlyData = [
  { period: '2020', revenue: 5000000000 },
  { period: '2021', revenue: 7500000000 },
  { period: '2022', revenue: 6200000000 },
  { period: '2023', revenue: 8500000000 },
]
const monthlyData = [
  { period: 'Jan', revenue: 500000000 },
  { period: 'Feb', revenue: 400000000 },
  { period: 'Mar', revenue: 600000000 },
  { period: 'Apr', revenue: 700000000 },
  { period: 'May', revenue: 750000000 },
  { period: 'Jun', revenue: 680000000 },
  { period: 'Jul', revenue: 720000000 },
  { period: 'Aug', revenue: 810000000 },
  { period: 'Sep', revenue: 620000000 },
  { period: 'Oct', revenue: 750000000 },
  { period: 'Nov', revenue: 640000000 },
  { period: 'Dec', revenue: 700000000 },
]
const weeklyData = [
  { period: 'Week 1', revenue: 100000000 },
  { period: 'Week 2', revenue: 200000000 },
  { period: 'Week 3', revenue: 150000000 },
  { period: 'Week 4', revenue: 250000000 },
]
const dailyData = [
  { period: 'Thứ hai', revenue: 10000000 },
  { period: 'Thứ ba', revenue: 15000000 },
  { period: 'Thứ tư', revenue: 12000000 },
  { period: 'Thứ năm', revenue: 18000000 },
  { period: 'Thứ sáu', revenue: 14000000 },
  { period: 'Thứ bảy', revenue: 20000000 },
  { period: 'Chủ nhật', revenue: 17000000 },
]
const barDatapd = [
  { category: 'Khai vị', revenue: 1200000 },
  { category: 'Món chính', revenue: 6500000 },
  { category: 'Tráng miệng', revenue: 2000000 },
  { category: 'Nước uống', revenue: 2000000 },
]
const barDatapw = [
  { category: 'Khai vị', revenue: 12000000 },
  { category: 'Món chính', revenue: 25000000 },
  { category: 'Tráng miệng', revenue: 10000000 },
  { category: 'Nước uống', revenue: 20000000 },
]
const barDatapm = [
  { category: 'Khai vị', revenue: 220000000 },
  { category: 'Món chính', revenue: 450000000 },
  { category: 'Tráng miệng', revenue: 100000000 },
  { category: 'Nước uống', revenue: 180000000 },
]
const barDatapy = [
  { category: 'Khai vị', revenue: 1300000000 },
  { category: 'Món chính', revenue: 6800000000 },
  { category: 'Tráng miệng', revenue: 2000000000 },
  { category: 'Nước uống', revenue: 2000000000 },
]
const customerTypeDatapd = [
  { name: 'Khách quen', revenue: 4000000 },
  { name: 'Khách vãng lai', revenue: 3000000 },
  { name: 'Đặt chỗ online', revenue: 2000000 },
]
const customerTypeDatapw = [
  { name: 'Khách quen', revenue: 35000000 },
  { name: 'Khách vãng lai', revenue: 35000000 },
  { name: 'Đặt chỗ online', revenue: 15000000 },
]
const customerTypeDatapm = [
  { name: 'Khách quen', revenue: 120000000 },
  { name: 'Khách vãng lai', revenue: 260000000 },
  { name: 'Đặt chỗ online', revenue: 170000000 },
]
const customerTypeDatapy = [
  { name: 'Khách quen', revenue: 31000000000 },
  { name: 'Khách vãng lai', revenue: 3500000000 },
  { name: 'Đặt chỗ online', revenue: 2200000000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const RevenueReport = () => {
  const [timeRange, setTimeRange] = useState('daily')

  const getData = (e) => {
    if (e === 'total-revenue') {
      switch (timeRange) {
        case 'year':
          return yearlyData
        case 'month':
          return monthlyData
        case 'week':
          return weeklyData
        case 'daily':
          return dailyData
        default:
          return dailyData
      }
    } else if (e === 'dish-revenue') {
      switch (timeRange) {
        case 'year':
          return barDatapy
        case 'month':
          return barDatapm
        case 'week':
          return barDatapw
        case 'daily':
          return barDatapd
        default:
          return barDatapd
      }
    } else {
      switch (timeRange) {
        case 'year':
          return customerTypeDatapy
        case 'month':
          return customerTypeDatapm
        case 'week':
          return customerTypeDatapw
        case 'daily':
          return customerTypeDatapd
        default:
          return customerTypeDatapd
      }
    }
  }

  const handleTimeRangeChange = (value) => {
    setTimeRange(value)
  }

  return (
    <div className="RevenueReport">
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Khách hàng mới quay lại"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Khách hàng quen"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Select
        defaultValue="daily"
        onChange={handleTimeRangeChange}
        style={{ width: '100%', maxWidth: '150px', marginBottom: 20, height: 40, marginTop: 20 }}
      >
        <Option value="daily">Theo ngày</Option>
        <Option value="week">Theo tuần</Option>
        <Option value="month">Theo tháng</Option>
        <Option value="year">Theo năm</Option>
      </Select>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 style={{ marginBottom: 20 }}>
            Biểu đồ doanh thu theo{' '}
            {timeRange === 'year'
              ? 'năm'
              : timeRange === 'month'
                ? 'tháng'
                : timeRange === 'daily'
                  ? 'ngày'
                  : 'tuần'}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getData('total-revenue')}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1000000000) return `${(value / 1000000000).toFixed(0)}B`
                  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                  return value
                }}
              />
              <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
                name="Doanh thu"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xl={{ span: 12 }}>
          <h2 style={{ marginBottom: 20 }}>Doanh thu theo danh mục món ăn</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getData('dish-revenue')}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1000000000) return `${(value / 1000000000).toFixed(0)}B`
                  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                  return value
                }}
              />
              <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} xl={{ span: 12 }}>
          <h2 style={{ marginBottom: 20 }}>Doanh thu theo loại khách hàng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getData()}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ revenue }) => `${revenue.toLocaleString()} VND`}
              >
                {getData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()} VND`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  )
}

export default RevenueReport
