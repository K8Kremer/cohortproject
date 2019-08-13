import axios from "axios";
/** using redux thunk method of requesting data instead of a promise */

import { FETCH_STUDENTS, FETCH_PACKAGES, ADD_STUDENT, CREATE_STUDENT, ADD_STUDENT_TO_PACKAGE } from './types';

export const fetchStudents = (page = 1) => dispatch => {
	axios.get(`/students`)
	.then( response => {
		dispatch({ type: FETCH_STUDENTS, payload: response.data });
	})
	.catch ( error => {
		console.log(error);
	});
};

export const createStudent = (student) => dispatch => {
	axios.post(`/students/`, { student })
	.then( response => {
		dispatch({ type: CREATE_STUDENT, payload: response.data});
	})
	.catch ( error => {
		console.log(error);
	})
}

export const fetchPackages = () => dispatch => {
	axios.get(`/packages`)
	.then( response => {
		dispatch({ type: FETCH_PACKAGES, payload: response.data});
	})
	.catch( error => {
		console.log(error);
	});
};

export const addStudentToPackage = (student) => dispatch => {
	axios.post(`/students`, { student })
	.then( response => {
		dispatch({ type: ADD_STUDENT_TO_PACKAGE, payload: response.data});
	})
	.catch( error => {
		console.log(error);
	});
};