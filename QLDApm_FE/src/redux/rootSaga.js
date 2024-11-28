import { all } from 'redux-saga/effects'
import globalSaga from 'pages/Global/globalSaga'
import authSaga from 'pages/Auth/authSaga'
import userSaga from 'components/Common/ProtectedRoute/userSaga'
import orderSaga from 'pages/User/orderSaga'

export default function* rootSaga() {
  yield all([globalSaga(), authSaga(), userSaga(), orderSaga()])
}
