import axios from "axios";
/** using redux thunk method of requesting data instead of a promise */

import { FETCH_STUDENTS, FETCH_PACKAGES, ADD_STUDENT } from './types';

export const fetchStudents = (page = 1) => dispatch => {
	axios.get(``)
	.then( response => {
		dispatch({ type: FETCH_STUDENTS, payload: response.data });
	})
	.catch ( error => {
		console.log(error);
	});
};

export const fetchPackages = () => dispatch => {
	axios.get(``)
	.then( response => {
		dispatch({ type: FETCH_PACKAGES, payload: response.data});
	})
	.catch( error => {
		console.log(error);
	});
};

export const addStudentToPackage = (student) => dispatch => {
	axios.post(``, { student })
	.then( resonse => {
		dispatch({ type: ADD_STUDENT, payload: response.data});
	})
	.catch( error => {
		console.log(error);
	});
};