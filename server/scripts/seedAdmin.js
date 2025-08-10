const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDb = require('../src/utils/db');
const Admin = require('../src/models/Admin');

dotenv.config();

async function run() {
  await connectDb();
  const username = process.env.SEED_ADMIN_USER || 'principal';
  const password = process.env.SEED_ADMIN_PASS || 'password123';
  const hash = await bcrypt.hash(password, 10);
  await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash: hash, role: 'principal' },
    { upsert: true }
  );
  console.log('Seeded admin:', username);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


