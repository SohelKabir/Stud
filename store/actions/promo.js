export const setPromo = () => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log('=============tok=======================');
    console.log(state.auth.token);
    console.log('==============tok======================');
    const token = state.auth.token;
    try {
      const response = await fetch(
        'http://studbd.com/api/appGeneratePromocode',
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            Token: token,
            //'Content-Type': 'application/json',
            // Accept: 'application/json',
          },
        }
      );

      const resData = await response.json();

      console.log('=============promoRes=======================');
      console.log(resData);
      console.log('========promoRes============================');

      dispatch({
        type: 'SET_PROMO',
        promo: resData.promocode,
      });
    } catch (error) {
      throw error;
    }
  };
};
