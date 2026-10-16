import { dashboardApp, TaskItem } from "./app.js";
import { formatDate, capitalize } from "./modules/utils.js";

const renderTasks = () => {
  const taskList = document.getElementById("task-list");
  const tasks = dashboardApp.getFilteredTasks();

  if (tasks.length === 0) {
    taskList.innerHTML = `
      <li class="text-center py-8">
        <span class="text-gray-400">
          ${dashboardApp.filter === "all" ? "Belum ada tugas" : "Tidak ada tugas yang sesuai filter"}
        </span>
      </li>
    `;
    return;
  }

  taskList.innerHTML = tasks.map((t) => t.toListItemHTML()).join("");

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      dashboardApp.toggleTask(id);
      renderTasks();
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      dashboardApp.deleteTask(id);
      renderTasks();
    });
  });
};

const renderNotes = () => {
  const notesList = document.getElementById("notes-list");
  if (dashboardApp.notes.length === 0) {
    notesList.innerHTML = `
      <li class="text-center py-6 text-gray-400">
        <span>Belum ada catatan</span>
      </li>
    `;
    return;
  }

  notesList.innerHTML = `
    ${dashboardApp.notes
      .map((n) => `
        <div class="bg-gray-50 p-4 rounded-lg flex justify-between items-start group">
          <div class="flex-1">
            <p class="text-gray-800 whitespace-pre-wrap">${n.text}</p>
            <p class="text-xs text-gray-400 mt-2">${formatDate(n.createdAt)}</p>
          </div>
          <button class="delete-note ml-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition" data-id="${n.id}">Hapus</button>
        </div>
      `)
      .join("")}
  `;

  document.querySelectorAll(".delete-note").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      dashboardApp.deleteNote(id);
      renderNotes();
    });
  });
};

const renderWeather = async () => {
  const weatherEl = document.getElementById("weather-widget");
  weatherEl.innerHTML = `<span class="text-gray-500">Memuat cuaca...</span>`;

  const { temperature, windspeed, weather, error } = await dashboardApp.fetchWeather();

  if (error) {
    weatherEl.innerHTML = `<span class="text-red-500">ERROR: ${error}</span>`;
    return;
  }

  const weatherEmojis = {
    0: "Sunny", 1: "Mostly Sunny", 2: "Partly Cloudy", 3: "Cloudy", 45: "Fog", 48: "Fog",
    51: "Light Rain", 61: "Rain", 71: "Snow", 80: "Rain Showers", 95: "Thunderstorm", 99: "Thunderstorm"
  };
  const emoji = weatherEmojis[weather] || "Cloudy";

  weatherEl.innerHTML = `
    <div class="flex items-center gap-6">
      <span class="text-4xl">${emoji}</span>
      <div>
        <div class="text-3xl font-bold">${temperature}°C</div>
        <div class="text-gray-600">Angin: ${windspeed} km/jam</div>
      </div>
    </div>
  `;
};

const renderQuote = async () => {
  const quoteEl = document.getElementById("quote-widget");
  quoteEl.innerHTML = `<span class="text-gray-500">Memuat kutipan...</span>`;

  const { quote, author, error } = await dashboardApp.fetchQuote();

  if (error) {
    quoteEl.innerHTML = `<span class="text-red-500">❌ ${error}</span>`;
    return;
  }

  quoteEl.innerHTML = `
    <blockquote class="text-xl italic text-gray-700 text-center mb-2">"${quote}"</blockquote>
    <cite class="text-gray-500">- ${author || "Tidak diketahui"}</cite>
  `;
};

const initEventListeners = () => {
  document.getElementById("task-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("task-title");
    const desc = document.getElementById("task-desc");
    const deadline = document.getElementById("task-deadline");

    if (!title.value.trim()) return;

    dashboardApp.addTask(title.value, desc.value, deadline.value);
    title.value = "";
    desc.value = "";
    deadline.value = "";
    renderTasks();
  });

  document.getElementById("filter-status")?.addEventListener("change", (e) => {
    dashboardApp.setFilter(e.target.value);
    renderTasks();
  });

  document.getElementById("clear-completed")?.addEventListener("click", () => {
    dashboardApp.completeAll();
    renderTasks();
  });

  document.getElementById("add-note")?.addEventListener("click", () => {
    const noteInput = document.getElementById("note-input");
    if (!noteInput.value.trim()) return;
    dashboardApp.addNote(noteInput.value);
    noteInput.value = "";
    renderNotes();
  });
};

const init = async () => {
  dashboardApp.loadFromStorage();
  renderTasks();
  renderNotes();
  initEventListeners();
  await renderWeather();
  await renderQuote();
};

const start = () => {
  console.log("Personal Dashboard initialized");
  init();
};

start();