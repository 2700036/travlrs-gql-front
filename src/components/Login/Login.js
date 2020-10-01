import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import * as auth from "../auth.js";
import "./login.css";

class Login extends React.Component {
  state = {
      email: "",
      password: ""
    };    
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    auth
      .authorize(this.state.email, this.state.password)
      .then((data) => {        
        if (data.token) {
          this.setState({ email: "", password: "" }, () => {
            this.props.handleLogin();
            this.props.history.push("/");
          });
        } else {
          this.props.setAuthStatus({error: data.message});
            this.props.openLoginStatusPopup();
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return this.props.loggedIn ? <Redirect to='/' /> :
    (
      <div className="login">
        <p className="login__welcome">Вход</p>
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
          <Link to="/register" className="signup__link">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);