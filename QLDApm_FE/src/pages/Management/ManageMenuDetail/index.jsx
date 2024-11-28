import './ManageMenuDetail.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DishDetail } from 'components'
import {
  PlusOutlined,
  // LoadingOutlined
} from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, Upload, Radio, Skeleton, message } from 'antd'
import { EditableTable } from 'components'
const { TextArea } = Input

// const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// };

// const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//         message.error('Chỉ có thể upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//         message.error('Hình ảnh phải có dung lượng <= 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
// };

const ManageMenuDetail = () => {
  // useLocation
  const location = useLocation()
  const [data, setData] = useState({
    categoryName: '',
    dishName: '',
    description: '',
    price: 0,
    image: '',
    available: true,
    rating: 0,
    classify: 'starter',
  })
  const [isVisible, setIsVisible] = useState(false)
  // const [isLoading, setLoading] = useState(!false);
  // const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [dataForm, setDataForm] = useState({})
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState(() => {
    const savedData = localStorage.getItem('menuDataSource')
    return savedData ? JSON.parse(savedData) : []
  })

  const togglePanel = async () => {
    try {
      if (!data.dishId) {
        const formData = await form.validateFields()
        const selectedCategory = categories.find((item) => item.categoryId === formData.categoryId)
        setData({
          ...formData,
          categoryName: selectedCategory.name,
          rating: 0,
        })
      }
      setIsVisible(!isVisible)
    } catch (error) {
      console.log('Validation Failed:', error)
    }
  }

  const handleAdd = async () => {
    try {
      const formData = await form.validateFields()

      if (dataForm.key === undefined) {
        const newData = {
          key: Math.random().toString(36).substr(2, 9),
          ...formData,
        }

        setDataSource([...dataSource, newData])
        localStorage.setItem('menuDataSource', JSON.stringify([...dataSource, newData]))
        form.resetFields()
      } else {
        const updatedData = {
          key: dataForm.key,
          ...formData,
        }

        const updatedDataSource = dataSource.map((item) =>
          item.key === updatedData.key ? updatedData : item
        )

        setDataSource(updatedDataSource)
        setDataForm({})
        localStorage.setItem('menuDataSource', JSON.stringify([...updatedDataSource]))
        form.resetFields()
      }
    } catch (error) {
      console.log('Validation Failed:', error)
    }
  }

  const handleSubmit = async () => {
    if (data.dishId) {
      const loadingMessage = messageApi.open({
        type: 'loading',
        content: 'Đang sửa dữ liệu...',
        duration: 0,
      })

      try {
        const formData = await form.validateFields()
        const { image, dishName, ...rest } = formData

        setData({
          ...data,
          dishName: formData.dishName,
          available: formData.available,
          classify: formData.classify,
          categoryId: formData.categoryId,
          price: formData.price,
          description: formData.description,
        })
        await axios.put(`http://localhost:5000/api/v1/dish/${data.dishId}`, {
          ...rest,
          name: formData.dishName,
          rating: data.rating,
        })

        loadingMessage()
        messageApi.open({
          type: 'success',
          content: 'Sửa dữ liệu thành công!',
          duration: 2,
        })
      } catch (error) {
        console.error('Error:', error)

        loadingMessage()
        messageApi.open({
          type: 'error',
          content: 'Có lỗi xảy ra khi sửa dữ liệu!',
          duration: 2,
        })
      } finally {
        setTimeout(messageApi.destroy, 2000)
      }
    } else {
      const loadingMessage = messageApi.open({
        type: 'loading',
        content: 'Đang thêm dữ liệu...',
        duration: 0,
      })

      try {
        for (let i = 0; i < dataSource.length; i++) {
          const { key, image, dishName, ...rest } = dataSource[i]
          const pushedData = {
            ...rest,
            name: dishName,
            image: '',
            rating: 0,
          }
          console.log(pushedData)
          const accessToken = localStorage.getItem('accessToken')
          await axios.post('http://localhost:5000/api/v1/dish', pushedData, {
            headers: {
              Authorization: `bearer ${accessToken.replace(/"/g, '')}`,
            },
          })
        }

        setDataSource([])
        setData({
          categoryName: '',
          dishName: '',
          description: '',
          price: 0,
          image: '',
          available: true,
          rating: 0,
          classify: 'starter',
        })
        localStorage.removeItem('menuDataSource')

        loadingMessage()
        messageApi.open({
          type: 'success',
          content: 'Thêm dữ liệu thành công!',
          duration: 2,
        })
      } catch (error) {
        console.error('Error:', error)

        loadingMessage()
        messageApi.open({
          type: 'error',
          content: 'Có lỗi xảy ra khi thêm dữ liệu!',
          duration: 2,
        })
      } finally {
        setTimeout(messageApi.destroy, 2000)
      }
    }
  }

  const handleEdit = (e) => {
    const dataFormApi = e
    setDataForm(dataFormApi)
    form.setFieldsValue(dataFormApi)
  }

  const handleDelete = (e) => {
    const newData = [...dataSource].filter((item) => item.key !== e.key)
    setDataSource(newData)
    localStorage.setItem('menuDataSource', JSON.stringify([...newData]))
  }

  // const uploadButton = (
  //     <button
  //         style={{
  //             border: 0,
  //             background: 'none',
  //         }}
  //         type="button"
  //     >
  //         {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
  //         <div
  //             style={{
  //                 marginTop: 8,
  //             }}
  //         >
  //             Upload
  //         </div>
  //     </button>
  // );

  // const handleChange = (info) => {
  //     if (info.file.status === 'uploading') {
  //         setLoading(true);
  //         return;
  //     }
  //     if (info.file.status === 'done') {
  //         // Get this url from response in real world.
  //         getBase64(info.file.originFileObj, (url) => {
  //             setLoading(false);
  //             setImageUrl(url);
  //         });
  //     }
  // };

  useEffect(() => {
    const pathname = location.pathname.split('/')
    const fetchData = async () => {
      try {
        const [categoriesResponse, dishResponse] = await Promise.all([
          axios.get('http://localhost:5000/v1/categories'),
          axios.get(`http://localhost:5000/v1/dish/${pathname[4]}`),
        ])

        setCategories(categoriesResponse.data.data)
        setData(dishResponse.data.data)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (location.state) {
      axios
        .get('http://localhost:5000/api/v1/categories')
        .then((response) => {
          setCategories(response.data.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error(error.message)
        })

      const { stt, key, ...rest } = location.state.data
      setData(rest)
    } else {
      if (pathname[3] === 'add') {
        axios
          .get('http://localhost:5000/api/v1/categories')
          .then((response) => {
            setCategories(response.data.data)
            setLoading(false)
          })
          .catch((error) => {
            console.error(error.message)
          })
      } else {
        fetchData()
      }
    }
    return () => {}
  }, [location])

  return isLoading ? (
    <Skeleton
      active
      style={{
        marginTop: '40px',
        marginBottom: '40px',
      }}
      paragraph={{ rows: 20 }}
    />
  ) : (
    <div className="ManageMenuDetail">
      {contextHolder}
      <div className="left-panel">
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
          size="large"
          initialValues={{
            dishName: data.dishName,
            available: data.available,
            classify: data.classify,
            categoryId: data.categoryId ? data.categoryId : categories[0].categoryId,
            price: data.price,
            description: data.description,
          }}
        >
          <Form.Item
            label="Tên món ăn"
            name={'dishName'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên món ăn!',
              },
            ]}
          >
            <Input spellCheck={false} />
          </Form.Item>
          <Form.Item label="Trạng thái" name={'available'}>
            <Radio.Group>
              <Radio value={true}> Sẵn sàng phục vụ </Radio>
              <Radio value={false}> Tạm ngưng phục vụ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Loại bữa ăn" name={'classify'}>
            <Select>
              <Select.Option value="starter">Starter</Select.Option>
              <Select.Option value="main">Main Course</Select.Option>
              <Select.Option value="dessert">Dessert</Select.Option>
              <Select.Option value="drinks">Drinks</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Phân loại" name={'categoryId'}>
            <Select>
              {categories.map((item, index) => {
                return (
                  <Select.Option value={item.categoryId} key={`option-category-${index}`}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Giá" name={'price'}>
            <InputNumber
              min={0}
              step={1000}
              onChange={(value) => form.setFieldsValue({ price: value })}
              style={{ width: '40%' }}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả món ăn"
            name={'description'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mô tả món ăn!',
              },
            ]}
          >
            <TextArea rows={5} spellCheck={false} style={{ textAlign: 'justify' }} />
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList" name={'image'}>
            {/* <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://mockapi.io/api/upload"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload> */}
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
        <EditableTable
          dataSource={dataSource}
          setDataSource={setDataSource}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <div className={`right-panel ${isVisible ? 'visible' : 'hidden'}`}>
        <div>
          <DishDetail data={data} type={'management'} />
        </div>
      </div>
      <div className="btn-wrapper">
        <Button className="toggle-button" onClick={togglePanel} type="primary">
          {isVisible ? 'Hide' : 'Review'}
        </Button>
        {!isVisible && (
          <>
            {!data.dishId && (
              <Button onClick={handleAdd} className="btn-add-row">
                Thêm tạm thời
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              className="btn-submit"
              disabled={!data.dishId && dataSource.length === 0}
            >
              {!data.dishId ? 'Thêm toàn bộ' : 'Sửa'}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ManageMenuDetail
