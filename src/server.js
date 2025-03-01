// import express from 'express';
// import mysql from 'mysql2';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import cors from 'cors';
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
//  // Add this at the top with other imports

// // Add this with your other middleware



// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads', 'prescriptions');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// // Set up the multer middleware
// const upload = multer({ storage: storage });

// // Serve static files from uploads directory
// app.use('/image/uploads', express.static(path.join(__dirname, 'uploads')));


// // MySQL Database connection
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'yash345', // Your MySQL password
//   database: 'elder_ring', // Your database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// }).promise(); // Use promise wrapper for async/await

// // Create users table
// async function createUsersTable() {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     console.log('Users table created or already exists');
//   } catch (err) {
//     console.error('Error creating users table:', err);
//   }
// }

// createUsersTable();

// // Auth routes
// app.post('/api/auth/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     // Input validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: 'Invalid email format' });
//     }

//     // Check if user already exists
//     const [existingUsers] = await pool.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );
    
//     if (existingUsers.length > 0) {
//       return res.status(409).json({ error: 'User already exists' });
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Insert new user
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//       [name, email, hashedPassword]
//     );

//     // Get the created user
//     const [newUser] = await pool.query(
//       'SELECT id, name, email, created_at FROM users WHERE id = ?',
//       [result.insertId]
//     );

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: result.insertId, email },
//       'your_jwt_secret', // Replace with actual secret from environment variables
//       { expiresIn: '24h' }
//     );

//     res.status(201).json({
//       message: 'User created successfully',
//       user: newUser[0],
//       token
//     });

//   } catch (err) {
//     console.error('Error in signup:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login route
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find user by email
//     const [users] = await pool.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );

//     const user = users[0];

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Check password
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       'your_jwt_secret', // Replace with actual secret from environment variables
//       { expiresIn: '24h' }
//     );

//     res.json({
//       message: 'Login successful',
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         created_at: user.created_at
//       },
//       token
//     });

//   } catch (err) {
//     console.error('Error in login:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// // Middleware to protect routes
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }

//   try {
//     const verified = jwt.verify(token, 'your_jwt_secret');
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(403).json({ error: 'Invalid token' });
//   }
// };

// // Protected route example
// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });


// async function createOrdersTable() {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS orders (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT NOT NULL,
//         full_name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         address VARCHAR(255) NOT NULL,
//         city VARCHAR(255) NOT NULL,
//         state VARCHAR(100) NOT NULL,
//         zip_code VARCHAR(20) NOT NULL,
//         product_title VARCHAR(255) NOT NULL,
//         price DECIMAL(10, 2) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (user_id) REFERENCES users(id)
//       )
//     `);
//     console.log('Orders table created or already exists');
//   } catch (err) {
//     console.error('Error creating orders table:', err);
//     console.error('SQL Error State:', err.sqlState);
//     console.error('SQL Error Message:', err.sqlMessage);
//   }
// }

// // Call this function to ensure the table exists
// createOrdersTable();
// // Add this function to create a prescription uploads table
// async function createPrescriptionUploadsTable() {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS prescription_uploads (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         order_id INT NOT NULL,
//         file_name VARCHAR(255) NOT NULL,
//         file_path VARCHAR(255) NOT NULL,
//         upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
//       )
//     `);
//     console.log('Prescription uploads table created or already exists');
//   } catch (err) {
//     console.error('Error creating prescription uploads table:', err);
//   }
// }

// // Add this function to modify the orders table to include medicine-specific fields
// async function updateOrdersTableForMedicine() {
//   try {
//     // Check if the column exists first to avoid errors
//     const [columns] = await pool.query(`
//       SHOW COLUMNS FROM orders LIKE 'is_medicine'
//     `);
    
//     if (columns.length === 0) {
//       await pool.query(`
//         ALTER TABLE orders 
//         ADD COLUMN is_medicine BOOLEAN DEFAULT FALSE,
//         ADD COLUMN requires_prescription BOOLEAN DEFAULT FALSE
//       `);
//       console.log('Orders table updated with medicine-specific columns');
//     } else {
//       console.log('Medicine-specific columns already exist in orders table');
//     }
//   } catch (err) {
//     console.error('Error updating orders table for medicine:', err);
//   }
// }

// // Call these functions during server startup
// createPrescriptionUploadsTable();
// updateOrdersTableForMedicine();


// // And update the second one like this:
// app.post('/api/checkout', authenticateToken, upload.single('prescriptionFile'), async (req, res) => {
//   console.log('Checkout request received:', req.body);
  
