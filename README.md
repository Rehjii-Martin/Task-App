# 💾 Minimal Task App

A clean, full-stack task management application built with vanilla JavaScript and Express. Designed with an Apple-style UI, responsive layout, file-based persistence, and modern usability features like inline editing, toast notifications, and icon-driven controls.

---

## ✨ Features

* ✅ Add, delete, and edit tasks inline
* ✅ Automatically saves tasks to `tasks.json`
* ✅ Responsive and mobile-friendly design
* ✅ Timestamps for when tasks were created
* ✅ Toast notifications for feedback
* ✅ Font Awesome icon UI
* ✅ Built with simplicity and polish in mind

---

## 📸 Demo

> [Live Demo Link (Render/Vercel)](https://task-app-6ojg.onrender.com)

---

## 🛠️ Tech Stack

* Frontend: HTML5, CSS3, Vanilla JavaScript
* Backend: Node.js, Express
* Persistence: Local JSON file (`tasks.json`)
* Icons: [Font Awesome](https://fontawesome.com/)

---

## 📂 Project Structure

```
/public
  ├── index.html
  ├── style.css
  └── script.js
/tasks.json       <-- persists task data
server.js         <-- Express backend
README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Rehjii-Martin/task-app.git
cd task-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
node server.js
```

App will be live at [http://localhost:3000](http://localhost:3000)

---

## 🧲 Local Testing

* Add some tasks
* Open `tasks.json` and confirm they're saved
* Stop and restart the server — your tasks persist

---

## 📆 Future Improvements

* Edit timestamps (`updatedAt`)
* Filtering / sorting tasks
* Authentication for user-based tasks
* MongoDB support
* Dark mode toggle

---

## 🧠 Author

**Rehjii Martin** <br>
🧑‍💻 [GitHub](https://github.com/Rehjii-Martin) <br>
📧 [martireh@oregonstate.com](mailto:martireh@oregonstate.com)

---

## 📄 License

MIT License — do whatever you want with it.
