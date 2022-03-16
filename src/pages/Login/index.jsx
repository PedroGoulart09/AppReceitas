import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const MIN_LENGTH = 6;
  const history = useHistory();

  useEffect(() => {
    setBtnDisabled(!(email
      .includes('@') && email
      .includes('.com') && password.length > MIN_LENGTH));
  }, [email, password]);

  const handleInputChange = ({ target }, setter) => {
    setter(target.value);
  };

  const submitLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <section className="login-page">

      <img style={ { maxWidth: '360px' } } src={ logo } alt="logo" />
      <form
        onSubmit={ (e) => e.preventDefault() }
        className="form-login"
      >
        <label htmlFor="email-input">
          <input
            placeholder="E-mail"
            data-testid="email-input"
            id="email-input"
            value={ email }
            name="email"
            onChange={ (e) => { handleInputChange(e, setEmail); } }
            type="email"
          />
        </label>

        <label
          htmlFor="password-input"
        >
          <input
            placeholder="Senha"
            data-testid="password-input"
            id="password-input"
            value={ password }
            onChange={ (e) => { handleInputChange(e, setPassword); } }
            name="password"
            type="password"
          />
        </label>

        <button
          disabled={ btnDisabled }
          onClick={ submitLogin }
          data-testid="login-submit-btn"
          type="submit"
        >
          Enter
        </button>

      </form>
    </section>
  );
}

export default Login;
