import { FETCH_PACKAGE, CREATE_PACKAGE } from '../actions/types';

export default function (state = {}, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PACKAGE:
      return action.payload;
    case CREATE_PACKAGE:
      return action.payload;
    default:
      return state;
  }
}