import { combineReducers } from 'redux';
import { reducers as notifications } from './notifications';
// const initialState = {
//   data: '',
//   numOfNotifications: ''
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_DATA':
//       // console.log("state:", state);
//       return { ...state, data: action.payload };
//     case 'SET_NUM_OF_NOTIFICATIONS':
//       // console.log("state in reducer:", state);
//       console.log("payload: ", action.payload);
//       return { ...state, numOfNotifications: action.payload };
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  notifications,
});
export default rootReducer;
