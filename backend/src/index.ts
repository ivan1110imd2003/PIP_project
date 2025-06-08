import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs"; // За хеширане на пароли
import { createDBConnection } from "./db";
import dotenv from "dotenv"; // Зарежда променливите от .env

dotenv.config(); // Зарежда променливите от .env
const app = express();
const PORT = process.env.PORT || 3000; // Взима порта от .env или default 3000

app.use(express.json()); // За парсване на JSON заявки
app.use(cors()); // Разрешава CORS за всички домейни (за разработка)

// Основен рут за проверка
app.get("/", (_req, res) => {
  res.send("Добре дошли в API-то на проекта!");
});

// Рут за извличане на потребители (от преди)
app.get("/users", async (_req, res) => {
  let db: any = null;
  try {
    db = await createDBConnection();
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Грешка при достъп до базата данни:", err);
    res.status(500).send("Грешка при достъп до базата данни");
  } finally {
    if (db) {
      await db.end();
    }
  }
});

// ----- НОВИ РУТОВЕ ЗА РЕГИСТРАЦИЯ И ЛОГИН -----

// Рут за регистрация
app.post("/register", async (req, res) => {
  let db: any = null;
  const { username, email, password } = req.body;

  // Базова валидация
  if (!username || !email || !password) {
    return res.status(400).send("Всички полета са задължителни.");
  }

  try {
    db = await createDBConnection();

    // Проверка дали потребителското име или имейл вече съществуват
    const [existingUsers]: any = await db.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .send("Потребителското име или имейл вече са заети.");
    }

    // Хеширане на паролата
    const hashedPassword = await bcrypt.hash(password, 10); // 10 е saltRounds, по-голямо число е по-сигурно, но по-бавно

    // Вмъкване на новия потребител в базата данни
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).send("Потребителят е регистриран успешно!");
  } catch (err) {
    console.error("Грешка при регистрация:", err);
    res.status(500).send("Грешка при регистрация.");
  } finally {
    if (db) {
      await db.end();
    }
  }
});

// Рут за логин
app.post("/login", async (req, res) => {
  let db: any = null;
  const { email, password } = req.body; // Може да е username или email, зависи как решиш да се логват

  if (!email || !password) {
    return res.status(400).send("Имейл и парола са задължителни.");
  }

  try {
    db = await createDBConnection();

    // Намиране на потребителя по имейл
    const [users]: any = await db.query(
      "SELECT id, username, email, password FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).send("Невалидни идентификационни данни."); // Общо съобщение за сигурност
    }

    const user = users[0];

    // Сравняване на подадената парола с хешираната в базата данни
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Невалидни идентификационни данни.");
    }

    // Ако логинът е успешен:
    // В реално приложение тук би върнал JWT токен. Засега, просто съобщение.
    res.status(200).json({
      message: "Успешен логин!",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Грешка при логин:", err);
    res.status(500).send("Грешка при логин.");
  } finally {
    if (db) {
      await db.end();
    }
  }
});

app.get("/trips", async (req, res) => {
  let db: any = null;

  try {
    db = await createDBConnection();
    const [rows] = await db.query(
      "SELECT * FROM trips ORDER BY start_date ASC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Грешка при извличане на пътувания:", error);
    res.status(500).json({ message: "Грешка при извличане на пътувания." });
  }
});

app.listen(PORT, () => {
  console.log(`Сървърът работи на http://localhost:${PORT}`);
});
