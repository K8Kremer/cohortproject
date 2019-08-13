import { combineReducers } from "redux";
// import { reducer as FormReducer } from "redux-form";
import StudentsReducer from "./students-reducer";
import PackagesReducer from "./packages-reducer";
import CurrentStudentReducer from "./current_student-reducer";

const rootReducer = combineReducers({
  students: StudentsReducer,
  current_student: CurrentStudentReducer,
	packages: PackagesReducer,
	// form: FormReducer
});

export default rootReducer;