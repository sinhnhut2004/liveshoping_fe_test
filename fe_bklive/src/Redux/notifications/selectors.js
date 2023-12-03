const selectors = {
  takeAll: (state) => {
    console.log('state', state);
    return state.notifications || {};
  },
};

export default selectors;
