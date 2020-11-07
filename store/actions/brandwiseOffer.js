export const setBrandwiseOffer = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://studbd.com/api/category_offers/Food'
      );

      const resData = await response.json();

      dispatch({
        type: 'SET_BRANDWISE_OFFER',
        brandwiseOffer: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
