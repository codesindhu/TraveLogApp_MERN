const token = localStorage.getItem("token");

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard.html";
    } else {
      document.getElementById("error").textContent = data.msg;
    }
  });
}

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.getElementById("regUsername").value,
        password: document.getElementById("regPassword").value,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Registration successful! Please login.");
      window.location.href = "/login.html";
    } else {
      document.getElementById("error").textContent = data.msg;
    }
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}

// LOAD LOGS
async function loadLogs() {
  const res = await fetch("/api/travelLogs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const logsDiv = document.getElementById("logs");
  if (logsDiv) {
    logsDiv.innerHTML = "";
    data.forEach((log) => {
      const logElement = document.createElement("div");
      logElement.innerHTML = `
        <h3>${log.title}</h3>
        <p>${log.description}</p>
        <small>${new Date(log.createdAt).toLocaleString()}</small>
        <hr />
      `;
      logsDiv.appendChild(logElement);
    });
  }
}

// ADD LOG
const logForm = document.getElementById("logForm");
if (logForm) {
  logForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetch("/api/travelLogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
      }),
    });
    loadLogs();
    logForm.reset();
  });

  // Load logs when dashboard opens
  loadLogs();
}
