const { login, register } = require('../controllers/authController');

describe('[LOGIN] - Login', () => {
  test('[LOGIN] - menghasilkan token jika login berhasil', async () => {
    const req = {
      body: {
        email: 'admin@example.com',
        password: 'admin123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Login successful',
      token: expect.any(String),  
    }));
  
  });


 test('[LOGIN] - return 401 jika login credentials salah', async () => {
    const req = {
      body: {
        email: 'admin@example.com',
        password: 'ngasal'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid email or password'
    });
  });   
 
  }); 

  //register test
  
describe('[REGISTER] - Register', () => {
  test('[REGISTER] - User registered successfully', async () => {
    const id = `task-${Date.now()}-${Math.random().toString(10) .substring(2, 9)}`;
    const randomEmail = () => `${id}@example.com`;
    const randomUsername = () => `user_${id}`;  
    const req = {
      body: {
        email:  randomEmail(),
        password: 'admin123',
        username: randomUsername(),
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'User registered successfully'
    }));
  
  });


 test('[REGISTER] - Email already exists', async () => {
    const req = {
      body: {
        email: 'admin@example.com',
        password: 'ngasal',
        username: 'admin'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email already registered'
    });
  });   
 
  }); 