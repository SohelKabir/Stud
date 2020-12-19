export const setBrandwiseOffer = (brandName) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://studbd.com/api/brand_offer/${brandName}`
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
