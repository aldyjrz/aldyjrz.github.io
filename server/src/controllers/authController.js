const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is empty'
      });
    }
    const username = req.body?.username;
    const email = req.body?.email;
    const password = req.body?.password;
    // Ini untuk validasi input, pastikan semua field diisi
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // cek apakah email sudah terdaftar
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {

    if (!req.body) {
    return res.status(400).json({
        message: 'Request body is empty'
    });
    }
    const email = req.body?.email;
    const password = req.body?.password;

    // Validation apakah ada yang kosong
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

      const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    // cek password
    const valid = await bcrypt.compare(password, data.password);

    if (!valid) {
      return res.status(401).json({ message: "Password salah" });
    } 
    // Generate JWT dengan waktu kedaluwarsa yang ditentukan di .env
    const token = jwt.sign({ id: user.id, email: user.email, level: user.level }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        level: user.level,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login };
