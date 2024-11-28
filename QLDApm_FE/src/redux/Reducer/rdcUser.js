import actUser from 'redux/Action/actUser'

const initialState = {
  data: {},
  role: '',
  loading: true,
  error: null,
  status: false,
}

const rdcUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case actUser.GET_USER:
      return {
        ...state,
        loading: true,
        error: null,
        status: true,
      }
    case actUser.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        status: true,
      }
    case actUser.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        status: true,
      }
    case actUser.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
        status: true,
      }
    case actUser.SIGNUP:
      return {
        ...state,
        loading: true,
        error: null,
        status: true,
      }
    case actUser.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        status: true,
      }
    case actUser.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        status: true,
      }
    case actUser.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        status: true,
      }
    case actUser.SIGNUP_FAILURE:
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

export default rdcUser
