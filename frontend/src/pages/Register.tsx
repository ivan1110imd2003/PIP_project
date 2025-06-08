import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Импортирай нужните икони от React Icons
import { FaRegEnvelope, FaLock, FaUserAlt, FaUserCircle } from "react-icons/fa";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setIsSuccess(null);

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage("Регистрацията успешна! Моля, влезте в системата.");
        setIsSuccess(true);
        setUsername("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(`Грешка при регистрация: ${data}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Грешка при изпращане на заявката:", error);
      setMessage("Възникна мрежова грешка. Моля, опитайте отново по-късно.");
      setIsSuccess(false);
    }
  };

  return (
    // auth-form-wrapper е основният контейнер за формата
    <div className="auth-form-wrapper register-page">
      <div className="auth-form-wrapper__avatar">
        <FaUserCircle className="auth-form-wrapper__avatar-icon" />
      </div>
      <h2 className="register-page__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__group">
          <label htmlFor="username" className="form__label">
            Потребителско име
          </label>
          <div className="form__input-wrapper">
            <FaUserAlt className="form__icon" />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form__input"
              placeholder="Въведете потребителско име"
            />
          </div>
          <span className="form__line"></span> {/* Линия за анимация */}
        </div>
        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Имейл
          </label>
          <div className="form__input-wrapper">
            <FaRegEnvelope className="form__icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form__input"
              placeholder="Въведете имейл"
            />
          </div>
          <span className="form__line"></span> {/* Линия за анимация */}
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">
            Парола
          </label>
          <div className="form__input-wrapper">
            <FaLock className="form__icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form__input"
              placeholder="Въведете парола"
            />
          </div>
          <span className="form__line"></span> {/* Линия за анимация */}
        </div>
        <button type="submit" className="button button--primary button--block">
          Регистрирай се
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            isSuccess ? "message--success" : "message--error"
          }`}
        >
          {message}
        </p>
      )}
      <p className="form__link">
        Вече имаш акаунт? <Link to="/login">Влез тук</Link>
      </p>
    </div>
  );
};

export default Register;
