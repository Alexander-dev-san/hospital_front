import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import editImg from "../table/img/pencil.svg";
import deleteImg from "../table/img/delete.svg";
import "./Table.scss";

function Table() {
  const [appointments, setAppointment] = useState([]);

  useEffect(async () => {
    await axios.get("http://localhost:8000/getAllAppointments").then((res) => {
      setAppointment(res.data.data);
    });
  }, []);

  return (
    <Container fixed>
      <table className="table">
        <tr className="table-row">
          <th>Имя</th>
          <th>Врач</th>
          <th>Дата</th>
          <th>Жалобы</th>
          <th>&nbsp;</th>
        </tr>
          {appointments.map((item) => (
            <tr className="appoint-row">
              <td className="appoint-column">{item.name}</td>
              <td className="appoint-column">{item.doctor}</td>
              <td className="appoint-column">
                {new Date(Date.parse(item.date)).toLocaleDateString("ru-RU")}
              </td>
              <td className="appoint-column">{item.complaint}</td>
              <td className="appoint-column">
                <div className="tableBtns">
                  <img
                    src={editImg}
                    className="tableImg"
                    alt="edit"
                    onClick={() => alert("edit!")}
                  />
                  <img
                    src={deleteImg}
                    className="tableImg"
                    alt="delete"
                    onClick={() => alert("delete!")}
                  />
                </div>
              </td>
            </tr>
          ))}
      </table>
    </Container>
  );
}

export default Table;
