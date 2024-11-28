import { takeEvery, call, put, all } from 'redux-saga/effects'
import axios from 'axios'
import actUser from 'redux/Action/actUser'
import { message } from 'antd'

function* login(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5000/api/v1/login', action.payload)
    if (response.data.status) {
      yield put({ type: actUser.LOGIN_SUCCESS, payload: response.data })
      localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken))
    } else {
      message.error('Tên đăng nhập hoặc mật khẩu không đúng!')
    }
  } catch (error) {
    yield put({ type: actUser.LOGIN_FAILURE, payload: error.message })
  }
}

export function* watchLogin() {
  yield takeEvery(actUser.LOGIN, login)
}

function* signup(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5000/api/v1/user', action.payload)
    if (response.data.status) {
      yield put({ type: actUser.SIGNUP_SUCCESS, payload: response.data })
    } else {
      message.error(response.data.message)
    }
  } catch (error) {
    yield put({ type: actUser.SIGNUP_FAILURE, payload: error.message })
  }
}

export function* watchSignup() {
  yield takeEvery(actUser.SIGNUP, signup)
}

export default function* authSaga() {
  yield all([watchLogin(), watchSignup()])
}
