import actUser from '../../../redux/Action/actUser'

export const mapStateToProps = (globalState) => {
  return {
    userState: globalState.userManage,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    GetUser: (userId) => {
      dispatch({ type: actUser.GET_USER, payload: userId })
    },
  }
}
