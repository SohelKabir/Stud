export const setBrandwiseReviews = (brandName) => {
  return async (dispatch, getState) => {
    // getting token from store
    // const token = getState().auth.token;
    //console.log(' from token: ' + token);
    let formData = new FormData();
    formData.append('search', brandName);

    console.log('============inside action========================');
    console.log(brandName);
    console.log('===========inside action=========================');
    try {
      const response = await fetch(`http://studbd.com/api/search`, {
        method: 'POST',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'multipart/form-data;',
        // },
        body: formData,
      });
      // console.log(response);

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: 'SET_BRANDWISE_REVIEWS',
        brandswiseReview: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
