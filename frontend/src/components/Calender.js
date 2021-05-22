import React, { useState } from 'react'
import { Calendar } from "react-calendar";
import { useMediaQuery } from "react-responsive";
import _ from 'underscore';

import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';
import SlotAcceptance from './SlotAcceptance';

export default function Calender({ selectedDate, setSelectedDate }) {
  const mobile = useMediaQuery({ maxWidth: 576 });
  const user = useSelector(state => state.user.data, _.isEqual);
  const [date, setDate] = useState(null);
  console.log(user);

  const dateDisplayFormater = ({ date, view }) => {
    const slot = user.profile.timeLine?.[date.getFullYear()]?.[date.getMonth()+1]?.[date.getDate()];
    return view === 'month' && slot?.slot && <div title={slot?.slot} className={`${new Date(new Date().toDateString()) > date ? 'bg-success' : slot?.status === true? 'bg-info' : 'bg-warning'} overFlow-hidden text-white overflow-hidden`}>{slot?.slot}</div>
  }

  const handleDayClick = (date) => {
    const slot = user.profile.timeLine?.[date.getFullYear()]?.[date.getMonth()+1]?.[date.getDate()];
    if (slot?.status === false && new Date(new Date().toDateString()) < date) setDate(date);
  }
  if (user.superUser) return (
    <div className={`d-flex ${mobile?'w-100':'w-75'} justify-content-center align-items-center`} style={{order:mobile?-1:0}}>
      <Calendar value={selectedDate} onClickDay={(date) => setSelectedDate(date)} />
    </div>
  )
  else return (
    <div className={`d-flex w-100 justify-content-center align-items-center`} style={{ order: mobile ? -1 : 0 }}>
      <Calendar tileContent={dateDisplayFormater} onClickDay={handleDayClick} />
      {date && <SlotAcceptance {...{date,setDate}}/>}
    </div>
  )
  // if (user.superUser) return (
  //   <div className={`d-flex ${mobile?'w-100':'w-50'} justify-content-center align-items-center`} style={{order:mobile?-1:0}}>
  //     <Calendar value={selectedDate} onClickDay={(date) => setSelectedDate(date)} />
  //   </div>
  // )
  // else return (
  //   <div className={`d-flex ${mobile ? 'w-100' : 'w-70'} justify-content-center align-items-center`} style={{ order: mobile ? -1 : 0 }}>
  //     <Calendar tileContent={dateDisplayFormater} />
  //   </div>
  // )
}
