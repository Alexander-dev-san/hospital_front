import React from "react";
import "./Appointment.scss";
import Header from "../header/Header";
import Information from "../information/Information";
import Table from "../table/Table";

function Appointment() {
  const outBtn = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="Appointment">
      <Header heading="Приемы">
        <button onClick={outBtn} className="outBtn">
          Выйти
        </button>
      </Header>
      <Information />
      <Table />
    </div>
  );
}

export default Appointment;
