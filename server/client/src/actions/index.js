import axios from "axios";
/** using redux thunk method of requesting data instead of a promise */
import { FETCH_STUDENTS, FETCH_PACKAGES, ADD_STUDENT_TO_PACKAGE,
				 FETCH_STUDENT, CREATE_STUDENT, EDIT_STUDENT,
				 FETCH_PACKAGE, CREATE_PACKAGE, EDIT_PACKAGE } from './types';

const ROOT_URL = 'http://localhost:8000';

export const fetchStudents = (page = 1) => dispatch => {
	axios.get(`/students/`)
	.then( response => {
		dispatch({ type: FETCH_STUDENTS, payload: response.data });
	})
	.catch ( error => {
		console.log(error);
	});
};

export const createStudent = (student) => dispatch => {
  axios.post(`/students/`, { ...student })
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

export const addStudentToPackage = (id, student) => dispatch => {
	console.log(`${id}`, student);
	axios.post(`/packages/${id}`, {...student})
	.then( response => {
		dispatch({ type: ADD_STUDENT_TO_PACKAGE, payload: response.data});
		console.log(response.data)
	})
	.catch( error => {
		console.log(error);
  });
}
  
export const fetchStudent = (id) => dispatch => {
  axios.get(`/students/${id}`)
  .then( response => {
    dispatch({ type: FETCH_STUDENT, payload: response.data});
  })
  .catch ( error => {
    console.log(error);
  })
}

export const editStudent = (id, studentUpdates) => dispatch => {
  console.log(`${id}`, studentUpdates);
  axios.post(`/students/${id}`, {...studentUpdates})
	.then( response => {
		dispatch({ type: EDIT_STUDENT, payload: response.data});
	})
	.catch( error => {
		console.log(error);
	})
}

export const fetchPackage = (id) => dispatch => {
	axios.get(`/packages/${id}`)
		.then(response => {
			dispatch({ type: FETCH_PACKAGE, payload: response.data });
		})
		.catch(error => {
			console.log(error);
		})
}

export const createPackage = (newPackage) => dispatch => {
  axios.post(`/packages/`, { ...newPackage })
		.then(response => {
			dispatch({ type: CREATE_PACKAGE, payload: response.data });
		})
		.catch(error => {
			console.log(error);
		})
}

export const editPackage = (id, updates) => dispatch => {
	axios.post(`/packages/${id}`, {students : updates})
		.then(response => {
			dispatch({ type: EDIT_PACKAGE, payload: response.data });
		})
		.catch(error => {
			console.log(error);
		})
}

