import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJournalById } from "../api/api";


const JournalDetail = () => {
  const { id } = useParams(); // get journal ID from URL
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJournal = async () => {
      try {
        const data = await fetchJournalById(id);
        setJournal(data);
      } catch (err) {
        console.error("Error fetching journal:", err);
        setError("Failed to load journal details.");
      } finally {
        setLoading(false);
      }
    };
    getJournal();
  }, [id]);

  if (loading) return <div>Loading journal...</div>;
  if (error) return <div>{error}</div>;
  if (!journal) return <div>No journal found.</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Back link */}
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#007bff",
          textDecoration: "underline",
        }}
      >
        ← Back to Journals
      </Link>

      {/* Journal details card */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{journal.title}</h2>
        <p><strong>Author:</strong> {journal.author}</p>
        <p><strong>Publisher:</strong> {journal.publisher || "N/A"}</p>
        <p><strong>Published Date:</strong> {journal.publishedDate || "N/A"}</p>
        <hr style={{ margin: "15px 0" }} />
        <p style={{ whiteSpace: "pre-line" }}>{journal.content}</p>
      </div>
    </div>
  );
};

export default JournalDetail;
