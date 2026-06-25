require('dotenv').config();
const app = require('./app');
const supabase  = require('./config/supabase'); // kalau export object
 
 
const PORT = process.env.PORT || 5000;

// Sync database and start server
const startServer = async () => {
  try {
    const bcrypt = require("bcryptjs");

const hashed = await bcrypt.hash("12345", 10);
console.log(hashed);
    

    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
