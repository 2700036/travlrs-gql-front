import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../auth.js";
import "../Login/login.css";

class Register extends React.Component {
  
  state = {      
      email: "",
      password: "",
      name: ""     
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
          this.state.password,
          this.state.name          
        )
        .then((res) => {          
          if (res) {            
            this.props.setAuthStatus(res);
            this.props.openLoginStatusPopup();
            auth.authorize(this.state.email,
              this.state.password)
              .then(res=>{
                console.log(res)
                this.props.history.push("/");
              })
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
            id="name"
            name="name"
            type="text"            
            placeholder='Имя'
            minLength='2'
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            required
            id="email"
            name="email"
            type="email"            
            placeholder='Email'
            value={this.state.email}
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
              Регистрируюсь
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
