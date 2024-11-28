import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import actOrder from 'redux/Action/actOrder'

function* fetchReservations(action) {
  const accessToken = localStorage.getItem('accessToken')
  try {
    const response = yield call(
      axios.post,
      'http://localhost:5000/api/v1/reservation/date-range',
      {
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      },
      {
        headers: {
          Authorization: `bearer ${accessToken.replace(/"/g, '')}`,
        },
      }
    )
    // const response = yield call(axios.post, 'http://localhost:5000/api/v1/reservation',
    //     {
    //         tableId: "20241028462CiJNY3V",
    //         numberOfGuests: 2,
    //         specialRequests: "nonedsadsadsadsa",
    //         status: "active"
    //     },
    //     {
    //         headers: {
    //             Authorization: `bearer ${accessToken.replace(/"/g, '')}`,
    //         },
    //     }
    // )
    yield put({
      type: actOrder.GET_RESERVATION_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    yield put({ type: actOrder.GET_RESERVATION_FAILURE, payload: error.message })
  }
}

function* fetchTables() {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/api/v1/tables')
    yield put({
      type: actOrder.GET_TABLE_SUCCESS,
      payload: response.data.data,
    })
  } catch (error) {
    yield put({ type: actOrder.GET_TABLE_FAILURE, payload: error.message })
  }
}

function* setLoading() {
  try {
    yield put({
      type: actOrder.SET_LOADING_SUCCESS,
    })
  } catch (error) {
    yield put({ type: actOrder.SET_LOADING_FAILURE, payload: error.message })
  }
}

function* handleGetReservationsAndTables(action) {
  yield call(fetchReservations, action)

  yield call(fetchTables)

  yield call(setLoading)
}

export function* watchFetchReservationsAndTables() {
  yield takeEvery(actOrder.GET_RESERVATION, handleGetReservationsAndTables)
}

export default function* orderSaga() {
  yield watchFetchReservationsAndTables()
}
