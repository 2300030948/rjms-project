import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h3>Dashboard</h3>
      <p>Welcome to the Research Journal Management System (frontend). Use the menu to navigate.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Articles</h5>
            <p>View submitted articles and manage review workflow.</p>
            <Link to="/articles" className="btn btn-primary btn-sm">Open Articles</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Submit</h5>
            <p>Create and upload a new manuscript.</p>
            <Link to="/articles/new" className="btn btn-success btn-sm">New Article</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
