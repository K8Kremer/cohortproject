import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import StudentsReducer from "./students-reducer";
import PackagesReducer from "./packages-reducer";

const rootReducer = combineReducers({
	students: StudentsReducer,
	packages: PackagesReducer,
	form: FormReducer
});

export default rootReducer;