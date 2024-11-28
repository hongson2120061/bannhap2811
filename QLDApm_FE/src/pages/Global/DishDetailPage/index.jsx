import './DishDetailPage.scss'
import axios from 'axios'
import { Skeleton } from 'antd'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { mapDispatchToProps, mapStateToProps } from './rdDishDetail'
import { DishDetail } from 'components'

function DishDetailPage(props) {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { GetDishes, dishState } = props

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/dish/${id}`)
      .then((response) => {
        setData(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [id])

  useEffect(() => {
    if (!dishState.status) {
      GetDishes()
    }
  }, [GetDishes, dishState.status])

  return (
    <>
      {dishState.loading || isLoading ? (
        <Skeleton
          active
          style={{
            marginTop: '40px',
            marginBottom: '40px',
          }}
          paragraph={{ rows: 10 }}
        />
      ) : (
        <div className="DishDetailPage">
          <DishDetail data={data} dishState={dishState} type={'view'} />
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetailPage)
