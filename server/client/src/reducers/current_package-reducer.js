import { FETCH_PACKAGE, CREATE_PACKAGE, EDIT_PACKAGE, EMPTY_PACKAGE_FILTER } from '../actions/types';

export default function (state = {}, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PACKAGE:
      return action.payload;
    case EDIT_PACKAGE:
      return action.payload;
    case CREATE_PACKAGE:
      return action.payload;
    case EMPTY_PACKAGE_FILTER:
      return action.payload;
    default:
      return state;
  }
}