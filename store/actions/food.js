export const setFood = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://studbd.com/api/category_offers/Food'
      );

      const resData = await response.json();

      dispatch({
        type: 'SET_FOOD',
        food: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
