import actOrder from 'redux/Action/actOrder'

const initialState = {
  data: {},
  reservation: {},
  table: {},
  loading: true,
  error: null,
  r_status: false,
}

const rdcOrder = (state = initialState, { type, payload }) => {
  switch (type) {
    case actOrder.GET_RESERVATION:
      return {
        ...state,
        r_status: true,
      }
    case actOrder.GET_RESERVATION_SUCCESS:
      return {
        ...state,
        reservation: payload,
        r_status: true,
      }
    case actOrder.GET_RESERVATION_FAILURE:
      return {
        ...state,
        error: payload,
        r_status: true,
      }
    case actOrder.GET_TABLE:
      return {
        ...state,
      }
    case actOrder.GET_TABLE_SUCCESS:
      return {
        ...state,
        table: payload,
      }
    case actOrder.GET_TABLE_FAILURE:
      return {
        ...state,
        error: payload,
      }
    case actOrder.SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case actOrder.SET_LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case actOrder.SET_LOADING_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export default rdcOrder
