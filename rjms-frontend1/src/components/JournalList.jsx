import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJournals } from "../api/api";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getJournals = async () => {
      try {
        const data = await fetchJournals();
        setJournals(data);
      } catch (err) {
        console.error("Error fetching journals:", err);
        setError("Failed to fetch journals. Please check the API server.");
      } finally {
        setLoading(false);
      }
    };
    getJournals();
  }, []);

  if (loading) return <div>Loading journals...</div>;
  if (error) return <div>{error}</div>;
  if (journals.length === 0) return <p>No journals available.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Available Journals</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {journals.map((journal) => (
          <div
            key={journal.id}
            onClick={() => navigate(`/journals/${journal.id}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              width: "250px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#007bff" }}>
              {journal.title}
            </h3>
            <p style={{ margin: 0, fontStyle: "italic" }}>By {journal.author}</p>
            <p style={{ marginTop: "5px", color: "#555", fontSize: "0.9em" }}>
              Publisher: {journal.publisher || "N/A"}
            </p>
            <p style={{ marginTop: "5px", color: "#555", fontSize: "0.9em" }}>
              Published: {journal.published_date || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalList;
