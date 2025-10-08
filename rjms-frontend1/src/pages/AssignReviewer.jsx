import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AssignReviewer({ versionId, onAssigned }) {
  const [reviewers, setReviewers] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=> {
    (async ()=>{
      try {
        const resp = await api.get('/users?role=REVIEWER'); // backend: list users by role (optional)
        setReviewers(resp.data || []);
      } catch (err) {
        // fallback: empty
        setReviewers([]);
      }
    })();
  }, []);

  const handleAssign = async () => {
    if (!selected) return setError('Select reviewer');
    setLoading(true);
    setError(null);
    try {
      await api.post(`/articles/${versionId}/assign/${selected}`);
      if (onAssigned) onAssigned();
    } catch (err) {
      setError(err?.response?.data?.message || 'Assign failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h6>Assign Reviewer</h6>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex gap-2 align-items-center">
        <select className="form-select" value={selected} onChange={e=>setSelected(e.target.value)}>
          <option value="">Select reviewer</option>
          {reviewers.map(r => <option key={r.id} value={r.id}>{r.name || r.email}</option>)}
        </select>
        <button className="btn btn-sm btn-primary" onClick={handleAssign} disabled={loading}>{loading ? 'Assigning...' : 'Assign'}</button>
      </div>
      <div className="mt-2"><small>Tip: If list is empty, add reviewers in backend or seed DB.</small></div>
    </div>
  );
}
