const initialState = [];

export default (state = initialState, action) => {
  //console.log(action);

  switch (action.type) {
    case 'SET_BLOGS':
      // console.log('from reducer: ' + action.blogs);

      return action.blogs;

    default:
      return state;
  }
};
