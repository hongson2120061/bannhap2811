import { useState } from 'react'
import './Profile.scss'

export default function Profile() {
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [fullName, setFullName] = useState('')
  const [professionalTitle, setProfessionalTitle] = useState('')
  const [age, setAge] = useState('')
  const [about, setAbout] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [country, setCountry] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [fullAddress, setFullAddress] = useState('')

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      fullName,
      professionalTitle,
      age,
      about,
      contactNumber,
      emailAddress,
      country,
      postcode,
      city,
      fullAddress,
    })
  }

  return (
    <div className="Profile">
      <div className="Profile-left">
        <div className="user-info">
          <img
            src="https://cdn.tuoitre.vn/zoom/700_525/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
            alt="User Avatar"
            className="user-avatar"
          />
          <h2 className="user-name">John Doe</h2>
          <p className="user-job">Nhà phát triển web</p>
        </div>
        <div className="menu">
          <button
            className={`menu-item ${selectedMenu === 'Profile' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Profile')}
          >
            Hồ sơ
          </button>
          <button
            className={`menu-item ${selectedMenu === 'My Order' ? 'active' : ''}`}
            onClick={() => handleMenuClick('My Order')}
          >
            Đơn hàng của tôi
          </button>
          <button
            className={`menu-item ${selectedMenu === 'Change Password' ? 'active' : ''}`}
            onClick={() => handleMenuClick('Change Password')}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
      <div className="Profile-right">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="professionalTitle">Nghề nghiệp:</label>
              <input
                type="text"
                id="professionalTitle"
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Tuổi:</label>
              <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="about">Giới thiệu:</label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
            />
          </div>
          <div className="form-group">
            <h3>THÔNG TIN LIÊN LẠC</h3>
          </div>
          <hr className="horizontal-line" />
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactNumber">Số điện thoại:</label>
              <input
                type="text"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailAddress">Email:</label>
              <input
                type="email"
                id="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Quốc gia:</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postcode">Mã bưu chính:</label>
              <input
                type="text"
                id="postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="fullAddress">Địa chỉ:</label>
              <input
                type="text"
                id="fullAddress"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  )
}
