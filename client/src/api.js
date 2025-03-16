const BASE_URL = `${import.meta.env.VITE_API_URL}/api/logs`;
export const fetchLogs = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createLog = async (log) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  return res.json();
};

export const deleteLog = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateLog = async (id, updatedLog) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedLog),
  });
  return res.json();
};
