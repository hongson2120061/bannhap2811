import actDish from 'redux/Action/actDish'

export const mapStateToProps = (globalState) => {
  return {
    dishState: globalState.dishManage,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    GetDishes: () => {
      dispatch({
        type: actDish.GET_DISHES,
      })
    },
  }
}