//   try {
//     const { shipping, items, totalPrice, isMedicine, requiresPrescription } = req.body;
//     const userId = req.user.userId;
    
//     // Detailed validation with specific error messages
//     if (!shipping) {
//       return res.status(400).json({ error: 'Missing shipping information' });
//     }
    
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ error: 'Missing or invalid items information' });
//     }
    
//     if (totalPrice === undefined || totalPrice <= 0) {
//       return res.status(400).json({ error: 'Invalid price information' });
//     }

//     // More detailed validation of shipping fields
//     const requiredShippingFields = ['fullName', 'email', 'address', 'city', 'state', 'zipCode'];
//     for (const field of requiredShippingFields) {
//       if (!shipping[field]) {
//         return res.status(400).json({ error: `Missing required shipping field: ${field}` });
//       }
//     }
    
//     console.log('Validation passed, attempting to insert order');
    
//     // Insert order with prescription info
//     const [result] = await pool.query(
//       `INSERT INTO orders 
//        (user_id, full_name, email, address, city, state, zip_code, product_title, price, is_medicine, requires_prescription) 
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         userId,
//         shipping.fullName,
//         shipping.email,
//         shipping.address,
//         shipping.city,
//         shipping.state,
//         shipping.zipCode,
//         items[0].title,
//         totalPrice,
//         isMedicine === 'true' || isMedicine === true,
//         requiresPrescription === 'true' || requiresPrescription === true
//       ]
//     );
    
//     // Handle the uploaded prescription file if present
//     if (req.file) {
//       const filePath = `/uploads/prescriptions/${req.file.filename}`;
      
//       // Record the prescription upload
//       await pool.query(
//         `INSERT INTO prescription_uploads (order_id, file_name, file_path) VALUES (?, ?, ?)`,
//         [result.insertId, req.file.originalname, filePath]
//       );
      
//       console.log('Prescription file uploaded and recorded in database:', req.file);
//     }
    
//     console.log('Order inserted successfully, result:', result);
    
//     res.status(201).json({
//       message: 'Order placed successfully',
//       orderId: result.insertId
//     });
//   } catch (err) {
//     console.error('Error in checkout:', err);
//     res.status(500).json({ error: 'Internal server error during checkout. Please try again.' });
//   }
// });

// // Get user's orders with improved error handling
// app.get('/api/orders', authenticateToken, async (req, res) => {
//   try {
//     const [orders] = await pool.query(
//       'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
//       [req.user.userId]
//     );
    
//     res.json({ orders });
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// export default app;


import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
 // Add this at the top with other imports

// Add this with your other middleware



const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads', 'prescriptions');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Set up the multer middleware
const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/image/uploads', express.static(path.join(__dirname, 'uploads')));


// MySQL Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yash345', // Your MySQL password
  database: 'elder_ring', // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // Use promise wrapper for async/await

// Create users table
async function createUsersTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists');
  } catch (err) {
    console.error('Error creating users table:', err);
  }
}

createUsersTable();

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Get the created user
    const [newUser] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, email },
      'your_jwt_secret', // Replace with actual secret from environment variables
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: newUser[0],
      token
    });

  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'your_jwt_secret', // Replace with actual secret from environment variables
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      token
    });

  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


async function createOrdersTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        product_title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    console.log('Orders table created or already exists');
  } catch (err) {
    console.error('Error creating orders table:', err);
    console.error('SQL Error State:', err.sqlState);
    console.error('SQL Error Message:', err.sqlMessage);
  }
}

// Call this function to ensure the table exists
createOrdersTable();
// Add this function to create a prescription uploads table
async function createPrescriptionUploadsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS prescription_uploads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);
    console.log('Prescription uploads table created or already exists');
  } catch (err) {
    console.error('Error creating prescription uploads table:', err);
  }
}

// Add this function to modify the orders table to include medicine-specific fields
async function updateOrdersTableForMedicine() {
  try {
    // Check if the column exists first to avoid errors
    const [columns] = await pool.query(`
      SHOW COLUMNS FROM orders LIKE 'is_medicine'
    `);
    
    if (columns.length === 0) {
      await pool.query(`
        ALTER TABLE orders 
        ADD COLUMN is_medicine BOOLEAN DEFAULT FALSE,
        ADD COLUMN requires_prescription BOOLEAN DEFAULT FALSE
      `);
      console.log('Orders table updated with medicine-specific columns');
    } else {
      console.log('Medicine-specific columns already exist in orders table');
    }
  } catch (err) {
    console.error('Error updating orders table for medicine:', err);
  }
}

// Call these functions during server startup
createPrescriptionUploadsTable();
updateOrdersTableForMedicine();


