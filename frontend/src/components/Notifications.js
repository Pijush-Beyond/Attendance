import React, { useEffect } from 'react';
import { useMediaQuery } from "react-responsive";

export default function Notifications() {
  const mobile = useMediaQuery({ maxWidth: 576 });

  useEffect(() => () => document.body.style.overflow = 'initial')
  
  if (mobile) {
    document.body.style.overflow = 'hidden';
    return (
      <>
        <div className="w-100 d-flex justify-content-center align-items-center" style={{height:'calc(100% - 59px)'}}>
          No Notifications !!
        </div>
      </>
    )
  }
  else return (
    <div className={`d-flex flex-column ${mobile ? 'w-100' : 'w-25'} overflow-scroll`} style={{ backgroundColor: '#fffffff0'}}>
      <div className="h-100 w-100 d-flex justify-content-center align-items-center">
        No Notifications !!
      </div>
    </div>
  )
}
