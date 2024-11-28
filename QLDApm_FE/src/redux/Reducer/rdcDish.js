import actDish from 'redux/Action/actDish'

const initialState = {
  lsDishes: [],
  loading: true,
  error: null,
  status: false,
}

const rdcDish = (state = initialState, { type, payload }) => {
  switch (type) {
    case actDish.GET_DISHES:
      return {
        ...state,
        loading: true,
        error: null,
        status: true,
      }
    case actDish.SET_DISHES:
      return {
        ...state,
        loading: false,
        lsDishes: payload,
        status: true,
      }
    case actDish.FETCH_DISHES_SUCCESS:
      return {
        ...state,
        loading: false,
        lsDishes: payload,
        status: true,
      }
    case actDish.FETCH_DISHES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        status: true,
      }
    default:
      return state
  }
}

export default rdcDish
