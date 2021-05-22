import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import moment from "moment";
import { loading, notloading } from '../utilities/ReduxStore/reducers/loading';
import { accepetSlot, denieSlot } from '../utilities/ReduxStore/reducers/user';

import { urls } from "../config.json";

export default function SlotAcceptance({ date, setDate }) {
  const mobile = useMediaQuery({ maxWidth: 576 });
  const slot = useSelector(state => state.user.data.profile.timeLine?.[date.getFullYear()]?.[date.getMonth()+1]?.[date.getDate()]);
  const dispatch = useDispatch();

  const accepet = () => {
    dispatch(loading());
    axios.get(`${urls.accepetSlot}/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`, { withCredentials: true })
      .then(data => {
        dispatch(notloading())
        dispatch(accepetSlot(date.toLocaleString()));
        setDate(null);
      })
      .catch(e => {
        console.log(e);
        if (e.reponse && e.reponse.data.data) alert(e.reponse.data.data.error_message);
        else alert('Something Went wrong');
        dispatch(notloading())
      })
  }
  const denie = () => {
    axios.delete(`${urls.accepetSlot}/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`, { withCredentials: true })
      .then(data => {
        dispatch(notloading())
        dispatch(denieSlot(date.toLocaleString()));
        setDate(null);
      })
      .catch(e => {
        if (e.reponse && e.reponse.data.data) alert(e.reponse.data.data.error_message);
        else alert('Something Went wrong');
        dispatch(notloading())
      })
  }
  
  return (
    <div className='d-flex flex-column position-fixed p-1 rounded shadow' style={{top: mobile?'10px':'20px',left: mobile?'10px':'15%', right:mobile?'10px':'15%', backgroundColor: "#d8d8d89e"}}>
      <div className="d-flex justify-content-evenly align-items-center w-100">
      {/* <div className="d-flex flex-column w-100"> */}
        <div className="d-flex flex-column">
          <span className="fs-5">Date:</span>
          <span className="fs-5">Slot:</span>
        </div>
        <div className="d-flex flex-column">
          <span className="fs-5 fw-bold">{moment(date).format('Do MMM y')}</span>
          <span className="fs-3 fw-bold">{slot?.slot}</span>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <div className="btn-group">
          <button buttton="button" onClick={accepet} className="btn-primary btn">Accpet</button>
          <button buttton="button" onClick={denie} className="btn-outline-warning btn">Denie</button>
        </div>
      </div>
    </div>
  )
}
