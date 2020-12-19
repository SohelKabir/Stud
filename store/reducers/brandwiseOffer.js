const initialState = [];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_BRANDWISE_OFFER':
      return action.brandwiseOffer;

    default:
      return state;
  }
};
