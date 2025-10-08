import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/articles');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: 520 }}>
        <div className="card-body">
          <h4 className="card-title mb-3">Login</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary">Login</button>
              <Link to="/register">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
