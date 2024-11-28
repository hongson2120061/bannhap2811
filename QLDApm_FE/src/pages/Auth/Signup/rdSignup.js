import actUser from '../../../redux/Action/actUser'

export const mapStateToProps = (globalState) => {
  return {
    userState: globalState.userManage,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    Signup: (credentials) => {
      dispatch({ type: actUser.SIGNUP, payload: credentials })
    },
  }
}
