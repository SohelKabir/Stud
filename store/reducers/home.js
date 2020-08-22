const initialState = [{}];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_HOME':
      return action.home;

    default:
      return state;
  }
};
