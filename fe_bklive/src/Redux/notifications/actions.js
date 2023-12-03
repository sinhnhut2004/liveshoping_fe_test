import * as types from './types';

export const getNotifications = (notifications) => ({
  type: types.GET_NOTIFICATIONS,
  payload: { data: notifications },
});
export const removeNotifications = (id) => ({
  type: types.REMOVE_NOTICE,
  payload: { data: id },
});
