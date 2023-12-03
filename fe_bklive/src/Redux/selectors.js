import { selectors as notifications } from './notifications';
const selectors = {
  notifications,
};

const selectorsCombined = {
  ...Object.entries(selectors || {}).reduce(
    (combine, [node, selectors]) => ({
      ...combine,
      ...Object.entries(selectors || {}).reduce(
        (combine, [name, func]) => ({
          ...combine,
          [name]: (state, ...args) => func(state[node], ...args),
        }),
        {}
      ),
    }),
    {}
  ),
};
export default selectorsCombined;
