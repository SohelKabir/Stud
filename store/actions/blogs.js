export const setBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://studbd.com/api/blogs');
      // console.log(response);

      const resData = await response.json();

      // console.log('from action ' + resData.map((a) => a.review_title));

      dispatch({
        type: 'SET_BLOGS',
        blogs: resData,
      });
    } catch (error) {
      throw error;
    }
  };
};
