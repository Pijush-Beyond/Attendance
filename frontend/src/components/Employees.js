import React  from 'react';
import {  useSelector } from 'react-redux';
import defaultUser from '../public/user.svg'
// import { selectemployee } from "../utilities/ReduxStore/reducers/employee";
import { useMediaQuery } from "react-responsive";

// import { IdContext } from "./Home";

export default function Employees({ _id, set_id }) {
  const superUser = useSelector(state => state.user.data.superUser);
  
  const employees = useSelector(state => state.employees);
  // const { _id, set_id } = useContext(IdContext);
  // const [selectedEmployeeId, setSelectedEmployeeId] = useState(-1);
  // const dispatch = useDispatch();
  const mobile = useMediaQuery({maxWidth: 576});
  
  if (!superUser) return null;
  else  return (
    <section className={`d-flex flex-column bg-light ${mobile?'h-50 w-100':'h-100 w-25'} overflow-scroll`} style={{overFlowY: 'auto'}}>
      {
        employees.map(employee => 
          <button onClick={() => { set_id(employee._id)/*; dispatch(selectemployee(employee)) */ }} className={`btn btn-block rounded-0 d-flex btn-custom ${_id === employee._id?'active':employee.active?'btn-outline-primary':''} align-items-center`} key={employee._id} disabled={!employee.active || _id===employee._id}>
            {employee.profile ? 
              <>
                <img src={employee.profile.dp || defaultUser} alt="employee" className="rounded-circle me-2 img" style={{ width: mobile ? '6vw' : 25, height: mobile ? '6vw' : 25 }}/>
                <span>{`${employee.profile.firstName} ${employee.profile.lastName}`}</span>
              </>
              :
              <>
                <img src={defaultUser} alt="employee" className="rounded-circle me-2 img" style={{ width: mobile ? '6vw' : 25, height: mobile ? '6vw' : 25 }}/>
                <span>{employee.email}</span>
              </>
            }
          </button>
        )
      }
    </section>
  )
}
