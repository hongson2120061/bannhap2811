import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
import actDish from 'redux/Action/actDish'

function* fetchDishes() {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/api/v1/dishes')
    yield put({
      type: actDish.FETCH_DISHES_SUCCESS,
      payload: response.data.data.reverse(),
    })
  } catch (error) {
    yield put({ type: actDish.FETCH_DISHES_FAILURE, payload: error.message })
  }
}

export function* watchFetchDishes() {
  yield takeEvery(actDish.GET_DISHES, fetchDishes)
}

export default function* globalSaga() {
  yield watchFetchDishes()
}
