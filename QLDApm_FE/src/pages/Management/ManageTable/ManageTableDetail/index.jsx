import './ManageMenuDetail.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Form, Input, InputNumber, Select, Radio, Skeleton, message } from 'antd'
import { EditableTable } from 'components'

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

const ManageTableDetail = () => {
  // useLocation
  const location = useLocation()
  const [data, setData] = useState({
    tableId: undefined,
    name: undefined,
    capacity: undefined,
    area: undefined,
    status: undefined,
  })
  const [areaType, setAreaType] = useState('existed') // 'old' or 'new'
  // const [isLoading, setLoading] = useState(!false);
  // const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [dataForm, setDataForm] = useState({})
  const [areaNames, setAreaNames] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState(() => {
    const savedData = localStorage.getItem('tableDataSource')
    return savedData ? JSON.parse(savedData) : []
  })

  const handleAreaTypeChange = (e) => {
    setAreaType(e.target.value)

    // Reset the "area" field value
    form.setFieldsValue({ area: undefined })
  }

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
        localStorage.setItem('tableDataSource', JSON.stringify([...dataSource, newData]))
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
        localStorage.setItem('tableDataSource', JSON.stringify([...updatedDataSource]))
        form.resetFields()
      }
    } catch (error) {
      console.log('Validation Failed:', error)
    }
  }

  const handleSubmit = async () => {
    if (data.tableId) {
      const loadingMessage = messageApi.open({
        type: 'loading',
        content: 'Đang sửa dữ liệu...',
        duration: 0,
      })

      try {
        const formData = await form.validateFields()
        setData(formData)
        await axios.put(`http://localhost:5000/api/v1/table/${data.tableId}`, formData)

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
          await axios.post('http://localhost:5000/api/v1/table', dataSource[i])
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
        localStorage.removeItem('tableDataSource')

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
    localStorage.setItem('tableDataSource', JSON.stringify([...newData]))
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
        const [tablesResponse, tableDetailsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/v1/tables'),
          axios.get(`http://localhost:5000/api/v1/table/${pathname[4]}`),
        ])

        setAreaNames([...new Set(tablesResponse.data.data.map((item) => item.area))])
        setData(tableDetailsResponse.data.data)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (location.state) {
      setAreaNames(location.state.areaNames)
      setLoading(false)
      const { stt, key, ...rest } = location.state.data
      setData(rest)
    } else {
      if (pathname[3] === 'add') {
        axios
          .get('http://localhost:5000/api/v1/tables')
          .then((response) => {
            setAreaNames([...new Set(response.data.data.map((item) => item.area))])
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
            tableId: data.tableId,
            name: data.name,
            capacity: data.capacity,
            area: data.area,
            status: data.status,
          }}
        >
          <Form.Item
            label="Tên bàn ăn"
            name={'name'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên bàn ăn!',
              },
            ]}
          >
            <Input spellCheck={false} />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số lượng!',
              },
            ]}
            name={'capacity'}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>
          <Form.Item label="Khu vực" required className="area-form-fields">
            <Radio.Group onChange={handleAreaTypeChange} value={areaType}>
              <Radio value="existed">Khu vực có sẵn</Radio>
              <Radio value="new">Khu vực mới</Radio>
            </Radio.Group>

            {areaType === 'existed' ? (
              <Form.Item
                name="area"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn khu vực!',
                  },
                ]}
              >
                <Select placeholder="Chọn khu vực có sẵn">
                  {areaNames.map((item) => (
                    <Select.Option value={item} key={item}>
                      <span>{item}</span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item
                name="area"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên khu vực mới!',
                  },
                  {
                    validator: (_, value) => {
                      if (!areaNames.includes(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Tên khu vực đã tồn tại!'))
                    },
                  },
                ]}
              >
                <Input placeholder="Tên khu vực mới" />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn trạng thái!',
              },
            ]}
            name={'status'}
          >
            <Radio.Group>
              <Radio value={true}> Sẵn sàng phục vụ </Radio>
              <Radio value={false}> Tạm ngưng phục vụ </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
        <EditableTable
          title="Tên bàn"
          dataIndex="name"
          dataSource={dataSource}
          setDataSource={setDataSource}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
      <div className="btn-wrapper">
        {!data.tableId && (
          <Button onClick={handleAdd} className="btn-add-row">
            Thêm tạm thời
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="btn-submit"
          disabled={!data.tableId && dataSource.length === 0}
        >
          {!data.tableId ? 'Thêm toàn bộ' : 'Sửa'}
        </Button>
      </div>
    </div>
  )
}

export default ManageTableDetail
