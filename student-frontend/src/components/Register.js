import React, { useState } from 'react';

function Register({ onRegister }) {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [fullName,setFullName] = useState('');
  const [msg,setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ username, password, fullName })
      });
      const body = await res.json();
      if (res.ok) {
        setMsg('Registered! You can login now.');
        setUsername(''); setPassword(''); setFullName('');
        onRegister && onRegister();
      } else {
        setMsg(body.message || 'Registration failed');
      }
    } catch (err) {
      setMsg('Server error');
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Full name</label>
        <input value={fullName} onChange={e=>setFullName(e.target.value)} required />
        <label>Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {msg && <div className="info">{msg}</div>}
      </form>
    </div>
  );
}

export default Register;
