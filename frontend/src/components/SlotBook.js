import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import defaultDp from '../public/user.svg'
import { loading, notloading } from '../utilities/ReduxStore/reducers/loading';
import { addSlot } from '../utilities/ReduxStore/reducers/employees';

import { urls } from "../config.json";

export default function SlotBook({ _id, set_id, selectedDate}) {
  const employee = useSelector(state => state.employees.find(employee => employee._id === _id));
  const timeSlots = useSelector(state => state.company.timeSlots);
  const dispatch = useDispatch()


  const handleSlotBook = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.timeSlot.value === '') {
      alert('This is slot is already assigned');
      return;
    }
    dispatch(loading());
    axios.post(`${urls.giveSlot}/${selectedDate.getFullYear()}/${selectedDate.getMonth()+1}/${selectedDate.getDate()}`,
      { slot: form.timeSlot.value, employeeId: employee._id },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => {
        console.log({ slot: form.timeSlot.value, date: selectedDate.toLocaleDateString(), employee: employee._id });
        dispatch(notloading());
        dispatch(addSlot({ slot: form.timeSlot.value, date: selectedDate.toLocaleDateString(), employee: employee._id}));
        alert('successfull');
      }).catch(e => {
        dispatch(notloading());
        if (e.reponse && e.reposnse.data.error_message) alert(e.reposnse.data.error_message);
        else alert('Something went wrong');
      })
  }
  
  return (
    <form onSubmit={handleSlotBook} className="w-100 d-flex flex-column justify-content-center align-items-center px-2" style={{ height: 'calc(100% - 37px)' }}>
      <img src={employee.profile?.dp || defaultDp} alt="employee" className="img rounded-circle" style={{width:120, height:120}}/>
      <div className="mb-2 fs-3 fw-bold">
        {`${employee.profile.firstName} ${employee.profile.lastname || ''}`}
      </div>
      <div className="mb-2 fs-3 fw-bold">
        {selectedDate.toLocaleDateString()}
      </div>
      <div className="mb-2">
        <label htmlFor="timeSlot" className="form-label fw-bold">Choose:</label>
        <select required name="timeSlot" id="timeSlot" className="form-select">
          <option hidden value="" selected>--------------</option>
          {timeSlots.map((timeSlot, index) => <option key={index} value={Boolean(employee.profile.timeLine?.[selectedDate.getFullYear()]?.[selectedDate.getMonth()+1]?.[selectedDate.getDate()]?.slot === timeSlot)?'':timeSlot} disabled={Boolean(employee.profile.timeLine?.[selectedDate.getFullYear()]?.[selectedDate.getMonth()+1]?.[selectedDate.getDate()]?.slot === timeSlot)} className="text-capitalize">{timeSlot}</option> )}
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-2" style={{maxWidth: '600px'}}>Continue</button>
      <button type="button" className="btn btn-outline-primary btn-block" onClick={()=> set_id(null)} style={{ maxWidth: '600px' }} >Cancel</button>
    </form>
  )
}
