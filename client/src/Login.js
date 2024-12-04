import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const initialFormValues = {
  username: '',
  password: '',
};

export default function Login({ setIsLoggedIn, setWelcomeMessage, setUsername }) {
  const [values, setValues] = useState(initialFormValues);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
    if (error) setError(null); 
  };

  const validateInputs = () => {
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('Both username and password are required.');
      return false;
    }
    return true;
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!validateInputs()) return;

    const endpoint = isRegistering
      ? 'http://localhost:9000/api/register'
      : 'http://localhost:9000/api/login';

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username.trim(),
          password: values.password.trim(),
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        if (isRegistering) {
          setError(null);
          setWelcomeMessage('Registration successful! Please log in.');
          setValues(initialFormValues);
          setIsRegistering(false);
        } else {
          localStorage.setItem('token', data.token);
          setUsername(values.username.trim());
          setIsLoggedIn(true);
          setWelcomeMessage(data.message);
          setValues(initialFormValues);
          navigate('/pets');
        }
      } else {
        setError(data.message || (isRegistering ? 'Registration failed.' : 'Invalid credentials.'));
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setValues(initialFormValues);
    setWelcomeMessage('');
    setError(null);
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={onSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={values.username}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Please wait...' : isRegistering ? 'Register' : 'Login'}
        </button>
        <button type="button" onClick={toggleMode} className="toggle-button">
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
