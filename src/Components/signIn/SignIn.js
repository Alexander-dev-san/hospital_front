import React, { useState } from "react";
import "./SignIn.scss";
import axios from "axios";
import mainImg from "../signIn/img/logo.svg";
import { Link, useHistory } from "react-router-dom";
import Header from "../header/Header";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import sha1 from "js-sha1";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignIn() {
  let history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState("error");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // api.login(email, password);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const signInCheck = async () => {
    try {
      await axios.post("http://localhost:8000/checkUser", {
        login: login,
        password: sha1(password),
      });
      setSeverity("success");
      setMessage("Вы удачно авторизованы");
      setOpen(true);
      localStorage.setItem("user", "user");
      history.push("/appointment");
      window.location.reload();
    } catch (e) {
      setSeverity("error");
      setMessage("Вы ввели неверный логин или пароль");
      setOpen(true);
    }
  };

  const onClickSignInBtn = (e) => {
    if (login === "" || password === "") {
      setMessage("Заполните все поля!");
      setOpen(true);
    } else if (login.length < 6) {
      setMessage("Минимальное колличество символов для Login = 6");
      setOpen(true);
    } else if (!/(?=^.{6,}$)([a-zA-Z\d]+$)/.test(password)) {
      setMessage(
        "Введите в поле password не менее 6 латинских символов, минимум 1 из которых является числом"
      );
      setOpen(true);
    } else {
      signInCheck();
    }
  };

  return (
    <div>
      <Header heading="Войти в систему" />
      <div className="content-block">
        <div className="Content-mainImg">
          <img src={mainImg} alt="logo" />
        </div>
        <div className="SignIn-form">
          <p>Войти в систему</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="loginSignIn"> Login: </label>
            <input
              type="text"
              id="loginSignIn"
              value={login}
              placeholder="Login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="passwordSignIn"> Passwod: </label>
            <input
              type="password"
              id="passwordSingIn"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="send-block">
              <input
                type="submit"
                value="Войти"
                id="form-btn"
                onClick={(e) => onClickSignInBtn(e)}
              />
              <Link to="/registration">Зарегистрироваться</Link>
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

export default SignIn;
