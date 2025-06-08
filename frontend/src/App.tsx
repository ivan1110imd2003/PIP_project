import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TripsList from "./pages/TripsList";
import type { User } from "./types/User"; // Увери се, че пътят е правилен

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <Link to="/register" className="main-nav__link">
              Регистрация
            </Link>
          </li>
          <li className="main-nav__item">
            <Link to="/login" className="main-nav__link">
              Вход
            </Link>
          </li>
          <li className="main-nav__item">
            <Link to="/trips" className="main-nav__link">
              Почивки
            </Link>
          </li>
          <li className="main-nav__item">
            <Link to="/users" className="main-nav__link">
              Всички потребители (тест)
            </Link>
          </li>
        </ul>
      </nav>
      {/* Обвиваме Routes в wrapper, за да може централното съдържание да е добре позиционирано */}
      <div className="app-content-wrapper">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Можеш да добавиш и начална страница или редирект */}
          <Route
            path="/trips"
            element={
              <div className="container container--centered">
                <TripsList />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="container container--centered">
                <h1>Добре дошли в нашия проект!</h1>
                <p>Моля, регистрирайте се или влезте в системата.</p>
              </div>
            }
          />
          {/* Пример за защитен рут след логин - може да го направиш по-късно */}
          <Route
            path="/dashboard"
            element={
              <div className="container container--centered">
                <h2>Добре дошли в таблото за управление!</h2>
                <p>Това е защитена страница.</p>
              </div>
            }
          />
          {/* Временен рут за тестване на users API */}
          <Route
            path="/users"
            element={
              <div className="container container--centered">
                {" "}
                {/* ОБВИТО ТУК! */}
                <UsersList />
              </div>
            }
          />
          {/* Временен рут за забравена парола */}
          <Route
            path="/forgot-password"
            element={
              <div className="container container--centered">
                <h2 style={{ color: "#333" }}>Възстановяване на парола</h2>
                <p style={{ color: "#666", textAlign: "center" }}>
                  Моля, въведете вашия имейл адрес, за да възстановите паролата
                  си.
                </p>
                {/* Тук може да добавиш форма за възстановяване на парола */}
              </div>
            }
          />
        </Routes>
      </div>{" "}
      {/* Край на app-content-wrapper */}
    </Router>
  );
}

// Временен компонент за тестване на users API (може да го преместиш в отделен файл по-късно)
const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (e: any) {
        setError(`Грешка при зареждане на потребители: ${e.message}`);
      }
    };
    fetchUsers();
  }, []);

  if (error) return <p className="message message--error">{error}</p>;
  if (users.length === 0)
    return <p className="message">Няма регистрирани потребители.</p>;

  return (
    <div className="users-list-page">
      {" "}
      {/* users-list-page е самият "блок" за списъка */}
      <h2 className="users-list-page__title">Регистрирани потребители</h2>
      <ul className="users-list__list">
        {users.map((user: User) => (
          <li key={user.id} className="users-list__item">
            <span className="users-list__label">ID:</span>{" "}
            <span className="users-list__value">{user.id}</span>
            <br />
            <span className="users-list__label">Потребителско име:</span>{" "}
            <span className="users-list__value">{user.username}</span>
            <br />
            <span className="users-list__label">Имейл:</span>{" "}
            <span className="users-list__value">{user.email}</span>
            <br />
            {/* Увери се, че created_at съществува и е валиден за Date */}
            <span className="users-list__label">Регистриран на:</span>{" "}
            <span className="users-list__value">
              {user.created_at
                ? new Date(user.created_at).toLocaleString()
                : "N/A"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
