export const setBeauty = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      // console.log(response);

      const resData = await response.json();

      // console.log('from action ' + resData.map((a) => a.review_title));

      dispatch({
        type: 'SET_BEAUTY',
        beauty: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
