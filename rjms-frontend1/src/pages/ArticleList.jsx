import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

export default function ArticleList(){
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    (async ()=>{
      setLoading(true);
      setError(null);
      try {
        const resp = await api.get('/articles');
        // expecting array
        setArticles(resp.data || []);
      } catch (err) {
        setError('Could not load articles');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Articles</h3>
        <Link className="btn btn-success" to="/articles/new">New Article</Link>
      </div>
      {loading && <div className="mt-3">Loading...</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {!loading && !error && (
        <table className="table mt-3">
          <thead>
            <tr><th>Title</th><th>Status</th><th>Author</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {articles.length === 0 && <tr><td colSpan="4">No articles yet.</td></tr>}
            {articles.map(a => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.status}</td>
                <td>{a.correspondingAuthor?.name || a.correspondingAuthor?.email}</td>
                <td>
                  <Link to={`/articles/${a.id}`} className="btn btn-sm btn-primary">Open</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
