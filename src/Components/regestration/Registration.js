import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "../header/Header";
import mainImg from "../regestration/img/logo.svg";
import "./Registration.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Registration() {
  let history = useHistory();
  // const [users, setUsers] = useState([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addNewUser = async () => {
    try {
      await axios.post("http://localhost:8000/createUser", {
        login: login,
        password: password,
      });
      setSeverity("success");
      setMessage("Вы удачно зарегестрированны");
      setOpen(true);
      localStorage.setItem("user", "user");
      history.push("/appointment");
      window.location.reload();
    } catch (e) {
      setSeverity("error");
      setMessage("Такой пользователь уже существует");
      setOpen(true);
    }
  };

  const onClickRegisterBtn = (e) => {
    if (login === "" || password === "" || repeatPassword === "") {
      setMessage("Заполните все поля!");
      setOpen(true);
    } else if (login.length < 6) {
      setMessage("Минимальное колличество символов для Login = 6");
      setOpen(true);
    } else if (!/(?=.*[0-9])(?=.*[A-Za-z]){5,}/.test(password)) {
      setMessage(
        "Введите в поле password не менее 6 латинских символов, минимум 1 из которых является числом"
      );
      setOpen(true);
    } else if (password !== repeatPassword) {
      setMessage("Пароли не совпадают!");
      setOpen(true);
    } else {
      addNewUser();
      setLogin("");
      setPassword("");
      setRepeatPassword("");
    }
  };

  return (
    <div>
      <Header heading="Зарегистрироваться в системе" />
      <div className="content-block">
        <div className="Content-mainImg">
          <img src={mainImg} alt="logo" />
        </div>
        <div className="Registration-form">
          <p>Регистрация</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="login"> Login: </label>
            <input
              type="text"
              id="login"
              value={login}
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password"> Repeat password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <div className="send-block">
              <input
                type="submit"
                value="Зарегистрироваться"
                id="form-btnr"
                onClick={(e) => onClickRegisterBtn(e)}
              />
              <Link to="/">Авторизоваться</Link>
            </div>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Registration;
