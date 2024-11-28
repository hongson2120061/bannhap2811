import actUser from '../../../redux/Action/actUser'

export const mapStateToProps = (globalState) => {
  return {
    userState: globalState.userManage,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    Login: (credentials) => {
      dispatch({ type: actUser.LOGIN, payload: credentials })
    },
  }
}
