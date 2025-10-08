import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "../App.css"

function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ id: null, title: "", author: "", publishedDate: "" });
  const [isEditing, setIsEditing] = useState(false);

  const API_URL = "http://localhost:8082/api/journals";

  // Fetch journals
  const fetchJournals = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch journals");
        return res.json();
      })
      .then(data => {
        setJournals(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error("Error loading journals");
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // Form change handler
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Add / Update
  const handleSubmit = e => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to save journal");
        return res.json();
      })
      .then(() => {
        toast.success(isEditing ? "Journal updated!" : "Journal added!");
        setForm({ id: null, title: "", author: "", publishedDate: "" });
        setIsEditing(false);
        fetchJournals();
      })
      .catch(err => {
        toast.error("Error saving journal");
        console.error(err);
      });
  };

  // Edit
  const handleEdit = journal => {
    setForm(journal);
    setIsEditing(true);
  };

  // Delete
  const handleDelete = id => {
    if (window.confirm("Delete this journal?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error("Failed to delete journal");
          toast.success("Journal deleted!");
          fetchJournals();
        })
        .catch(err => {
          toast.error("Error deleting journal");
          console.error(err);
        });
    }
  };

  // Search filter
  const filteredJournals = journals.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📚 Journal Management System</h1>
      <h2>Research Journals</h2>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="publishedDate"
          value={form.publishedDate}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add">
          {isEditing ? "Update" : "Add"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({ id: null, title: "", author: "", publishedDate: "" });
            }}
            className="cancel"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Table */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#666" }}>Loading journals...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJournals.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#666" }}>
                    No journals found.
                  </td>
                </tr>
              ) : (
                filteredJournals.map(j => (
                  <tr key={j.id}>
                    <td>{j.title}</td>
                    <td>{j.author}</td>
                    <td>{j.publishedDate}</td>
                    <td>
                      <button onClick={() => handleEdit(j)} className="edit">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(j.id)} className="delete">
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default Journals;
