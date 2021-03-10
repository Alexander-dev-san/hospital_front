import React, { useState, useEffect } from "react";
import "./Table.scss";
import axios from "axios";

function Table() {
  const [appointments, setAppointment] = useState([]);

  useEffect(async () => {
    await axios.get("http://localhost:8000/getAllAppointments").then((res) => {
      setAppointment(res.data.data);
    });
  }, []);

  return (
    <table class="table">
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
          <td className="appoint-column"></td>
        </tr>
      ))}
    </table>
  );
}

export default Table;
