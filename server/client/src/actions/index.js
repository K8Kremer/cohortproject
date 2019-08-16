import axios from "axios";
/** using redux thunk method of requesting data instead of a promise */
import { EMPTY_PACKAGE_FILTER, FETCH_STUDENTS, FETCH_PACKAGES, FETCH_STUDENT, CREATE_STUDENT, EDIT_STUDENT,
				 FETCH_PACKAGE, CREATE_PACKAGE, EDIT_PACKAGE, UPDATE_SEARCH } from './types';

const ROOT_URL = 'http://localhost:8000';

export const fetchStudents = (page = 1, fullName = '', cohort = null) => dispatch => {
	axios.get(`/students/`, {
		params: {
			fullName,
			cohort
		}
	})
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

export const fetchPackages = (employerName = '', seenByEmployer = null) => dispatch => {
	axios.get(`/packages/`, {
		params: {
			employerName,
			seenByEmployer
		}
	})
	.then( response => {
		dispatch({ type: FETCH_PACKAGES, payload: response.data});
	})
	.catch( error => {
		console.log(error);
	});
};

//fetch individual package

  
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
		dispatch({ type: EDIT_STUDENT, payload: response.data})
	})
	.catch( error => {
		console.log(error);
	})
}

export const fetchPackage = (id) => dispatch => {
	axios.get(`/packages/${id}`
		)
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
	axios.post(`/packages/${id}`, updates)
		.then(response => {
			dispatch({ type: EDIT_PACKAGE, payload: response.data });
		})
		.catch(error => {
			console.log(error);
		})
}

export const updateSearch = (update) => dispatch => {
	dispatch({ type: UPDATE_SEARCH, payload: update})
}

export const emptyPackageFilter = (update) => dispatch => {
	dispatch({ type: EMPTY_PACKAGE_FILTER, payload: update})
}