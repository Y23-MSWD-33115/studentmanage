import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Students from './components/Students';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login'); // 'login' | 'register' | 'students'

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Manager</h1>
        <div className="nav">
          {!user && <button onClick={()=>setPage('login')}>Login</button>}
          {!user && <button onClick={()=>setPage('register')}>Register</button>}
          {user && <button onClick={()=>setPage('students')}>Students</button>}
          {user && <button onClick={() => { setUser(null); setPage('login'); }}>Logout</button>}
        </div>
      </header>

      <main>
        {!user && page === 'login' && <Login onLogin={(u)=>{ setUser(u); setPage('students'); }} />}
        {!user && page === 'register' && <Register onRegister={()=>setPage('login')} />}
        {user && page === 'students' && <Students />}
      </main>
      <footer className="app-footer">Simple Student Manager • Not for production use</footer>
    </div>
  );
}

export default App;
