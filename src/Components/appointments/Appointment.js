import React from "react";
import { useHistory } from "react-router-dom";
import Table from "../table/Table";
import Header from "../header/Header";
import Information from "../information/Information";
import "./Appointment.scss";

function Appointment() {
  let history = useHistory();

  const outBtn = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div className="Appointment">
      <Header heading="Приемы">
        <button onClick={() => outBtn()} className="outBtn">
          Выйти
        </button>
      </Header>
      <Information />
      <Table />
    </div>
  );
}

export default Appointment;
