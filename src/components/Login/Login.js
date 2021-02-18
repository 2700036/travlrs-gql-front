import React, {useState} from "react";
import { Link, Redirect } from "react-router-dom";
import travlrsApi from '../../utils/travlrsApi';
import { useActions } from '../../reducers/useActions';
import { useSelector } from 'react-redux';
import "./login.css";

const Login = ({history}) => {
  const { loggedIn, userInfo } = useSelector(({ app }) => app);
  const { logIn, updateAuthStatus } = useActions();
  const [userData, setUserData] = useState({
    email: '',
    password: ''    
  });  
  
  const handleChange = ({ target: { name, value } }) => {
    setUserData((userData) => ({ ...userData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }
    travlrsApi
      .authorize(userData.email, userData.password)
      .then((data) => {        
        if (data.token) {
          setUserData({ email: "", password: "" });
          logIn();
          history.push("/");          
        } else {
          updateAuthStatus({error: data.message});            
        }
      })
      .catch((err) => console.log(err));
  }
  
    return loggedIn && userInfo ? <Redirect to='/' /> :
    (
      <div className="login">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          
          <input
            required
            id="email"
            name="email"
            type="email"            
            placeholder='Email'
            value={userData.username}
            onChange={handleChange}
          />
          
          <input
            required
            id="password"
            name="password"
            type="password"
            placeholder='Пароль'
            value={userData.password}
            onChange={handleChange}
          />
          
            <button
              type="submit"
              onSubmit={handleSubmit}
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

export default Login;