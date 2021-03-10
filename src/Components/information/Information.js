import React, { useState } from "react";
import "./Information.scss";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Information(props) {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  let doctors = [
    {
      value: "Иван Иванов Иваныч",
    },
    {
      value: "Еврий Евринов Еврийский",
    },
    {
      value: "Bиталий Виталов Виталович",
    },
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addNewAppointment = async () => {
    try {
      await axios.post("http://localhost:8000/createNewAppointment", {
        name: name,
        doctor: doctor,
        date: date,
        complaint: complaint,
      });
      setSeverity("success");
      setMessage("Данные удачно отправлены на сервер");
      setOpen(true);
      // window.location.reload();
    } catch (e) {
      setSeverity("error");
      setMessage("Что-то пошло не так");
      setOpen(true);
    }
  };

  const onClickTable = (e) => {
    if (name === "" || doctor === "" || date === "" || complaint === "") {
      setSeverity("error");
      setMessage("Заполните все поля!");
      setOpen(true);
    } else {
      addNewAppointment();
      setName("");
      setDate("");
      setDoctor("");
      setComplaint("");
    }
  };

  return (
    <div className="Information-shadow">
      <Container fixed>
        <div className="Information">
          <div className="Information_block">
            <Typography className="Information-Text">Имя:</Typography>
            <TextField
              type="text"
              id="nameInput"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Information_block">
            <Typography className="Information-Text">Врач:</Typography>
            <TextField
              id="doctorInput"
              select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              variant="outlined"
            >
              {doctors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="Information_block">
            <Typography className="Information-Text">Дата:</Typography>
            <TextField
              type="date"
              id="dateInput"
              value={date}
              variant="outlined"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="Information_block">
            <Typography className="Information-Text">Жалобы:</Typography>
            <TextField
              type="text"
              id="complaintsInput"
              value={complaint}
              variant="outlined"
              onChange={(e) => setComplaint(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={onClickTable}>
            Добавить
          </Button>
        </div>
      </Container>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Information;
