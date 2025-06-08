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

-- Създаване на таблица за потребители (допълнение към вградената auth.users в Supabase)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Добавяне на примерни данни за екскурзии
INSERT INTO excursions (title, description, price, duration, max_people, location, rating, image_url, includes, schedule)
VALUES 
  ('Рилски манастир и Боянската църква', 'Еднодневна екскурзия до най-известния български манастир и UNESCO обект', 45.00, '8 часа', 25, 'София област', 4.8, '/placeholder.svg?height=400&width=600', 
   ARRAY['Транспорт с комфортен автобус', 'Професионален гид', 'Входни такси', 'Застраховка'],
   ARRAY['08:00 - Тръгване от София', '10:00 - Пристигане в Рилски манастир', '12:30 - Обяд (по желание)', '14:00 - Посещение на Боянската църква', '16:00 - Връщане към София', '18:00 - Пристигане в София']),
   
  ('Велико Търново - древната столица', 'Разходка из историческия център и крепостта Царевец', 55.00, '10 часа', 30, 'Велико Търново', 4.9, '/placeholder.svg?height=400&width=600', 
   ARRAY['Транспорт с комфортен автобус', 'Професионален гид', 'Входни такси', 'Застраховка'],
   ARRAY['07:00 - Тръгване от София', '10:00 - Пристигане във Велико Търново', '10:30 - Обиколка на Царевец', '13:00 - Обяд', '15:00 - Разходка в Стария град', '17:00 - Връщане към София']),
   
  ('Пловдив - Стария град', 'Обиколка на античния театър и възрожденските къщи', 40.00, '6 часа', 20, 'Пловдив', 4.7, '/placeholder.svg?height=400&width=600', 
   ARRAY['Транспорт с комфортен автобус', 'Професионален гид', 'Входни такси'],
   ARRAY['09:00 - Тръгване от София', '10:30 - Пристигане в Пловдив', '11:00 - Обиколка на Стария град', '13:00 - Обяд', '15:00 - Свободно време', '16:00 - Връщане към София']),
   
  ('Копривщица - музеят под открито небе', 'Възрожденска архитектура и история на Априлското въстание', 50.00, '7 часа', 25, 'София област', 4.6, '/placeholder.svg?height=400&width=600', 
   ARRAY['Транспорт с комфортен автобус', 'Професионален гид', 'Входни такси за музеите'],
   ARRAY['08:30 - Тръгване от София', '10:00 - Пристигане в Копривщица', '10:15 - Обиколка на възрожденските къщи', '13:00 - Обяд', '14:30 - Свободно време', '16:00 - Връщане към София']);
