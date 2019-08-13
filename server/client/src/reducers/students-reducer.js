import { ADD_STUDENT, FETCH_STUDENTS } from "../actions/types";
export default function(state = [], actions) {
	switch (actions.type) {
		case ADD_STUDENT:
			return {...state};
		case FETCH_STUDENTS:
			return {...state};
		default: 
			return state;
	}
}