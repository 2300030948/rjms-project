import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../auth/AuthContext';
import AssignReviewer from './AssignReviewer';
import ReviewForm from './ReviewForm';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const resp = await api.get(`/articles/${id}`);
      setArticle(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticle(); }, [id]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!article) return <div className="container mt-4">Article not found.</div>;

  return (
    <div className="container mt-4">
      <h3>{article.title}</h3>
      <p><strong>Status:</strong> {article.status}</p>
      <p><strong>Abstract:</strong></p>
      <p>{article.abstractText}</p>

      <h5 className="mt-4">Versions</h5>
      <ul className="list-group">
        {article.versions?.length === 0 && <li className="list-group-item">No versions uploaded.</li>}
        {article.versions?.map(v => (
          <li key={v.id} className="list-group-item">
            <div>
              <strong>v{v.versionNumber}</strong> — uploaded at {new Date(v.uploadedAt).toLocaleString()}
              {' '}
              {v.filePath && (
                <a className="btn btn-sm btn-link" href={`${import.meta.env.VITE_API_BASE?.replace('/api','') || 'http://localhost:8080'}/files/${v.filePath}`} target="_blank" rel="noreferrer">Download</a>
              )}
            </div>

            <div className="mt-2">
              <strong>Reviews:</strong>
              {v.reviews?.length === 0 && <div>No reviews yet</div>}
              <ul>
                {v.reviews?.map(r => (
                  <li key={r.id}>
                    <strong>{r.reviewer?.name || r.reviewer?.email}</strong> — {r.recommendation} — {r.comments}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="mt-3">
              {user?.role?.name === 'EDITOR' && <AssignReviewer versionId={v.id} onAssigned={fetchArticle} />}
              {user?.role?.name === 'REVIEWER' && <ReviewForm versionId={v.id} onReviewed={fetchArticle} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
