import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import loading from "./reducers/loading";
import company from "./reducers/company";
import employees from "./reducers/employees";
import profileChanged from "./reducers/prfileChanged";


export default configureStore({
  reducer: { user, loading, company, employees, profileChanged },
})