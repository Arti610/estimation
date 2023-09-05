import React from 'react'
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div style={{ width:"100%"}}>
        <Outlet/>
    </div>
  )
}

export default Content