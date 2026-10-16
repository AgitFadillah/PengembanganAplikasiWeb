export const API_ENDPOINTS = {
  WEATHER: "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current-weather=true&timezone=Asia/Jakarta",
  QUOTE: "https://dummyjson.com/quotes/random",
  TODOS: "https://jsonplaceholder.typicode.com/todos?_limit=3"
};

export const STORAGE_KEYS = {
  TASKS: "dashboard_tasks",
  NOTES: "dashboard_notes"
};

export const initialTodos = [
  { id: Date.now() + 0, title: "Belajar ES6+", description: "Pelajari let, const, arrow functions", deadline: "2026-10-20", completed: false },
  { id: Date.now() + 1, title: "Kerjakan Tugas PAW", description: "Personal Dashboard", deadline: "2026-10-17", completed: false }
];