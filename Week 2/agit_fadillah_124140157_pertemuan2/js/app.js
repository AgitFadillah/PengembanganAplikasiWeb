import { API_ENDPOINTS, STORAGE_KEYS, initialTodos } from "./modules/data.js";
import { formatDate, saveToStorage, loadFromStorage } from "./modules/utils.js";

class TaskItem {
  constructor(title, description = "", deadline = "", completed = false) {
    this.id = Date.now() + Math.random();
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
  }

  toggleComplete() {
    this.completed = !this.completed;
    return this.completed;
  }

  static fromJSON(json) {
    const t = new TaskItem(json.title, json.description, json.deadline, json.completed);
    t.id = json.id;
    t.createdAt = json.createdAt;
    return t;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      deadline: this.deadline,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }

  toListItemHTML() {
    const statusClass = this.completed ? "status-completed" : "status-pending";
    const statusText = this.completed ? "Selesai" : "Proses";
    const toggleLabel = this.completed ? 'Belum Selesai' : 'Selesai';
    return `
      <li class="task-item bg-gray-50 p-4 rounded-lg flex items-center justify-between" data-id="${this.id}">
        <div class="flex-1">
          <div class="flex items-start gap-3">
            <button class="toggle-btn text-sm px-2 py-1 border rounded-lg" data-id="${this.id}">${toggleLabel}</button>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-medium">${this.title}</span>
                <span class="status-badge ${statusClass}">${statusText}</span>
              </div>
              ${this.description ? `<p class="text-sm text-gray-600 mt-1">${this.description}</p>` : ""}
              ${this.deadline ? `<p class="text-xs text-gray-500 mt-1"><svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 16 16"><path d="M1 8a6 6 0 1 1 12 0A6 6 0 0 1 1 8zM7.5 4h1v3.5H7V4zm0 4.5h1V12h-1v-3.5z"/></svg> ${formatDate(this.deadline)}</p>` : ""}
            </div>
          </div>
        </div>
        <button class="delete-btn text-red-500 hover:text-red-700 font-bold px-2 py-1" data-id="${this.id}">Hapus</button>
      </li>
    `;
  }
}

class DashboardApp {
  constructor() {
    this.tasks = [];
    this.notes = [];
    this.filter = "all";
  }

  async fetchWeather() {
    try {
      const res = await fetch(API_ENDPOINTS.WEATHER);
      if (!res.ok) throw new Error("Gagal fetch cuaca");
      const data = await res.json();
      const w = data.current_weather;
      return {
        temperature: w.temperature,
        windspeed: w.windspeed,
        weather: w.weathercode
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  async fetchQuote() {
    try {
      const res = await fetch(API_ENDPOINTS.QUOTE);
      if (!res.ok) throw new Error("Gagal fetch kutipan");
      const data = await res.json();
      return { quote: data.quote, author: data.author };
    } catch (error) {
      return { error: error.message };
    }
  }

  loadFromStorage() {
    const storedTasks = loadFromStorage(STORAGE_KEYS.TASKS);
    const storedNotes = loadFromStorage(STORAGE_KEYS.NOTES);
    this.tasks = storedTasks ? storedTasks.map((t) => TaskItem.fromJSON(t)) : [...initialTodos];
    this.notes = storedNotes || [];
  }

  saveToStorage() {
    saveToStorage(STORAGE_KEYS.TASKS, this.tasks.map((t) => t.toJSON()));
    saveToStorage(STORAGE_KEYS.NOTES, this.notes);
  }

  addTask(title, description, deadline) {
    const task = new TaskItem(title, description, deadline);
    this.tasks = [...this.tasks, task];
    this.saveToStorage();
    return task;
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((t) => {
      if (t.id == id) t.toggleComplete();
      return t;
    });
    this.saveToStorage();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id != id);
    this.saveToStorage();
  }

  setFilter(filter) {
    this.filter = filter;
  }

  getFilteredTasks() {
    const { filter, tasks } = this;
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((t) => !t.completed);
    this.saveToStorage();
  }

  completeAll() {
    this.tasks = this.tasks.map((t) => {
      t.completed = true;
      return t;
    });
    this.saveToStorage();
  }

  addNote(text) {
    if (!text.trim()) return;
    this.notes = [...this.notes, { id: Date.now(), text, createdAt: new Date().toISOString() }];
    this.saveToStorage();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.saveToStorage();
  }
}

export { TaskItem, DashboardApp };
export const dashboardApp = new DashboardApp();