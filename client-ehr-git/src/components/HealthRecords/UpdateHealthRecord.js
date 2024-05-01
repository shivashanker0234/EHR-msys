// import '../Appointments/Appointments.css';
// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import AppointmentModel from '../Appointments/AppointmentModel';
// import '../Appointments/Appointments.css';
// import { useNavigate,useLocation } from 'react-router-dom';

// function UpdateHealthRecord(){
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { record_id, patient_id, provider_id} = location.state || {};
//     const [isopen, setIsopen] = useState(true);
//     const [data,setData]=useState([]);

//     const [records, setRecords] = useState({
//         record_id:record_id,
//         patient_id:patient_id ,
//         provider_id :provider_id,
//         diagnosis: "",
//         treatment: "",
//       });
//       const {diagnosis, treatment } = records;
//       const onChangeHandler = (e) => {
//         console.log(e.target.value);
//         setRecords({ ...records, [e.target.name]: e.target.value });
//       };

//       const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("post request call for Adding health record");
//         console.log(patient_id, provider_id, record_id, diagnosis, treatment);
//         axios
//           .put("http://172.30.44.190:9002/api/provider/record/900", records)
//           .then((response) => {
//             console.log(response.data);
//             setRecords(response.data);
//           })
//           .catch((err) => console.log(err));
//         console.log("checking flow 1");
//         // navigate('/UpdateHealthRecord')
//         navigate('/HealthRecords')
    
//         setRecords({
//           record_id: "",
//           patient_id: "",
//           provider_id: "",
//           diagnosis: "",
//           treatment: "",
//         });
//       };


//   return(
//     <div className="appForm">
//     <AppointmentModel open={isopen} onClose={() => navigate('/HealthRecords')}>
//       <h3 className="heading1">Update Health Record</h3>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <div className="formGroup" style={{ width: "350px" }}>
//           <label>Record ID</label>
//           <input
//             style={{ padding: "15px" }}
//             name="record_id"
//             id="record_id"
//             required=""
//             type="text"
//             className="input"
//             placeholder="Record ID"
//             value={record_id}
            
//             onChange={(e) => onChangeHandler(e)}
//           />
//         </div>

//         <div className="formGroup">
//           <label>Patient ID</label>
//           <input
//             style={{ padding: "15px" }}
//             name="patient_id"
//             id="patient_id"
//             required=""
//             type="text"
//             className="input"
//             placeholder="Patient Id"
//             value={patient_id}
//             onChange={(e) => onChangeHandler(e)}
//           />
//         </div>
//         <div className="formGroup">
//           <label>Provider ID</label>
//           <input
//             style={{ padding: "15px" }}
//             name="provider_id"
//             id="provider_id"
//             required=""
//             type="text"
//             className="input"
//             placeholder="Provider Id"
//             value={provider_id}
//             onChange={(e) => onChangeHandler(e)}
//           />
//         </div>
//         <div className="formGroup">
//           <label>Diagnosis</label>
//           <input
//             style={{ padding: "15px" }}
//             name="diagnosis"
//             id="diagnosis"
//             required=""
//             type="text"
//             className="input"
//             placeholder="Diagnosis"
//             value={diagnosis}
//             onChange={(e) => onChangeHandler(e)}
//           />
//         </div>
//         <div className="formGroup">
//           <label>Treatment</label>
//           <input
//             style={{ padding: "15px" }}
//             name="treatment"
//             id="treatment"
//             required=""
//             type="text"
//             className="input"
//             placeholder="Treatment"
//             value={treatment}
//             onChange={(e) => onChangeHandler(e)}
//           />
//         </div>
//         <button  className="submitButton" type="submit" >
//           Update
//         </button>
//       </form>
//     </AppointmentModel>
//   </div>  
// )}
// export default UpdateHealthRecord;