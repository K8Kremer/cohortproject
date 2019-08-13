import { ADD_STUDENT_TO_PACKAGE, FETCH_STUDENTS } from "../actions/types";
export default function(state = [], actions) {
	switch (actions.type) {
		case ADD_STUDENT_TO_PACKAGE:
			return {...state};
		case FETCH_STUDENTS:
			return {...state};
		default: 
			return state;
	}
}