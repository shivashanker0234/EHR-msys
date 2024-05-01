import React, { useState } from "react";
import axios from "axios";
// import "../Appointments/Appointments.css";
import { FcApproval } from "react-icons/fc";
import { PiSealWarningFill } from "react-icons/pi";
import { FcDataRecovery } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import { IoIosAddCircle } from "react-icons/io";
import HealthModel from "./HealthModel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './HealthModel.css'

function HealthRecords({ user_role, user_id }) {
  // console.log(user_role, user_id);
  const [isopen, setIsopen] = useState(false);
  const [history, setHistory] = useState();
  const [isActive, setIsActive] = useState();
  const [isdelete, setIsDelete] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const[ updateIsOpen,setUpdateIsOpen]=useState(false)
  const navigate = useNavigate();
  const [records, setRecords] = useState({
    record_id: "",
    patient_id: "",
    provider_id: "",
    diagnosis: "",
    treatment: "",
  });

  const { record_id, patient_id, provider_id, diagnosis, treatment } = records;

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setRecords({ ...records, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("post request call for Adding health record");
    console.log(patient_id, provider_id, record_id, diagnosis, treatment);
    axios
      .post("http://172.30.44.190:9002/api/provider/record", records)
      .then((response) => {
        console.log(response.data);
        setRecords(response.data);
        setIsopen(false);
      })
      .catch((err) => console.log(err));
    console.log("checking flow 1");

    setRecords({
      patient_id: "",
      provider_id: "",
      record_id: "",
      diagnosis: "",
      treatment: "",
    });
  };
  useEffect(() => {
    if (user_role === "patient") {
      axios
        .get(`http://172.30.44.190:9002/api/provider/record/${user_id}`)
        .then((appData) => {
          console.log(appData.data);
          const filterData = appData.data.filter(
            (item) => item.is_active === true
          );
          setData(filterData);
        })
        .catch((error) => console.log(error));
    } else if (user_role === "provider") {
      console.log("Provider login");
      axios
        .get(`http://172.30.44.190:9002/api/provider/record/${user_id}`)
        .then((appData) => {
          console.log(appData.data);
          const filterData = appData.data.filter(
            (item) => item.is_active === true
          );
          setData(filterData);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const appFormClose = () => {
    setIsopen(false);
  };

  const updateFormClose=()=>{
    setUpdateIsOpen(false)
  }

  const handleNavigation = (value) => {
    setUpdateIsOpen(true)
    console.log("Updating in process")
    setRecords({
    record_id:value.record_id,
    patient_id: value.patient_id,
    provider_id: value.provider_id,
    diagnosis: value.diagnosis,
    treatment: value.treatment,
    })
    axios
          .put("http://172.30.44.190:9002/api/provider/record/900", records)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => console.log(err));
    
  };

  const handleDelete = (softDelete) => {
    console.log("trying to delete");
    console.log(softDelete.record_id);

    axios
      .delete("http://172.30.44.190:9002/api/provider/record/67", {
        data: {
          record_id: softDelete.record_id,
          patient_id: softDelete.patient_id,
          provider_id: softDelete.provider_id,
          diagnosis: softDelete.diagnosis,
          treatment: softDelete.treatment,
        },
      })
      .then((response) => {
        console.log("delete operation under progress");
        console.log(response.data);
        window.location.reload();
        // Handle the response as needed
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        // Handle the error as needed
      });
  };

  return (
    <div className="med-tracker">
      <h1 style={{ padding: "30px 0px" }} className="page-title">
        HealthRecords
      </h1>
      {user_role === "provider" ? (
        <button className="newAppoint" onClick={() => setIsopen(true)}>
          Add Record <IoIosAddCircle />
        </button>
      ) : (
        <button
          className="newAppoint"
          onClick={() => alert("Only Doctor can Add ")}
        >
          Add Record <IoIosAddCircle />
        </button>
      )}

      {/* Adding New Health Record */}
      <div className="appForm">
        <HealthModel open={isopen} onClose={() => appFormClose(false)}>
          <h3 className="heading1">Add Health Record</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="formGroup" style={{ width: "350px" }}>
              <label>Record ID</label>
              <input
                style={{ padding: "15px" }}
                name="record_id"
                id="record_id"
                required=""
                type="text"
                className="input"
                placeholder="Record ID"
                value={record_id}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="formGroup">
              <label>Patient ID</label>
              <input
                style={{ padding: "15px" }}
                name="patient_id"
                id="patient_id"
                required=""
                type="text"
                className="input"
                placeholder="Patient Id"
                value={patient_id}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="formGroup">
              <label>Provider ID</label>
              <input
                style={{ padding: "15px" }}
                name="provider_id"
                id="provider_id"
                required=""
                type="text"
                className="input"
                placeholder="Provider Id"
                value={provider_id}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="formGroup">
              <label>Diagnosis</label>
              <input
                style={{ padding: "15px" }}
                name="diagnosis"
                id="diagnosis"
                required=""
                type="text"
                className="input"
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="formGroup">
              <label>Treatment</label>
              <input
                style={{ padding: "15px" }}
                name="treatment"
                id="treatment"
                required=""
                type="text"
                className="input"
                placeholder="Treatment"
                value={treatment}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <button className="submitButton" type="submit">
              Submit
            </button>
          </form>
        </HealthModel>
      </div>

      {/* Update Health Record */}

      <div className="appForm">
        <HealthModel
          open={updateIsOpen} onClose={()=>updateFormClose(false)}

        >
          <h3 className="heading1">Update Health Record</h3>
          <form onSubmit={(e) => handleNavigation(e)}>
            <div className="formGroup" style={{ width: "350px" }}>
              <label>Record ID</label>
              <input
                style={{ padding: "15px" }}
                name="record_id"
                id="record_id"
                required=""
                type="text"
                className="input"
                placeholder="Record ID"
                value={record_id}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="formGroup">
              <label>Patient ID</label>
              <input
                style={{ padding: "15px" }}
                name="patient_id"
                id="patient_id"
                required=""
                type="text"
                className="input"
                placeholder="Patient Id"
                value={patient_id}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="formGroup">
              <label>Provider ID</label>
              <input
                style={{ padding: "15px" }}
                name="provider_id"
                id="provider_id"
                required=""
                type="text"
                className="input"
                placeholder="Provider Id"
                value={provider_id}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="formGroup">
              <label>Diagnosis</label>
              <input
                style={{ padding: "15px" }}
                name="diagnosis"
                id="diagnosis"
                required=""
                type="text"
                className="input"
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="formGroup">
              <label>Treatment</label>
              <input
                style={{ padding: "15px" }}
                name="treatment"
                id="treatment"
                required=""
                type="text"
                className="input"
                placeholder="Treatment"
                value={treatment}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <button className="submitButton" type="submit">
              Update
            </button>
          </form>
        </HealthModel>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Patient ID</th>
            <th>Provider ID</th>
            <th>Diagnoses </th>
            <th>Medical Treatment</th>
            <th>Update Record</th>
            <th>Delete Record</th>
          </tr>
        </thead>
        <tbody className="table-primary">
          {data &&
            data.map((value) => (
              <>
                <tr key={value.patient_id}>
                  <td>{value.record_id}</td>
                  <td>{value.patient_id}</td>
                  <td>{value.provider_id}</td>
                  <td>{value.diagnosis}</td>
                  <td>{value.treatment}</td>
                  <td>
                    {user_role === "provider" ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleNavigation(value)}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => alert("Only Doctors can Update")}
                      >
                        Update
                      </button>
                    )}
                  </td>
                  <td>
                    {user_role === "provider" ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(value)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => alert("Only Doctors can Delete")}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HealthRecords;
