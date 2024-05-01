import React from 'react'
import './HealthModel.css'
import { GrClose } from "react-icons/gr";

function HealthModel({open, children, onClose}) {
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

export default HealthModel;