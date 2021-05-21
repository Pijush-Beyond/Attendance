import React from 'react';
import Employees from './Employees';
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const mobile = useMediaQuery({ maxWidth: 576 });
  return (
    <>
      <main className={`d-flex align-items-center ${mobile ? 'flex-column':''}`}>
        <Employees/>
      </main>
    </>
  )
}
