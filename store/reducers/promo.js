const initialState = '';

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_PROMO':
      return action.promo;

    default:
      return state;
  }
};
