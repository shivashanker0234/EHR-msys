import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointments.css";
import AppointmentModel from "./AppointmentModel";
// import { MdCancel } from "react-icons/md";
// import { MdSchedule } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
// import { GiConfirmed } from "react-icons/gi";

function Appointments() {

  const [isopen, setIsopen] = useState(false);
  const [takeAppointment, setTakeAppointment] = useState({
    patient_id: '',
    provider_id: '',
    date: ''
  });
  const [appointmentData, setAppointmentData] = useState([]);
  const { patient_id, provider_id, date } = takeAppointment;

  //input handler
  const onInputChange = e => {
    console.log(e.target.value);
    setTakeAppointment({ ...takeAppointment, [e.target.name]: e.target.value })
  }

  //form submission handler
  const handleSubmit = (e) => {
    axios.post("https://172.30.44.190:9001/api/appointments/schedule", takeAppointment)
      .then(response => console.log(response))
      .catch(err => console.log(err))
    setTakeAppointment({
      patient_id: '',
      provider_id: '',
      date:''
    })
  }

  //getting appointment data
  useEffect(() => {
    axios
      .get("http://172.30.44.190:9001/api/appointments/patient/2")
      .then((appData) => {
        console.log(appData.data);
        setAppointmentData(appData.data);
      })
      .catch((error) => console.log(error));
  }, []);


  //closing the form
  const appFormClose = () => {
    setIsopen(false)
  }

  return (
    <div className="med-tracker">
      <h1 style={{ padding: "30px 0px" }} className="page-title">
        Appointmentssss
      </h1>
      <button className="newAppoint" onClick={() => setIsopen(true)}>New appointment <IoIosAddCircle /></button>

      {/* new appoinment model */}
      <div className='appForm'>
        <AppointmentModel open={isopen} onClose={() => appFormClose()}>
          <h3 className="heading1">New Appointmentsss</h3>
          <form onSubmit={e => handleSubmit(e)}>
            <div className='formGroup'>
              <label>Patient ID: </label>
              <input type='number' name='patient_id' placeholder='Enter patient ID' value={patient_id} onChange={(e) => onInputChange(e)} />
            </div>
            <div className='formGroup'>
              <label>Provider ID: </label>
              <input type='number' name='provider_id' placeholder='Enter provider ID' value={provider_id} onChange={(e) => onInputChange(e)} />
            </div>
            <div className='formGroup'>
              <label>Date: </label>
              <input type='date' name='date' placeholder='Enter date' value={date} onChange={(e) => onInputChange(e)} />
            </div>
            <button class="submitButton" type='submit'>Submit</button>
          </form>
        </AppointmentModel>
      </div>

      {/* Appointment table */}
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient ID</th>
            <th>Provider ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Created date</th>
            <th>Modified date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody class="table-primary">
          {appointmentData.map((getdata) => (
            <><tr key={getdata.appointment_id}>
              <td>{getdata.appointment_id}</td>
              <td>{getdata.patient_id}</td>
              <td>{getdata.provider_id}</td>
              <td>{getdata.date}</td>
              <td>{getdata.status}</td>
              <td>{getdata.created_date}</td>
              <td>{getdata.modified_date}</td>
              <td><button className="action">Delete</button></td>
            </tr></>))} 
        </tbody> 
        </table>
    </div>
  );
}

export default Appointments;
