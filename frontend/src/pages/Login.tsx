import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Импортирай нужните икони от React Icons
import { FaRegEnvelope, FaLock, FaUserCircle } from "react-icons/fa";

const Login: React.FC = () => {
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
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Успешен логин! Добре дошли, " + data.user.username);
        setIsSuccess(true);
        console.log("Потребителски данни:", data.user);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(
          `Грешка при логин: ${
            data.message || "Невалидни идентификационни данни."
          }`
        );
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
    <div className="auth-form-wrapper login-page">
      <div className="auth-form-wrapper__avatar">
        {" "}
        {/* Див за аватара */}
        <FaUserCircle className="auth-form-wrapper__avatar-icon" />{" "}
        {/* Икона на потребител */}
      </div>
      <h2 className="login-page__title">Логин</h2>
      <form onSubmit={handleSubmit} className="form">
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
        {/* Добавяне на Remember me и Forgot Password? */}
        <div className="form__options">
          <div className="form__checkbox-group">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Запомни ме</label>
          </div>
          <Link to="/forgot-password" className="form__forgot-password">
            Забравена парола?
          </Link>
        </div>
        <button type="submit" className="button button--primary button--block">
          Вход
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
        Нямаш акаунт? <Link to="/register">Регистрирай се тук</Link>
      </p>
    </div>
  );
};

export default Login;
