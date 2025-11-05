import React, { useEffect, useState } from 'react';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', course:'', year: '' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(()=>{ load(); }, []);

  const load = async () => {
    const res = await fetch('http://localhost:8080/api/students');
    const data = await res.json();
    setStudents(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editId) {
      const res = await fetch(`http://localhost:8080/api/students/${editId}`, {
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...form, year: parseInt(form.year||0) })
      });
      if (res.ok) { setMsg('Updated'); setEditId(null); setForm({name:'',email:'',course:'',year:''}); load(); }
    } else {
      const res = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ ...form, year: parseInt(form.year||0) })
      });
      if (res.ok) { setMsg('Added'); setForm({name:'',email:'',course:'',year:''}); load(); }
    }
    setTimeout(()=>setMsg(''),2000);
  };

  const edit = (s) => {
    setEditId(s.id);
    setForm({ name: s.name, email: s.email, course: s.course, year: s.year });
  };

  const remove = async (id) => {
    await fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="card">
      <h2>Students</h2>

      <form onSubmit={submit} className="student-form">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Course" value={form.course} onChange={e=>setForm({...form,course:e.target.value})} />
        <input placeholder="Year" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      {msg && <div className="info">{msg}</div>}

      <table className="student-table">
        <thead><tr><th>Name</th><th>Email</th><th>Course</th><th>Year</th><th>Actions</th></tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.year}</td>
              <td>
                <button onClick={()=>edit(s)}>Edit</button>
                <button onClick={()=>remove(s.id)} className="danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
