export const setHealth = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://studbd.com/api/category_offers/health'
      );
      // console.log(response);

      const resData = await response.json();

      // console.log('from action ' + resData.map((a) => a.review_title));

      dispatch({
        type: 'SET_HEALTH',
        health: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
