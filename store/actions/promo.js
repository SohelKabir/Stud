export const setPromo = () => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log('=============tok=======================');
    console.log(state.auth.token);
    console.log('==============tok======================');
    let token = state.auth.token;

    let formData = new FormData();
    formData.append('Token', token);
    try {
      const response = await fetch(
        'http://studbd.com/api/appPostGeneratePromocode',
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          // headers: {
          //   Token: token,
          //   // 'Content-Type': 'application/json',
          //   // Accept: 'application/json',
          // },
          body: formData,
        }
      );

      // axios
      //   .get('http://studbd.com/api/appGeneratePromocode', {
      //     headers: {
      //       Token: token,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      console.log('=============promoRes=======================');
      console.log(response);
      console.log('========promoRes============================');

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
