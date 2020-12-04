export const setPurchases = () => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log('=============tok=======================');
    console.log(state.auth.token);
    console.log('==============tok======================');
    const token = state.auth.token;
    try {
      const response = await fetch('http://studbd.com/api/appPurchaseHistory', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          Token: token,
          //'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const resData = await response.json();

      dispatch({
        type: 'SET_PURCHASES',
        purchases: resData.purchase_info.purchase_history,
      });
    } catch (error) {
      throw error;
    }
  };
};
