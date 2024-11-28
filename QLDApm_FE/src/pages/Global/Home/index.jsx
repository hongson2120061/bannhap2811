import './Home.scss'
import { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { mapDispatchToProps, mapStateToProps } from './rdHome'

function Home(props) {
  const carouselRef = useRef()
  const [selectedOption, setSelectedOption] = useState(null)

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  const cardData = [
    {
      title: 'Bánh mì Việt Nam',
      price: '89.000 VND',
      description: 'Một loại baguette của Việt Nam',
      calories: '500 CAL',
    },
    {
      title: 'Bánh mì bơ nhân mứt Kaya',
      price: '140.000 VND',
      description: 'Bánh mì nướng giòn với bơ và mứt Kaya',
      calories: '250 CAL',
    },
    {
      title: 'Bánh mì bơ nhân mứt Kaya 2',
      price: '180.000 VND',
      description: 'Bánh mì nướng giòn với bơ và mứt Kaya',
      calories: '250 CAL',
    },
    {
      title: 'Chả giò',
      price: '$889.000 VND',
      description: 'Bánh tráng giòn với nhân thịt heo, tôm và rau',
      calories: '120 CAL',
    },
    {
      title: 'Phaal Curry',
      price: '360.000 VND',
      description: 'Món cà ri cực cay từ Ấn Độ',
      calories: '350 CAL',
    },
    {
      title: 'Bò luộc cuốn bánh tráng',
      price: '339.000 VND',
      description: 'Món ăn mang lại cảm giác thanh mát',
      calories: '200 CAL',
    },
    {
      title: 'Bánh xèo',
      price: '159.000 VND',
      description: ' Bánh giòn nhân tôm và rau',
      calories: '350 CAL',
    },
    {
      title: 'Panettone',
      price: '99.000 VND',
      description: 'Bánh Giáng sinh truyền thống của Ý',
      calories: '330 CAL',
    },
  ]

  return (
    <div className="Home">
      <section className="content-1">
        <div className="content-1-text">
          <p className="content-1-title"> Món Ăn Bổ Dưỡng & Thơm Ngon ⸻</p>
          <h1 className="content-1-heading">Sống khỏe & Thưởng thức món ngon</h1>
          <p className="content-1-description">
            Hãy tận hưởng cuộc sống trọn vẹn với những món ăn không chỉ ngon miệng mà còn tốt cho
            sức khỏe của bạn.
          </p>
          <div className="content-1-buttons">
            <Button className="show-more-button">Hiển thị thêm</Button>
            <Button className="place-order-button">Đặt món ăn</Button>
          </div>
        </div>
        <div className="content-1-image">
          <img src={require('assets/images/home-img1.png')} alt="Healthy Food" />
        </div>
      </section>
      {/* Phần nội dung 2 */}
      <section className="content-2">
        <div className="content-2-image">
          <img src={require('assets/images/home-img2.png')} alt="Food Is Important" />
        </div>
        <div className="content-2-text">
          <p className="content-2-title"> Với chúng tôi ⸻</p>
          <h1 className="content-2-heading">
            Thực phẩm là phần thiết yếu trong chế độ ăn cân bằng
          </h1>
          <p className="content-2-description">
            Thực phẩm cung cấp các chất dinh dưỡng cần thiết để giúp cơ thể hoạt động hiệu quả và
            duy trì sức khỏe.
          </p>
          <div className="content-2-buttons">
            <Button className="show-more-button">Hiển thị thêm</Button>
            <Button className="watch-video-button"></Button>
          </div>
        </div>
      </section>
      <section className="food-category">
        <h2 className="food-category-title">Danh mục thực phẩm</h2>
        <p className="food-category-description">
          Việc phân loại thực phẩm trong danh mục không chỉ giúp người tiêu dùng dễ dàng lựa chọn mà
          còn cung cấp thông tin hữu ích về dinh dưỡng và an toàn thực phẩm.
        </p>
      </section>
      <section className="image-carousel">
        <div className="carousel-container">
          <Button onClick={() => scrollCarousel('left')} className="carousel-button left-button">
            &lt;
          </Button>
          <div className="carousel-scroll" ref={carouselRef}>
            <img src={require('assets/images/cate-img.png')} alt="" />
            <img src={require('assets/images/cate-img.png')} alt="" />
            <img src={require('assets/images/cate-img.png')} alt="" />
            <img src={require('assets/images/cate-img.png')} alt="" />
            <img src={require('assets/images/cate-img.png')} alt="" />
            <img src={require('assets/images/cate-img.png')} alt="" />
          </div>
          <Button onClick={() => scrollCarousel('right')} className="carousel-button right-button">
            &gt;
          </Button>
        </div>
      </section>
      {/* Phần nội dung 3 */}
      <section className="content-3">
        <div className="content-3-image">
          <img src={require('assets/images/home-img3.png')} alt="Why choose" />
        </div>
        <div className="content-3-text">
          <p className="content-3-title"> Tại sao nên chọn chúng tôi ⸻</p>
          <h1 className="content-3-heading">Tại sao chúng tôi nổi bật</h1>
          <p className="content-3-description-1">
            Chúng tôi tự hào mang đến dịch vụ giao hàng nhanh chóng, giúp bạn nhận món ăn yêu thích
            trong thời gian ngắn nhất. Với cam kết phục vụ 24/7, bạn có thể thưởng thức những bữa ăn
            ngon lành bất kỳ lúc nào.
          </p>
          <p className="content-3-description-2">
            Chất lượng thực phẩm tươi ngon là ưu tiên hàng đầu của chúng tôi. Mỗi món ăn đều được
            chế biến từ nguyên liệu tươi sống, mang đến hương vị tuyệt hảo và dinh dưỡng.
          </p>
          <div className="new-content-3-image">
            <img src={require('assets/images/home-why-pic1.png')} alt="Hình 1" />
            <img src={require('assets/images/home-why-pic2.png')} alt="Hình 2" />
            <img src={require('assets/images/home-why-pic3.png')} alt="Hình 3" />
            <img src={require('assets/images/home-why-pic4.png')} alt="Hình 4" />
          </div>
        </div>
      </section>
      {/* Phần nội dung 4 */}
      <section className="content-4">
        <h2 className="content-4-title">Thực đơn</h2>
        <p className="content-4-description">Thực đơn của chúng tôi gồm những món như sau</p>
        <div className="content-4-options">
          {['Buổi sáng', 'Buổi trưa', 'Buổi tối', 'Tráng miệng', 'Nước uống', 'Thức ăn nhanh'].map(
            (option) => (
              <span
                key={option}
                className={`option ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </span>
            )
          )}
        </div>
        <div className="content-4-divider"></div>
        <div className="content-4-cards">
          {cardData.map((card, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <span className="card-title">{card.title}</span>
                <span className="card-price">{card.price}</span>
              </div>
              <p className="card-description">{card.description}</p>
              <p className="card-calories">{card.calories}</p>
            </div>
          ))}
        </div>
        <button className="view-menu-button">Xem thực đơn</button>
      </section>
      {/* Phần nội dung 5 */}
      <div className="content-5">
        <div className="content-5-banner"></div>
        <div className="content-5-title">Thành viên</div>
        <div className="content-5-description">Nhóm gồm có các thành viên sau.</div>
        <div className="content-5-images">
          <img src={require('assets/images/home-member-img.png')} alt="Team Member 1" />
          <img src={require('assets/images/home-member-img.png')} alt="Team Member 2" />
          <img src={require('assets/images/home-member-img.png')} alt="Team Member 3" />
          <img src={require('assets/images/home-member-img.png')} alt="Team Member 4" />
        </div>
      </div>
      {/* Phần nội dung 6 */}
      <section className="content-6">
        <div className="content-6-text">
          <p className="content-6-title"> Khách hàng chứng thực ⸻</p>
          <h1 className="content-6-heading">Đánh giá của khách hàng</h1>
          <div className="content-6-image-small">
            <img src={require('assets/images/home-quotes-img.png')} alt="" />
          </div>
          <p className="content-6-description">
            Nhà hàng có thức ăn tuyệt vời và dịch vụ tận tình. Tôi sẽ chắc chắn quay lại lần nữa!
          </p>
          <div className="content-6-avatar">
            <img
              src={require('assets/images/avatar-testi.png')}
              alt="Avatar"
              className="avatar-image"
            />
            <div>
              <p className="avatar-name">Abdur Rahman</p>
              <p className="avatar-role">Khách hàng</p>
            </div>
          </div>
        </div>
        <div className="content-6-image">
          <img
            src={require('assets/images/home-danh-gia1.png')}
            alt="Testimonial 1"
            className="image-1"
          />
          <img
            src={require('assets/images/home-danh-gia2.png')}
            alt="Testimonial 2"
            className="image-2"
          />
        </div>
      </section>
      {/* Phần nội dung 7 */}
      <section className="content-7">
        <h1 className="content-7-title">Tin tức mới nhất</h1>
        <p className="content-7-description">
          Nhà hàng của chúng tôi vừa ra mắt thực đơn mới với nhiều món ăn hấp dẫn.
        </p>
        <div className="content-7-images">
          <div className="content-7-image">
            <img src={require('assets/images/home-blog.png')} alt="Blog 1" />
            <div className="content-7-image-info">
              <p className="image-date">02 Jan 2022 & Comments (03)</p>
              <h2 className="image-title">Chả giò</h2>
              <p className="image-description">Bánh tráng giòn với nhân thịt heo, tôm và rau.</p>
              <a href="/" className="read-more">
                Xem thêm
              </a>
            </div>
          </div>
          <div className="content-7-image">
            <img src={require('assets/images/home-blog.png')} alt="Blog 2" />
            <div className="content-7-image-info">
              <p className="image-date">02 Jan 2022 & Comments (03)</p>
              <h2 className="image-title">Phaal Curry</h2>
              <p className="image-description">Món cà ri cực cay từ Ấn Độ.</p>
              <a href="/" className="read-more">
                Xem thêm
              </a>
            </div>
          </div>
          <div className="content-7-image">
            <img src={require('assets/images/home-blog.png')} alt="Blog 3" />
            <div className="content-7-image-info">
              <p className="image-date">02 Jan 2022 & Comments (03)</p>
              <h2 className="image-title">Bánh xèo</h2>
              <p className="image-description">Bánh giòn nhân tôm và rau.</p>
              <a href="/" className="read-more">
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
