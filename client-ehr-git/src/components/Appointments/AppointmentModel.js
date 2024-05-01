import React from 'react'
import './AppointmentModel.css'
import { GrClose } from "react-icons/gr";

function AppointmentModel({open, children, onClose}) {
    if(!open)
    return null;
    return (
    <>
    <div className='overlay'/>
    <div className='appPopup'>
    <button className='buttonClose' onClick={onClose}>< GrClose /></button>
    {children}
    </div>
    </>
  )
}

export default AppointmentModel