import React from 'react'
import { useSelector } from 'react-redux';
import defaultDp from "../public/user.svg";
import { Calendar } from "react-calendar";

import 'react-calendar/dist/Calendar.css';


export default function Details({ _id, set_id }) {
  const employee = useSelector(state => state.employees.find(employee => employee._id === _id));
  const dateDisplayFormater = ({ date, view }) => {
    const slot = employee.profile.timeLine?.[date.getFullYear()]?.[date.getMonth()+1]?.[date.getDate()];
    return view === 'month' && slot?.slot && (slot?.status === true || new Date(new Date().toLocaleDateString()) > date) && <div title={slot.slot} className={`${new Date(new Date().toLocaleDateString()) > date ? 'bg-success' : 'bg-info'} text-white`}>{slot?.slot}</div>
  }

  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center px-2" style={{ height: 'calc(100% - 37px)' }}>
      <img src={employee.profile?.dp || defaultDp} alt="employee" className="img rounded-circle" style={{ width: 120, height: 120 }} />
      <div className="mb-2 d-flex">
        <div className="d-flex flex-column">
          <span className="form-label">Name:</span>
          <span className="form-label">Gender: &nbsp;</span>
          <span className="form-label">Email:</span>
        </div>
        <div className="d-flex flex-column">
          <span className="form-label">{`${employee.profile.firstName} ${employee.profile.lastname || ''}`}</span>
          <span className="form-label">{employee.profile.gender || "Male"}</span>
          <span className="form-label">{employee.email}</span>
        </div>
      </div>
      <Calendar className="mb-2" tileContent={dateDisplayFormater}/>
      <button type="button" className="btn btn-outline-primary align-self-end" onClick={() => set_id(null)} >Home</button>
    </div>
  )
}
