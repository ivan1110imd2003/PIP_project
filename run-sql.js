import fs from 'fs';
import { Client } from 'pg';

const sql = fs.readFileSync('./scripts/init-neon-db.sql', 'utf8');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_QIEJT3zkKrl9@ep-withered-pine-a8prfezl-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },
});

async function run() {
  try {
    await client.connect();
    await client.query(sql);
    console.log('SQL script executed successfully');
  } catch (err) {
    console.error('Error executing SQL script:', err);
  } finally {
    await client.end();
  }
}

run();
