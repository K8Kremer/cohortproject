import { FETCH_PACKAGE, EDIT_PACKAGE } from '../actions/types';

export default function (state = {}, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PACKAGE:
      return action.payload;
    case EDIT_PACKAGE:
      return action.payload;
    default:
      return state;
  }
}