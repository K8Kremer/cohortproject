import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import StudentsReducer from "./students-reducer";
import PackagesReducer from "./packages-reducer";
import CurrentStudentReducer from "./current_student-reducer";
import CurrentPackageReducer from "./current_package-reducer";
import UpdateSearchReducer from "./update_search_reducer"

const rootReducer = combineReducers({
  students: StudentsReducer,
  current_student: CurrentStudentReducer,
  packages: PackagesReducer,
  current_package: CurrentPackageReducer,
  form: FormReducer,
  updateSearchFlag : UpdateSearchReducer
});

export default rootReducer;