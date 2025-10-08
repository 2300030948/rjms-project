import React, { useState } from 'react';
import api from '../api/api';

export default function ReviewForm({ versionId, onReviewed }) {
  const [score, setScore] = useState(3);
  const [recommendation, setRecommendation] = useState('major'); // major/minor/accept/reject
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    setError(null);
    if (!comments.trim()) return setError('Add comments');
    setLoading(true);
    try {
      await api.post(`/articles/${versionId}/reviews`, { score, recommendation, comments });
      if (onReviewed) onReviewed();
      setComments('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h6>Submit Review</h6>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-2">
        <label className="form-label">Score (1-5)</label>
        <input type="number" className="form-control" min="1" max="5" value={score} onChange={e=>setScore(Number(e.target.value))} />
      </div>
      <div className="mb-2">
        <label className="form-label">Recommendation</label>
        <select className="form-select" value={recommendation} onChange={e=>setRecommendation(e.target.value)}>
          <option value="accept">Accept</option>
          <option value="minor">Minor revision</option>
          <option value="major">Major revision</option>
          <option value="reject">Reject</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="form-label">Comments</label>
        <textarea className="form-control" rows="4" value={comments} onChange={e=>setComments(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Review'}</button>
    </div>
  );
}
