export const setBrands = () => {
  return async (dispatch, getState) => {
    // getting token from store
    // const token = getState().auth.token;
    //console.log(' from token: ' + token);
    try {
      const response = await fetch('http://studbd.com/api/all_brands');
      // console.log(response);

      const resData = await response.json();

      // console.log('from action ' + resData.map((a) => a.review_title));

      dispatch({
        type: 'SET_BRANDS',
        brands: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
