import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import Subject from './models/Subject.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dataPath = path.join(process.cwd(), 'studyData.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const subjects = JSON.parse(raw);

  await Subject.insertMany(subjects);
  console.log(`Inserted ${subjects.length} records.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
