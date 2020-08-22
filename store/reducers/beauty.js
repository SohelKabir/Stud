const initialState = [{}];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_BEAUTY':
      return action.beauty;

    default:
      return state;
  }
};
