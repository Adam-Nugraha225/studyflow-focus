const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const app = express();
// Menggunakan port 8080 sesuai kebutuhan tugas
const PORT = process.env.PORT || 8080; 

// --- SECURITY: CORS WHITELISTING ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://studyflow-focus-zeta.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Memperbolehkan request tanpa origin (seperti Postman) 
    // atau yang terdaftar di whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Akses diblokir oleh kebijakan CORS!'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// --- MIDDLEWARE SETUP ---
// Helmet membantu mengamankan aplikasi dengan mengatur berbagai header HTTP
app.use(helmet({ 
  contentSecurityPolicy: false // Dimatikan agar tidak menghalangi fetch dari domain berbeda saat testing
})); 
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
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) { 
    console.error("Error membaca database:", error);
    return []; 
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error menulis ke database:", error);
  }
};

// --- API ROUTES ---

// Endpoint GET untuk mengambil semua tugas
app.get('/api/tasks', (req, res) => {
  res.json(readData());
});

// Endpoint POST untuk menambah tugas baru
app.post('/api/tasks', (req, res) => {
  const { title, category, duration, priority } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: "Judul tugas wajib diisi" });
  }

  const tasks = readData();
  const newTask = {
    id: Date.now(), // Menggunakan timestamp sebagai ID sederhana
    title,
    category: category || 'Umum',
    duration: duration || 'Tidak ditentukan',
    priority: priority || 'Medium',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  writeData(tasks);
  res.status(201).json(newTask);
});

// Endpoint PATCH untuk update status completed
app.patch('/api/tasks/:id', (req, res) => {
  let tasks = readData();
  const index = tasks.findIndex(t => t.id == req.params.id);
  
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    writeData(tasks);
    return res.json(tasks[index]);
  }
  res.status(404).json({ message: "Tugas tidak ditemukan" });
});

// Endpoint DELETE untuk menghapus tugas
app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readData();
  const newTasks = tasks.filter(t => t.id != req.params.id);
  
  if (tasks.length === newTasks.length) {
    return res.status(404).json({ message: "Tugas tidak ditemukan" });
  }
  
  writeData(newTasks);
  res.json({ message: "Tugas berhasil dihapus" });
});

// Jalankan inisialisasi database sebelum server start
initDatabase();

app.listen(PORT, () => {
  console.log(`=======================================`);
  console.log(`Backend StudyFlow jalan di port: ${PORT}`);
  console.log(`Siap menerima request dari:`);
  console.log(`- Lokal: http://localhost:3000`);
  console.log(`- Vercel: https://studyflow-focus-zeta.vercel.app`);
  console.log(`=======================================`);
});