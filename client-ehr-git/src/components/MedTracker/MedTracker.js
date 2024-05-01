import React, {useState, useEffect} from "react";
import "./MedTracker.css";
import axios from "axios";

function MedTracker() {

//getting data
 const [medications, setMedications] = useState([])

  useEffect(() => {
    axios
      .get("http://172.30.44.190:9002/api/provider/medication/2")
      .then((meds) => {
        console.log(meds.data);
        setMedications(meds.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="med-tracker">
      <h1 style={{ padding: "30px 0px" }} className="page-title">
        Medication Tracker
      </h1>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Medication ID</th>
            <th>Patient ID</th>
            <th>Provider ID</th>
            <th>Medication name</th>
            <th>Dosage</th>
            <th>Schedule</th>
            <th>Date cretated</th>
            <th>Date modified</th>
          </tr>
        </thead>
        <tbody class="table-primary">
        {medications.map((getmeds) => (
              <><tr key={getmeds.patient_id}>
                <td>{getmeds.medication_id}</td>
                <td>{getmeds.patient_id}</td>
                <td>{getmeds.provider_id}</td>
                <td>{getmeds.medication_name}</td>
                <td>{getmeds.dosage}</td>
                <td>{getmeds.schedule}</td>
                <td>{getmeds.created_date}</td>
                <td>{getmeds.modified_date}</td>
              </tr></>))}
          </tbody> 
          
      
      </table>
    </div>
  );
}

export default MedTracker;
