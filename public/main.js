const form = document.getElementById('logForm');
const titleInput = document.getElementById('title');
const experienceInput = document.getElementById('experience');
const logsList = document.getElementById('logsList');

const fetchLogs = async () => {
  logsList.innerHTML = '';
  const res = await fetch('/api/logs');
  const logs = await res.json();

  logs.forEach(log => {
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>${log.title}</h3>
      <p>${log.experience}</p>
      <small>${new Date(log.date).toLocaleString()}</small>
      <button onclick="deleteLog('${log._id}')">🗑 Delete</button>
    `;
    logsList.appendChild(li);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const experience = experienceInput.value;

  await fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, experience }),
  });

  form.reset();
  fetchLogs();
});

const deleteLog = async (id) => {
  await fetch(`/api/logs/${id}`, { method: 'DELETE' });
  fetchLogs();
};

fetchLogs();
