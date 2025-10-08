import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ name, email, affiliation, password });
      setSuccessMsg('Registration successful. Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Register</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Affiliation</label>
              <input className="form-control" value={affiliation} onChange={e=>setAffiliation(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-success">Register</button>
              <Link to="/login">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
