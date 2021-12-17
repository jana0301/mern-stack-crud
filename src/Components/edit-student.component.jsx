import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentForm from "./StudentForm";

const EditStudent = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });
  let { id } = useParams();
  const onSubmit = (studentObject) => {
    axios
      .put("http://localhost:4000/students/update-student/" + id, studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          window.location.href = "/student-list";
          // props.history.push("/student-list");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  // console.log(formValues);
  useEffect(() => {
    axios
      .get("http://localhost:4000/students/update-student/" + id)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(formValues);
  return (
    <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Student
    </StudentForm>
  );
};

export default EditStudent;
