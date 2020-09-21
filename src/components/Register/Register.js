import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../auth.js";

import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      calGoal: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCals = this.handleChangeCals.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleChangeCals = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      auth
        .register(
          this.state.username,
          this.state.password,
          this.state.email,
          this.state.calGoal
        )
        .then((res) => {
          if (res) {
            this.props.history.push("/login");
          } else {
            console.log("Произошла ошибка.");
          }
        });
    }
  };
  render() {
    return (
      <div className="register">
        <p className="register__welcome">Пожалуйста, зарегистрируйтесь.</p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label for="username">Логин:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label for="password">Пароль:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label for="confirmPassword">Повторите пароль:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          <label for="calGoal">Калории за день:</label>
          
          <div className="register__button-container">
            <button
              type="submit"
              onSubmit={this.handleSubmit}
              className="register__link"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>

        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">
            Войти
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
