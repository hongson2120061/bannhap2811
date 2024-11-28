import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rdcUser from './Reducer/rdcUser'
import rdcDish from './Reducer/rdcDish'
import rdcOrder from './Reducer/rdcOrder'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const globalState = combineReducers({
  userManage: rdcUser,
  dishManage: rdcDish,
  orderManage: rdcOrder,
})

const store = createStore(globalState, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
