import { FETCH_STUDENT } from '../actions/types';

export default function (state = {}, action){
  if(action.error){
    return (action.error);
  }
  switch (action.type){
    case FETCH_STUDENT:
      return action.payload;
    default:
      return state;
  }
}