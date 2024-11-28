import { Button, Form, Input, Radio, Select, Skeleton, message } from 'antd'
import axios from 'axios'
import { EditableTable } from 'components'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ManageMenuDetail.scss'

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

const ManageAccountDetail = () => {
  // useLocation
  const location = useLocation()
  const initialValues = {
    userId: undefined,
    roleId: undefined,
    nameRole: undefined,
    firstname: undefined,
    lastname: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    address: undefined,
    email: undefined,
    phone: undefined,
    avatar: undefined,
    username: undefined,
    dateCreated: undefined,
    dateUpdated: undefined,
  }
  const [data, setData] = useState(initialValues)
  // const [isLoading, setLoading] = useState(!false);
  // const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [dataForm, setDataForm] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState(() => {
    const savedData = localStorage.getItem('userDataSource')
    return savedData ? JSON.parse(savedData) : []
  })

  //* const togglePanel = async () => {
  //*   try {
  //*     if (!data.tableId) {
  //*       const formData = await form.validateFields()
  //*       const selectedCategory = categories.find((item) => item.categoryId === formData.categoryId)
  //*       setData({
  //*         ...formData,
  //*         categoryName: selectedCategory.name,
  //*         rating: 0,
  //*       })
  //*     }
  //*     setIsVisible(!isVisible)
  //*   } catch (error) {
  //*     console.log('Validation Failed:', error)
  //*   }
  //* }

  const handleAdd = async () => {
    try {
      const formData = await form.validateFields()
      if (dataForm.key === undefined) {
        const newData = {
          key: Math.random().toString(36).substr(2, 9),
          ...formData,
        }
        setDataSource([...dataSource, newData])
        localStorage.setItem('userDataSource', JSON.stringify([...dataSource, newData]))
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
        localStorage.setItem('userDataSource', JSON.stringify([...updatedDataSource]))
        form.resetFields()
      }
    } catch (error) {
      console.log('Validation Failed:', error)
    }
  }

  const handleSubmit = async () => {
    if (data.userId) {
      const loadingMessage = messageApi.open({
        type: 'loading',
        content: 'Đang sửa dữ liệu...',
        duration: 0,
      })

      try {
        const formData = await form.validateFields()
        setData(formData)
        await axios.put(`http://localhost:5000/api/v1/user/${data.userId}`, formData)

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
          await axios.post('http://localhost:5000/api/v1/user', dataSource[i])
        }

        setDataSource([])
        setData(initialValues)
        localStorage.removeItem('userDataSource')

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
    localStorage.setItem('userDataSource', JSON.stringify([...newData]))
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
        const userDetailResponse = await Promise(
          axios.get(`http://localhost:5000/api/v1/user/${pathname[4]}`)
        )

        setData(userDetailResponse.data.data)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (location.state) {
      axios
        .get('http://localhost:5000/api/v1/users')
        .then((response) => {
          // setAreaNames([...new Set(response.data.data.map((item) => item.area))])
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
          .get('http://localhost:5000/api/v1/users')
          .then((response) => {
            // setAreaNames([...new Set(response.data.data.map((item) => item.area))])
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 1000 }}
          size="large"
          initialValues={{
            userId: data.userId,
            nameRole: data.nameRole,
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
            address: data.address,
            email: data.email,
            phone: data.phone,
            username: data.username,
            dateCreated: data.dateCreated,
            dateUpdated: data.dateUpdated,
          }}
        >
          <Form.Item
            label="Họ"
            name="lastname"
            rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
          >
            <Input spellCheck={false} />
          </Form.Item>

          <Form.Item
            label="Tên"
            name="firstname"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input spellCheck={false} />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="nameRole"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Select placeholder="Chọn vai trò">
              <Select.Option value="STAFF">STAFF</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
          >
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input spellCheck={false} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input spellCheck={false} />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input spellCheck={false} />
          </Form.Item>
        </Form>
        <EditableTable
          title="Danh sách người dùng"
          dataIndex="username"
          dataSource={dataSource}
          setDataSource={setDataSource}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      <div className="btn-wrapper">
        {!data.userId && (
          <Button onClick={handleAdd} className="btn-add-row">
            Thêm tạm thời
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="btn-submit"
          disabled={!data.userId && dataSource.length === 0}
        >
          {!data.userId ? 'Thêm người dùng' : 'Cập nhật'}
        </Button>
      </div>
    </div>
  )
}

export default ManageAccountDetail
