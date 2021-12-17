import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import StudentTableRow from "./StudentTableRow";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/")
      .then((res) => {
        // console.log(res.data);
        setStudents(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  // console.log(students);
  const DataTable = () => {
    return students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <Table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Roll No</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default StudentList;
