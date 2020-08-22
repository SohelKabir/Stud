const initialState = [{}];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_HEALTH':
      // console.log('from reducer: ' + action.blogs);

      return action.health;

    default:
      return state;
  }
};
