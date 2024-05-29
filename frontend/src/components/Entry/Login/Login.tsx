import React, { useState } from "react";
import styles from "../Form.module.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (data._id !== undefined) {
      window.location.href = "/";
    } else {
      setUsername("");
      setPassword("");
      setError("Login failed");
    }
  };

  return (
    <div className={styles.holder}>
      <form onSubmit={handleLogin}>
        <h1 className={styles.formText}>Login</h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <label className={styles.error}>{error}</label>
      </form>
    </div>
  );
};

export default Login;
