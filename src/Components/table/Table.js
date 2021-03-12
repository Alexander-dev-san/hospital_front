import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import editImg from "../table/img/pencil.svg";
import deleteImg from "../table/img/delete.svg";
import "./Table.scss";
import DeleteModal from "../deleteModal/DeleteModal";
import EditModal from "../editModal/EditModal";

function Table() {
  let history = useHistory();

  const [appointments, setAppointment] = useState([]);
  const [deleteMod, setDeleteMod] = useState(false);
  const [idDel, setIdDelete] = useState("");

  const [editMod, setEditMod] = useState(false);
  const [itemEdit, setItemEdit] = useState("");

  const handleDelete = (id) => {
    setDeleteMod(true);
    setIdDelete(id);
  };

  const handleEdit = (item) => {
    setEditMod(true);
    setItemEdit(item);
  };

  const deleteRow = async (id) => {
    await axios
      .delete("http://localhost:8000/deleteAppointment", {
        data: { id: id },
      })
      .then((res) => {
        setAppointment(res.data.data);
      });
    history.push("/appointment");
  };

  const editRow = async (editParams) => {
    await axios
      .patch("http://localhost:8000/changeAppointment", {
        _id: editParams.item._id,
        name: editParams.nameEdit,
        doctor: editParams.doctorEdit,
        date: editParams.dateEdit,
        complaint: editParams.complaintEdit,
      })
      .then((res) => {
        setAppointment(res.data.data);
      });
    history.push("/appointment");
  };

  const onDeleteRow = (id) => {
    deleteRow(id);
    setDeleteMod(false);
  };

  const onEditRow = (editParams) => {
    editRow(editParams);
    setEditMod(false);
  };

  useEffect(() => getAllAppoints(), []);

  const getAllAppoints = async () => {
    await axios.get("http://localhost:8000/getAllAppointments").then((res) => {
      setAppointment(res.data.data);
    });
  };

  return (
    <Container fixed>
      <table className="table">
        <tbody>
          <tr className="table-row">
            <th>Имя</th>
            <th>Врач</th>
            <th>Дата</th>
            <th>Жалобы</th>
            <th>&nbsp;</th>
          </tr>
          {appointments.map((item, ind) => (
            <tr className="appoint-row" key={`${ind}`}>
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
                    onClick={() => handleEdit(item)}
                  />
                  <img
                    src={deleteImg}
                    className="tableImg"
                    alt="delete"
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteMod ? (
        <DeleteModal
          idDel={idDel}
          deleteEl={onDeleteRow}
          setDeleteMod={setDeleteMod}
          deleteMod={deleteMod}
        />
      ) : (
        <div />
      )}
      {editMod ? (
        <EditModal
          itemEdit={itemEdit}
          editEl={onEditRow}
          setEditMod={setEditMod}
          editMod={editMod}
        />
      ) : (
        <div />
      )}
    </Container>
  );
}

export default Table;
