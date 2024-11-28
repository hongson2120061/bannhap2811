import './UserFooter.scss' // Nhập file CSS cho Footer
import React from 'react'
import { Input } from 'antd' // Sử dụng Search của Ant Design
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons' // Icon mạng xã hội

const { Search } = Input

export default function UserFooter() {
  return (
    <footer className="UserFooter">
      <div className="footer-background"></div>
      <div className="footer-wrapper">
        <div className="footer-container">
          {/* Phần Hỗ trợ */}
          <div className="support-section">
            <div className="support-text">
              <h3>Bạn vẫn đang cần hỗ trợ?</h3>
              <p>Đừng chờ đợi, hãy đưa ra câu hỏi tại đây. Chúng tôi sẽ phản hồi cho bạn sau!</p>
            </div>
            <div className="support-input">
              <Search
                placeholder="Câu hỏi của bạn"
                enterButton="Gửi"
                size="large"
                onSearch={(value) => console.log(value)}
              />
            </div>
          </div>

          {/* Phần Giới thiệu và Liên kết */}
          <div className="about-section">
            <div className="about" style={{ textAlign: 'left' }}>
              <h3>Về chúng tôi</h3>
              <p style={{ textAlign: 'justify' }}>
                Nhóm 5 là một tập thể năng động và sáng tạo, gồm tám thành viên với những kỹ năng và
                chuyên môn đa dạng. Chúng tôi cùng nhau hợp tác để hoàn thành bài tập lớn, với mục
                tiêu không chỉ đạt kết quả tốt mà còn học hỏi lẫn nhau. Chúng tôi tin rằng sự kết
                hợp này sẽ mang lại những giải pháp sáng tạo và hiệu quả cho dự án của mình.
              </p>
              <div className="open-hours">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Hình ảnh cho thời gian mở cửa */}
                  <span style={{ marginRight: '15px' }}>
                    <img
                      src={require('assets/images/thoi-gian.png')} // Đường dẫn đến hình ảnh đồng hồ
                      alt=""
                      style={{ width: '50px', height: '60px' }} // Kích thước hình ảnh
                    />
                  </span>

                  {/* Thông tin mở cửa */}
                  <p style={{ margin: 5 }}>
                    <strong>Giờ mở cửa:</strong>
                    <br /> Thứ hai - Thứ bảy (8:00 - 21:00) <br />
                    Chủ nhật - Đóng cửa
                  </p>
                </div>
              </div>
            </div>
            <div className="links" style={{ textAlign: 'left' }}>
              <h3>Liên quan</h3>
              <ul>
                <li>
                  <a href="/home/menu">Đăng nhập</a>
                </li>
                <li>
                  <a href="/home/menu">Thực đơn</a>
                </li>
                <li>
                  <a href="/about-us">Đầu bếp của chúng tôi</a>
                </li>
                <li>
                  <a href="/our-team">Nhóm chúng tôi</a>
                </li>
              </ul>
            </div>
            <div className="help" style={{ textAlign: 'left' }}>
              <h3>Hỗ trợ</h3>
              <ul>
                <li>
                  <a href="/help">FAQ</a>
                </li>
                <li>
                  <a href="/help">Chính sách</a>
                </li>
                <li>
                  <a href="/help">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="/help">Tài liệu liên quan</a>
                </li>
                <li>
                  <a href="/help">Chăm sóc khách hàng</a>
                </li>
              </ul>
            </div>
            <div className="posts" style={{ textAlign: 'left' }}>
              <h3>Bài viết gần đây</h3>
              <ul>
                <li>
                  <a href="/blog">Is fast food good for your body?</a>
                </li>
                <li>
                  <a href="/blog">Change your food habit with organic food</a>
                </li>
                <li>
                  <a href="/blog">Do you like fast food for your life?</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Phần thông tin bản quyền và mạng xã hội */}
          <div className="information">
            <p>Copyright © 2024 by Team 5. All Rights Reserved.</p>
            <div className="social-icons">
              <FacebookOutlined />
              <TwitterOutlined />
              <InstagramOutlined />
              <YoutubeOutlined />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
