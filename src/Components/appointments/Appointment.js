import React from "react";
import { useHistory } from "react-router-dom";
import Table from "../table/Table";
import Header from "../header/Header";
import Information from "../information/Information";
import DeleteModal from "../deleteModal/DeleteModal";
import "./Appointment.scss";

function Appointment(props) {
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
      <DeleteModal />
    </div>
  );
}

export default Appointment;
