import React from 'react';
import { useState } from 'react';
import './login.css';

async function guardarDatos(array) {
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(array)
  });
  return response.json(); 
}

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const habdlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
      setError(true);
    }else{
      setError(false);
    }
    const fecha = new Date().toLocaleString();
    const resp = guardarDatos({email, password,fecha})
    console.log(resp)
  }
  return (
    <div>
      <h2>Iniciar Sesión</h2>
        <form >
            <div class="input-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" placeholder="Ingresa tu correo" onChange={handleEmailChange} ></input>
                {error? <p className="error">Correo inválido</p>: null}
            </div>
            <div class="input-group">
                <label for="password">Contraseña</label>
                <input type="password" placeholder="Ingresa tu contraseña" onChange={habdlePasswordChange} ></input>
            </div>
            <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
        </form>
    </div>
  );
}


export default App;
