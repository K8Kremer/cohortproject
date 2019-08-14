import { FETCH_STUDENT, CREATE_STUDENT, EDIT_STUDENT } from '../actions/types';

export default function (state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch (action.type){
    case FETCH_STUDENT:
      return action.payload;
    case CREATE_STUDENT:
      return action.payload;
    case EDIT_STUDENT:
      return action.payload
    default:
      return state;
  }
}