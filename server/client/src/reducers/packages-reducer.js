import { FETCH_PACKAGES } from '../actions/types';

export default function (state = [], action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PACKAGES:
      return action.payload;
    default:
      return state;
  }
}