import { actions as notifications } from './notifications';
////////////
export const setData = (data) => (
  console.log('xxx', data),
  {
    type: 'SET_DATA',
    payload: data,
  }
);

export const setNumOfNotifications = (numOfNotifications) =>
  // console.log("numOfNotifications in action", numOfNotifications),
  ({
    type: 'SET_NUM_OF_NOTIFICATIONS',
    payload: numOfNotifications,
  });

const actions = {
  notifications,
};
//////////
export default Object.entries(actions || {}).reduce(
  (combine, [node, types]) => ({
    ...combine,
    [node]: types,
  }),
  {}
);
