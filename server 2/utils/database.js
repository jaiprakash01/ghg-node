import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Promisified database methods
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
};

const dbAll = promisify(db.all.bind(db));
const dbGet = promisify(db.get.bind(db));

// Initialize database tables
const initDatabase = async () => {
  try {
    // Users table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        organization TEXT,
        industry TEXT,
        role TEXT,
        location TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        payment_status TEXT DEFAULT 'unpaid'
      )
    `);

    // Assessments table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_score REAL NOT NULL,
        max_score REAL NOT NULL,
        accuracy REAL NOT NULL,
        governance_score REAL NOT NULL,
        social_score REAL NOT NULL,
        environment_score REAL NOT NULL,
        esg_plus_score REAL DEFAULT 0,
        grade TEXT NOT NULL,
        level TEXT NOT NULL,
        recommendations TEXT,
        answers TEXT NOT NULL,
        payment_status TEXT DEFAULT 'unpaid',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Activities table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        details TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Contacts table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        mobile TEXT,
        message TEXT NOT NULL,
        captcha_code TEXT,
        ip_address TEXT,
        user_agent TEXT,
        status TEXT DEFAULT 'new',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Refresh tokens table for permanent token management
    await dbRun(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create index for faster token lookups
    await dbRun(`
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token)
    `);
    await dbRun(`
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id)
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { db, dbRun, dbAll, dbGet, initDatabase };


    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { db, dbRun, dbAll, dbGet, initDatabase };


    `);

    // Create index for faster token lookups
    await dbRun(`
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token)
    `);
    await dbRun(`
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id)
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { db, dbRun, dbAll, dbGet, initDatabase };


    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { db, dbRun, dbAll, dbGet, initDatabase };

