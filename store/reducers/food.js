const initialState = [{}];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_FOOD':
      return action.food;

    default:
      return state;
  }
};
