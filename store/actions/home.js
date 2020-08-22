export const setHome = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://studbd.com/api/home_offers');
      // console.log(response);

      const resData = await response.json();

      // console.log('from action ' + resData.map((a) => a.review_title));

      dispatch({
        type: 'SET_HOME',
        home: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
