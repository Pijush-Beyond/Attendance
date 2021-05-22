import React, { createContext, useReducer, useState } from 'react';
import Employees from './Employees';
import { useMediaQuery } from "react-responsive";
import Calender from './Calender';
import Notifications from './Notifications';
import { useSelector } from 'react-redux';
import Employee from './Employee';

export const IdContext = createContext();
export default function Home() {
  const mobile = useMediaQuery({ maxWidth: 576 });
  const companyName = useSelector(state => state.company.name);
  const userProfile = useSelector(state => state.user.data.profile);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [_id, set_id] = useReducer((state, action) => action, null);

  const [_id, set_id] = useState(null);

  // console.log(selectedEmployeeId)

  document.title = `Home | ${companyName} | ${userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : ''}`
  return (
    <IdContext.Provider value={{ _id, set_id}}>
      <main className={`d-flex pt-1 ${mobile ? 'flex-column' : ''}`} style={{ minHeight: mobile ? 'calc(91vh)' : 'calc(100vh - 75px)' }}>
        <Employees {...{_id,set_id}}/>
        <Calender {...{selectedDate, setSelectedDate}} />
        {/* {!mobile && <Notifications />} */}
        {_id && <Employee {...{ _id, set_id, selectedDate }} />}
      </main>
    </IdContext.Provider>
  )
}
