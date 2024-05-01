import "./Users.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, * as others from 'axios';
import { useState, useEffect } from 'react';


function Users() {
  const [users, setUsers] = useState();
  useEffect(() => {
  const response = axios.get('http://172.30.44.190:9000/api/admin/users')
  .then(function (response) {
    // handle success
    console.log("Response", response.data);
    setUsers(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}, []);

  return (
    <div className="users">
      <h1 style={{ padding: "30px 0px" }} className="page-title">
        Users
      </h1>
        <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>Email ID</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Active</th>
          <th>Deleted</th>
        </tr>
      </thead>
      <tbody class="table-primary">
      {users&&users.map((data) => {
                return(
                    <tr key={data.user_id}>
                        <td>{data.user_id}</td>
                        <td>{data.username}</td>
                        <td>{data.email_id}</td>
                        <td>{data.role}</td>
                        <td>{data.created_date}</td>
                        <td>{data.is_active}</td>
                        <td>{data.is_deleted}</td>
                    </tr>
                )
            })}
      </tbody>
    </table>
    </div>
  );
}

export default Users;
