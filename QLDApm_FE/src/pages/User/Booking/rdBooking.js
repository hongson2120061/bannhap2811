import actOrder from 'redux/Action/actOrder'

export const mapStateToProps = (globalState) => {
  return {
    orderState: globalState.orderManage,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    GetReservations: (startDate, endDate) => {
      dispatch({
        type: actOrder.GET_RESERVATION,
        payload: {
          startDate: startDate,
          endDate: endDate,
        },
      })
    },
    GetTables: () => {
      dispatch({
        type: actOrder.GET_TABLE,
      })
    },
  }
}
