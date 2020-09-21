import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../auth.js";
import "../Login/login.css";

class Register extends React.Component {
  
  state = {      
      email: "",
      password: ""      
    };    
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };  
  handleSubmit = (e) => {
    e.preventDefault();   
      auth
        .register(          
          this.state.email,
          this.state.password          
        )
        .then((res) => {
          if (res) {            
            this.props.setAuthStatus(res);
            this.props.openLoginStatusPopup();
            this.props.history.push("/login");
          } else {
            console.log("Произошла ошибка.");
          }
        });
    
  };
  render() {
    return (
      <div className="login">
        <p className="login__welcome">Регистрация</p>
        <form onSubmit={this.handleSubmit} className="login__form">
          
          <input
            required
            id="email"
            name="email"
            type="email"            
            placeholder='Email'
            value={this.state.username}
            onChange={this.handleChange}
          />
          
          <input
            required
            id="password"
            name="password"
            type="password"
            placeholder='Пароль'
            value={this.state.password}
            onChange={this.handleChange}
          />          
            <button
              type="submit"
              onSubmit={this.handleSubmit}
              className="login__button"
            >
              Войти
            </button>          
        </form>

        <div className="login__signup">
          <p>Уже зарегестрированны?</p>
          <Link to="/login" className="signup__link">
            Войти
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
