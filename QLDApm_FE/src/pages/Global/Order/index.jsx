import './Order.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Select, Checkbox, Slider, Pagination, Skeleton } from 'antd'
import { StarRating, SearchBar, ResponsiveMenu } from 'components'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import Search from 'antd/es/input/Search'
import { mapDispatchToProps, mapStateToProps } from './rdMenuDetail'

const formatter = (value) =>
  `${`${value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).split('VND')[0]}đ`}`

function Order(props) {
  const navigate = useNavigate()
  const { GetDishes, dishState } = props
  const [selectedClassifications, setSelectedClassifications] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [cateLoad, setCateLoad] = useState(true)
  const [inputValue, setInputValue] = useState(0)
  const [current, setCurrent] = useState(0)
  const [last, setLast] = useState(12)
  const [visibleItems, setVisibleItems] = useState(12)

  const onChangePage = (page) => {
    setCurrent((page - 1) * visibleItems)
    setLast(page * visibleItems)
  }

  const onChangeSelect = (value) => {
    switch (value) {
      case 'latest':
        setFilteredData(
          selectedClassifications.length !== 0
            ? dishState.lsDishes.filter((item) => selectedClassifications.includes(item.categoryId))
            : dishState.lsDishes
        )
        break
      case 'highest-rated':
        setFilteredData([...filteredData].sort((a, b) => b.rating - a.rating))
        break
      case 'low-to-high':
        setFilteredData([...filteredData].sort((a, b) => a.price - b.price))
        break
      case 'high-to-low':
        setFilteredData([...filteredData].sort((a, b) => b.price - a.price))
        break
      default:
        setFilteredData(
          selectedClassifications.length !== 0
            ? dishState.lsDishes.filter((item) => selectedClassifications.includes(item.categoryId))
            : dishState.lsDishes
        )
    }
  }

  const onChangeSubSelect = (e) => {
    setSelectedClassifications(e)
  }

  const onSearchSelect = (value) => {
    console.log('search:', value)
  }

  const onChangeCheckbox = (e) => {
    const value = e.target.value
    setSelectedClassifications((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
    )
  }

  const onChangeSlider = (newValue) => {
    setInputValue(newValue)
  }

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth

      if (width < 576) {
        setVisibleItems(6)
      } else if (width >= 576 && width < 768) {
        setVisibleItems(8)
      } else if (width >= 768 && width < 1200) {
        setVisibleItems(12)
      } else {
        setVisibleItems(12)
      }
    }

    window.addEventListener('resize', updateVisibleItems)

    return () => {
      window.removeEventListener('resize', updateVisibleItems)
    }
  }, [])

  useEffect(() => {
    if (dishState.lsDishes[0]) {
      let filtered = dishState.lsDishes
      if (selectedClassifications.length !== 0) {
        filtered = dishState.lsDishes.filter((item) =>
          selectedClassifications.includes(item.categoryId)
        )
      }
      setFilteredData(filtered)
    }
  }, [selectedClassifications, dishState.lsDishes])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/categories')
      .then((response) => {
        setCategories(
          response.data.data.map((item) => ({
            id: item.categoryId,
            value: item.name,
            label: item.name,
          }))
        )
        setCateLoad(false)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [visibleItems])

  useEffect(() => {
    if (!dishState.status) {
      GetDishes()
    }
  }, [GetDishes, dishState.status])

  return (
    <>
      {dishState.loading ? (
        <Skeleton
          active
          style={{
            marginTop: '40px',
            marginBottom: '40px',
          }}
          paragraph={{ rows: 10 }}
        />
      ) : (
        <div className="Order">
          <div>
            <div>
              <div>Xếp theo: </div>
              <Select
                showSearch
                placeholder="Món ăn mới nhất"
                optionFilterProp="label"
                onChange={onChangeSelect}
                onSearch={onSearchSelect}
                size="large"
                options={[
                  {
                    value: 'latest',
                    label: 'Món ăn mới nhất',
                  },
                  {
                    value: 'highest-rated',
                    label: 'Đánh giá cao nhất',
                  },
                  {
                    value: 'low-to-high',
                    label: 'Giá tăng dần',
                  },
                  {
                    value: 'high-to-low',
                    label: 'Giá giảm dần',
                  },
                ]}
                style={{ width: 180 }}
              />
            </div>
            <div className="sub-filter">
              <div>Phân loại: </div>
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Phân loại"
                defaultValue={[]}
                options={categories.map((category) => ({
                  label: category.value,
                  value: category.id,
                }))}
                onChange={onChangeSubSelect}
              />
            </div>
            <SearchBar />
            <div className="sub-search-bar">
              <div>Tìm kiếm: </div>
              <Search />
            </div>
          </div>
          <div className="menu-wrapper">
            <div className="product-list">
              <ResponsiveMenu data={filteredData.slice(current, last)} />
              {filteredData.length !== 0 && (
                <>
                  <Pagination
                    current={current}
                    pageSize={visibleItems}
                    total={filteredData.length}
                    onChange={onChangePage}
                    size="small"
                    className="p-small"
                  />
                  <Pagination
                    current={current}
                    pageSize={visibleItems}
                    total={filteredData.length}
                    onChange={onChangePage}
                    className="p-default"
                  />
                </>
              )}
            </div>
            <div className="filter">
              <div className="category">
                <p>Phân loại</p>
                {cateLoad ? (
                  <Skeleton
                    active
                    paragraph={{ rows: 5 }}
                    style={{ marginTop: 5, marginBottom: 20 }}
                  />
                ) : (
                  categories.map((item, index) => {
                    const isChecked = selectedClassifications.includes(item.id)
                    return (
                      <Checkbox
                        checked={isChecked}
                        onChange={onChangeCheckbox}
                        value={item.id}
                        key={`category-${index}`}
                      >
                        {item.value}
                      </Checkbox>
                    )
                  })
                )}
              </div>
              <div className="static-image">
                <img src={require('assets/images/4-static-image.png')} alt="" />
              </div>
              <div className="filter-price">
                <p>Lọc theo giá</p>
                <Slider
                  min={0}
                  max={1000000}
                  step={10000}
                  tooltip={{
                    formatter,
                  }}
                  onChange={onChangeSlider}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                />
                <p>
                  Từ{' '}
                  {`${inputValue.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).split('VND')[0]}đ`}{' '}
                  - 1.000.000 đ
                </p>
              </div>
              <div className="latest-products">
                <p>Món ăn mới nhất</p>
                <div className="sub-product">
                  {dishState.lsDishes.slice(0, 4).map((item, index) => {
                    return (
                      <div className="sub-p-item" key={`sub-p-item-index-${index}`}>
                        <img
                          src={item.image}
                          alt=""
                          onClick={() => {
                            navigate(`/home/menu/dish/${item.dishId}`)
                          }}
                        />
                        <div>
                          <p
                            onClick={() => {
                              navigate(`/home/menu/dish/${item.dishId}`)
                            }}
                          >
                            {item.dishName}
                          </p>
                          <StarRating rating={item.rating} />
                          <p>{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
