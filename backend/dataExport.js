// dataExport.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import Subject from './models/Subject.js';

dotenv.config();

async function exportData() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for export');

    const docs = await Subject.find().lean();
    const outPath = path.join(process.cwd(), 'studyData.json');
    fs.writeFileSync(outPath, JSON.stringify(docs, null, 2));

    console.log(`Exported ${docs.length} records to ${outPath}`);
  } catch (err) {
    console.error('Export error:', err);
  } finally {
    mongoose.disconnect();
  }
}

exportData();
