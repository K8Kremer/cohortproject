import axios from "axios";
/** using redux thunk method of requesting data instead of a promise */
import { FETCH_STUDENTS, FETCH_PACKAGES, ADD_STUDENT_TO_PACKAGE, FETCH_STUDENT, CREATE_STUDENT } from './types';

const ROOT_URL = 'http://localhost:8000';

export const fetchStudents = (page = 1) => dispatch => {
	axios.get(`${ROOT_URL}/students/`)
	.then( response => {
		dispatch({ type: FETCH_STUDENTS, payload: response.data });
	})
	.catch ( error => {
		console.log(error);
	});
};

export const createStudent = (student) => dispatch => {
	axios.post(`${ROOT_URL}/students/`, { student })
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

//fetch individual package

export const addStudentToPackage = (student) => dispatch => {
	axios.post(`/students`, { student })
	.then( response => {
		dispatch({ type: ADD_STUDENT_TO_PACKAGE, payload: response.data});
	})
	.catch( error => {
		console.log(error);
  });
}
  
export const fetchStudent = (id) => dispatch => {
  axios.get(`${ROOT_URL}/students/${id}`)
  .then( response => {
    console.log(response)
    dispatch({ type: FETCH_STUDENT, payload: response.data});
  })
  .catch ( error => {
    console.log(error);
  })
}

