import { types as notifications } from './notifications';
const types = {
  notifications,
};

export default Object.entries(types || {}).reduce(
  (combine, [node, types]) => ({
    ...combine,
    [node]: types,
  }),
  {}
);
