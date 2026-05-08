const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 

const app = express();

// Konfigurasi Port Dinamis untuk Deployment
const PORT = process.env.PORT || 5000;

// --- SECURITY: CORS WHITELISTING ---
// Daftar domain yang diizinkan mengakses API ini
const allowedOrigins = [
  'http://localhost:3000', // Akses lokal saat development
  'https://studyflow-adam.vercel.app' // GANTI dengan URL Vercel asli kamu nanti
];

const corsOptions = {
  origin: function (origin, callback) {
    // Mengizinkan request tanpa origin (seperti dari Postman atau server-to-server)
    // Atau jika origin ada di dalam daftar whitelist
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Akses diblokir oleh kebijakan CORS!'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Batasi hanya metode yang diperlukan
  credentials: true,
  optionsSuccessStatus: 200 
};

// --- MIDDLEWARE SETUP ---
app.use(helmet()); // Keamanan header HTTP
app.use(cors(corsOptions)); // Terapkan CORS yang sudah diperketat
app.use(express.json());

// Pembatasan jumlah request (Rate Limiting) untuk mencegah spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { message: "Terlalu banyak permintaan dari IP ini, silakan coba lagi nanti." }
});
app.use('/api/', limiter);

const DATA_FILE = path.join(__dirname, 'tasks.json');

// --- HELPER FUNCTIONS ---

const initDatabase = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    console.log("Database tasks.json berhasil dibuat secara otomatis.");
  }
};

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error("Gagal membaca file database:", error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Gagal menulis ke database:", error);
  }
};

// --- VALIDATION MIDDLEWARE ---
const validateTask = (req, res, next) => {
  const { title, category, duration, priority } = req.body;
  
  if (!title || !category || !duration || !priority) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  if (title.length > 100) {
    return res.status(400).json({ message: "Judul terlalu panjang (maks 100 karakter)." });
  }

  next();
};

// --- API ROUTES ---

app.get('/api/tasks', (req, res) => {
  const tasks = readData();
  res.json(tasks);
});

app.post('/api/tasks', validateTask, (req, res) => {
  const tasks = readData();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    category: req.body.category,
    duration: req.body.duration,
    priority: req.body.priority,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readData();
  const taskIndex = tasks.findIndex(t => t.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  writeData(tasks);
  res.json({ message: "Status berhasil diperbarui", task: tasks[taskIndex] });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = readData();
  const initialLength = tasks.length;
  
  tasks = tasks.filter(t => t.id != id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  writeData(tasks);
  res.json({ message: "Task berhasil dihapus" });
});

// --- START SERVER ---
initDatabase();
app.listen(PORT, () => {
  console.log(`Server permanen aktif di port ${PORT}`);
  console.log(`CORS Policy: Only allowing ${allowedOrigins.join(', ')}`);
});