// Update the checkout route to handle file uploads for prescriptions
app.post('/api/checkout', authenticateToken, upload.single('prescriptionFile'), async (req, res) => {
  console.log('Checkout request received:', req.body);
  
  try {
    const { shipping, items, totalPrice, isMedicine, requiresPrescription } = req.body;
    const userId = req.user.userId;
    
    // Validation code (same as before)
    
    // Insert order with prescription info
    const [result] = await pool.query(
      `INSERT INTO orders 
       (user_id, full_name, email, address, city, state, zip_code, product_title, price, is_medicine, requires_prescription) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        shipping.fullName,
        shipping.email,
        shipping.address,
        shipping.city,
        shipping.state,
        shipping.zipCode,
        items[0].title,
        totalPrice,
        isMedicine === 'true' || isMedicine === true,
        requiresPrescription === 'true' || requiresPrescription === true
      ]
    );
    
    // Handle the uploaded prescription file if present
    if (req.file) {
      const filePath = `/uploads/prescriptions/${req.file.filename}`;
      
      // Record the prescription upload
      await pool.query(
        `INSERT INTO prescription_uploads (order_id, file_name, file_path) VALUES (?, ?, ?)`,
        [result.insertId, req.file.originalname, filePath]
      );
      
      console.log('Prescription file uploaded and recorded in database:', req.file);
    }
    
    console.log('Order inserted successfully, result:', result);
    
    res.status(201).json({
      message: 'Order placed successfully',
      orderId: result.insertId
    });
  } catch (err) {
    console.error('Error in checkout:', err);
    res.status(500).json({ error: 'Internal server error during checkout. Please try again.' });
  }
});

async function createProductsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        subcategory_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        availability VARCHAR(50) DEFAULT 'In Stock',
        is_medicine BOOLEAN DEFAULT FALSE,
        requires_prescription BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Products table created or already exists');
  } catch (err) {
    console.error('Error creating products table:', err);
  }
}

createProductsTable();

// Sample data insertion function - run this once to populate the database with sample products
async function insertSampleProducts() {
  try {
    // First check if products already exist to avoid duplicates
    const [existingProducts] = await pool.query('SELECT COUNT(*) as count FROM products');
    
    if (existingProducts[0].count > 0) {
      console.log('Products already exist, skipping sample data insertion');
      return;
    }
    
    // Sample products data
    const products = [
      {
        category_id: 1,
        subcategory_id: 101,
        name: 'Premium Wheelchair',
        description: 'A comfortable wheelchair with adjustable features and easy maneuverability.',
        price: 799.99,
        image: '/image/Prodlist/Mobility/img_2.jpg',
        is_medicine: false,
        requires_prescription: false
      },
      {
        category_id: 1,
        subcategory_id: 102,
        name: 'Deluxe Walker',
        description: 'Stable walker with height adjustment and foldable design for easy storage.',
        price: 149.99,
        image: '/image/Prodlist/Mobility/img_3.jpg',
        is_medicine: false,
        requires_prescription: false
      },
      {
        category_id: 6,
        subcategory_id: 103,
        name: 'Advanced Nebulizer',
        description: 'Medical-grade nebulizer for respiratory treatments. Requires a prescription.',
        price: 129.99,
        image: '/image/Prodlist/Devices/img_2.jpg',
        is_medicine: true,
        requires_prescription: true
      }
    ];
    
    // Insert products
    for (const product of products) {
      await pool.query(
        `INSERT INTO products 
         (category_id, subcategory_id, name, description, price, image, is_medicine, requires_prescription) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.category_id,
          product.subcategory_id,
          product.name,
          product.description,
          product.price,
          product.image,
          product.is_medicine,
          product.requires_prescription
        ]
      );
    }
    
    console.log('Sample products inserted successfully');
  } catch (err) {
    console.error('Error inserting sample products:', err);
  }
}

insertSampleProducts();

// Get products by category and subcategory
app.get('/api/products/category/:categoryId/subcategory/:subcategoryId', async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;
    
    const [products] = await pool.query(
      'SELECT * FROM products WHERE category_id = ? AND subcategory_id = ?',
      [categoryId, subcategoryId]
    );
    
    res.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const [products] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Transform the database schema to match our frontend model
    const product = {
      id: products[0].id,
      name: products[0].name,
      description: products[0].description,
      price: parseFloat(products[0].price),
      image: products[0].image,
      availability: products[0].availability,
      isMedicine: products[0].is_medicine === 1,
      requiresPrescription: products[0].requires_prescription === 1
    };
    
    res.json({ product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get user's orders with improved error handling
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );
    
    res.json({ orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;