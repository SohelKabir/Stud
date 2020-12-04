const initialState = [{}];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_PURCHASES':
      return action.purchases;

    default:
      return state;
  }
};
