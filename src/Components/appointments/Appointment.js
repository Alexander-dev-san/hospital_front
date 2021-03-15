import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Table from "../table/Table";
import Header from "../header/Header";
import Information from "../information/Information";
import Sort from "../sort/Sort";
import "./Appointment.scss";

function Appointment(props) {
  let history = useHistory();
  const [appointments, setAppointment] = useState([]);
  const [howSort, setHowSort] = useState("none");
  const [directSort, setDirectSort] = useState("asc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateBy, setDateBy] = useState("");

  const outBtn = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  const addNewAppointment = async (name, doctor, date, complaint) => {
    try {
      await axios.post("http://localhost:8000/createNewAppointment", {
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      });
      getAllAppoints(dateFrom, dateBy);
      history.push("/appointment");
    } catch (e) {}
  };

  useEffect(() => getAllAppoints(dateFrom, dateBy), []);

  const getAllAppoints = async (dateFrom, dateBy) => {
    await axios.get("http://localhost:8000/getAllAppointments").then((res) => {
      let arr = onFilter(dateFrom, dateBy, res.data.data);
      let arrNew = sortApp(arr, howSort, directSort);
      setAppointment(arrNew);
    });
  };

  const sortApp = (arr, str, directSort) => {
    if (directSort === "asc") {
      return arr.sort((a, b) =>
        a[str] > b[str] ? 1 : a[str] < b[str] ? -1 : 0
      );
    } else if (directSort === "desc") {
      return arr.sort((a, b) =>
        a[str] < b[str] ? 1 : a[str] > b[str] ? -1 : 0
      );
    }
  };

  const onFilter = (dateFrom, dateBy, appointments) => {
    if (dateFrom != "" && dateBy != "") {
      let newArr = appointments.filter((item) => {
        return item.date.split('T')[0] >= dateFrom && item.date.split('T')[0] <= dateBy;
      });
      return newArr;
    } else if (dateFrom === "" && dateBy === "") {
      return appointments;
    } else if (dateFrom !== "" && dateBy === "") {
      let newArr = appointments.filter((item) => {
        return item.date.split('T')[0] >= dateFrom;
      });
      return newArr;
    } else if (dateFrom === "" && dateBy !== "") {
      let newArr = appointments.filter((item) => {
        return item.date.split('T')[0] <= dateBy;
      });
      return newArr;
    }
  };

  return (
    <div className="Appointment">
      <Header heading="Приемы">
        <button onClick={() => outBtn()} className="outBtn">
          Выйти
        </button>
      </Header>
      <Information addNewAppointment={addNewAppointment} />
      <Sort
        setAppointment={setAppointment}
        appointments={appointments}
        getAllAppoints={getAllAppoints}
        howSort={howSort}
        setHowSort={setHowSort}
        directSort={directSort}
        setDirectSort={setDirectSort}
        sortApp={sortApp}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateBy={dateBy}
        setDateBy={setDateBy}
        onFilter={onFilter}
      />
      <Table
        setAppointment={setAppointment}
        appointments={appointments}
        getAllAppoints={getAllAppoints}
        setHowSort={setHowSort}
        dateFrom={dateFrom}
        dateBy={dateBy}
        // sortName={sortName}
      />
    </div>
  );
}

export default Appointment;
