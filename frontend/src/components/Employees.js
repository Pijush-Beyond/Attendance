import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultUser from '../public/user.svg'
import { selectemployee } from "../utilities/ReduxStore/reducers/employee";
import { useMediaQuery } from "react-responsive";

export default function Employees() {
  const superUser = useSelector(state => state.user.data.superUser);
  
  const employees = useSelector(state => state.employees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(-1);
  const dispatch = useDispatch();
  const mobile = useMediaQuery({maxWidth: 576});
  
  if (!superUser) return;
  else  return (
    <section className={`d-flex flex-column ${mobile?'h-50':'h-100'}`}>
      {
        employees.map(employee => 
          <button onClick={() => { setSelectedEmployeeId(employee._id); dispatch(selectemployee(employee)) }} className={`btn btn-block rounded-0 d-flex ${selectedEmployeeId === employee._id?'active':''}`} key={employee._id} disabled={!employee.active || selectedEmployeeId===employee._id}>
            <img src={employee.profile.dp || defaultUser} alt="employee" className="rounded-circle me-2 img" style={{ width: mobile ? '15vw' : 60, height: mobile ? '15vw' : 60 }}/>
            <span>{`${employee.profile.firstName} ${employee.profile.lastName}`}</span>
          </button>
        )
      }
    </section>
  )
}
