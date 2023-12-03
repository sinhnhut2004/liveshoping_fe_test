import * as types from './types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS:
      console.log('action.payload.data', action.payload.data);
      return {
        notifications: action.payload.data,
      };

    case types.REMOVE_NOTICE:
      const id = action.payload.data;
      console.log('asdasd', state);
      const newUnreadNotifications = state.notifications.unread?.filter(
        (item) => item.id !== id
      );
      console.log('id', newUnreadNotifications);
      const totalUnread = state.notifications.totalUnread - 1;

      return {
        ...state,
        notifications: {
          ...state.notifications,
          unread: [...newUnreadNotifications],
          totalUnread,
        },
      };
    default:
      return state;
  }
};

export default reducer;
