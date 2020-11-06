const initialState = [{}];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_BRANDS':
      // console.log('from reducer: ' + action.blogs);

      return action.brands;

    default:
      return state;
  }
};
