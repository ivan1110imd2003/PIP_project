-- Създаване на таблица за екскурзии
CREATE TABLE IF NOT EXISTS excursions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  max_people INTEGER NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating DECIMAL(3, 1) DEFAULT 0,
  image_url TEXT,
  includes TEXT[] DEFAULT '{}',
  schedule TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Създаване на таблица за резервации
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  excursion_id INTEGER REFERENCES excursions(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  people INTEGER NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Създаване на таблица за потребители
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Добавяне на админ потребител (парола: admin123)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@excursions.bg', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Администратор', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Добавяне на тестов потребител (парола: user123)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('user@excursions.bg', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Тестов потребител', 'user')
ON CONFLICT (email) DO NOTHING;
