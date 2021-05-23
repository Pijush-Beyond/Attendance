import React, {  useEffect, useState } from 'react'
import { useMediaQuery } from "react-responsive";
import Details from './Details';
// import { IdContext } from './Home';
import SlotBook from './SlotBook';

export default function Employee(props) {
  const mobile = useMediaQuery({ maxWidth: 576 });
  const [choiceSection, setChoiceSection] = useState(props.selectedDate > new Date()? 0:1);

  // const {_id} = useContext(IdContext)


  let style = { backgroundColor: '#fffffff0' };
  if (!mobile) style = { ...style, top: 20, left: 20, right: 20, bottom: 20 };
  else style = { ...style, top: 0, left: 0, right: 0, bottom: 0 };

  useEffect(() => () => document.body.style.overflow = 'initial', []);

  document.body.style.overflow = 'hidden';
  return (
    <div className={`position-fixed ${mobile ? '' : ''}`} style={style}>
      <div className="d-flex w-100 btn-group">
        {props.selectedDate > new Date() && <button className={`btn btn-custom ${choiceSection === 0 ? 'active' : 'btn-outline-primary'}`} disabled={choiceSection === 0} onClick={() => setChoiceSection(0)}>Give Slot</button>}
        <button className={`btn btn-custom ${choiceSection === 1 ? 'active' : 'btn-outline-primary'}`} disabled={choiceSection === 1} onClick={() => setChoiceSection(1)}>Details</button>
      </div>
      {choiceSection === 0 && <SlotBook {...props} />}
      {choiceSection === 1 && <Details {...props} />}
    </div>
  )
}
