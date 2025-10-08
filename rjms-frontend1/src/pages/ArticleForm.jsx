import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function ArticleForm(){
  const [title, setTitle] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title required'); return; }
    if (!file) { setError('Attach manuscript (PDF)'); return; }
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      const metadata = { title, abstractText };
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', file);

      const resp = await api.post('/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // expected to return article object including id
      navigate(`/articles/${resp.data.id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Submit Article</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Abstract</label>
          <textarea className="form-control" rows="6" value={abstractText} onChange={e=>setAbstractText(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Manuscript (PDF)</label>
          <input type="file" className="form-control" accept="application/pdf" onChange={e=>setFile(e.target.files[0])} />
        </div>
        <button className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Create & Upload'}</button>
      </form>
    </div>
  );
}
