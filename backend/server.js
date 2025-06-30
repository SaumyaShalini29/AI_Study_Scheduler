/*
// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import subjectRoutes from './routes/subjectRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subject', subjectRoutes); // use singular to match frontend

// Health check
app.get('/', (req, res) => {
  res.send('Smart Study Scheduler API is running');
});
app.use('/api/schedule', scheduleRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
*/
/*
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import subjectRoutes from './routes/subjectRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import streakRoutes from "./routes/streak.route.js";

// Fix for root .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
//const streakRoutes = require("./routes/streak.route");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subject', subjectRoutes);
app.use('/api/schedule', scheduleRoutes);



app.use("/api/streak", streakRoutes);


// Health check
app.get('/', (req, res) => {
  res.send('Smart Study Scheduler API is running');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
*/



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import subjectRoutes from './routes/subjectRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import streakRoutes from './routes/streak.route.js';

import todoRoutes from './routes/todo.routes.js';


// Resolve current directory for .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subject', subjectRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/streak', streakRoutes);
app.use('/api/todo', todoRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Smart Study Scheduler API is running!');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
/*
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import subjectRoutes from './routes/subjectRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import streakRoutes from './routes/streak.route.js';

// Resolve current directory for .env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subject', subjectRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/streak', streakRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Smart Study Scheduler API is running!');
});

// ✅ Connect to MongoDB (no deprecated options)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
*/