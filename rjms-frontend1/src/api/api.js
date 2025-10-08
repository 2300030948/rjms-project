// src/api/api.js

export const API_BASE_URL = "http://localhost:8082/api/journals";

// ✅ Fetch all journals
export const fetchJournals = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch journals");
  return response.json();
};

// ✅ Fetch a single journal by ID
export const fetchJournalById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch journal with ID ${id}`);
  return response.json();
};

// ✅ Create a new journal
export const createJournal = async (journal) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(journal),
  });
  if (!response.ok) throw new Error("Failed to create journal");
  return response.json();
};

// ✅ Update an existing journal by ID
export const updateJournal = async (id, journal) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(journal),
  });
  if (!response.ok) throw new Error(`Failed to update journal with ID ${id}`);
  return response.json();
};

// ✅ Delete a journal by ID
export const deleteJournal = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete journal with ID ${id}`);
  return response.json(); // returns { deleted: true }
};

// ✅ Optional: Search journals by title or author
export const searchJournals = async (query) => {
  const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search journals");
  return response.json();
};
