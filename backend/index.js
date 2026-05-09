const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 

const app = express();
const PORT = process.env.PORT || 8080;

// --- SECURITY: CORS WHITELISTING ---
const allowedOrigins = [
  'http://localhost:3000', // URL Frontend saat running lokal
  'https://studyflow-focus-zeta.vercel.app' // URL Vercel kamu
];

const corsOptions = {
  origin: function (origin, callback) {
    // Izinkan jika tanpa origin (postman) atau ada di daftar whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Akses diblokir oleh kebijakan CORS!'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
};

// --- MIDDLEWARE SETUP ---
app.use(helmet({ contentSecurityPolicy: false })); // Nonaktifkan CSP sedikit agar tidak bentrok dengan fetch lokal
app.use(cors(corsOptions));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'tasks.json');

// --- DATABASE HELPER ---
const initDatabase = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) { return []; }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- API ROUTES ---
app.get('/api/tasks', (req, res) => {
  res.json(readData());
});

app.post('/api/tasks', (req, res) => {
  const { title, category, duration, priority } = req.body;
  if (!title) return res.status(400).json({ message: "Judul wajib diisi" });

  const tasks = readData();
  const newTask = {
    id: Date.now(),
    title, category, duration, priority,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  let tasks = readData();
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    writeData(tasks);
    return res.json(tasks[index]);
  }
  res.status(404).json({ message: "Not found" });
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readData();
  const newTasks = tasks.filter(t => t.id != req.params.id);
  writeData(newTasks);
  res.json({ message: "Deleted" });
});

initDatabase();
app.listen(PORT, () => {
  console.log(`Backend jalan di port ${PORT}`);
});