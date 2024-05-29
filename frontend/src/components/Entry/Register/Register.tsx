import React, { useState } from "react";
import styles from "../Form.module.scss";
import Checkbox from "./Checkbox/Checkbox";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [restaurantOwner, setRestaurantOwner] = useState<boolean>(true);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        firstName: name,
        lastName: surname,
        email: email,
        password: password,
        profilePhoto: "",
        userType: restaurantOwner,
      }),
    });
    const data = await res.json();
    if (data._id !== undefined) {
      window.location.href = "/login";
    } else {
      setName("");
      setSurname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setRestaurantOwner(false);
      setError("Registration failed");
    }
  };

  return (
    <div className={styles.holder}>
      <form onSubmit={handleRegister}>
        <h1 className={styles.formText}>Register</h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            id="surname"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
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
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className={styles.formGroup}>
          <Checkbox
            label="Restaurant owner"
            value="value" // Assuming 'value' is a string, adjust accordingly
            checked={restaurantOwner}
            onChange={({ target }) => setRestaurantOwner(!restaurantOwner)}
            name="value" // Assuming 'name' is a string, adjust accordingly
            id="value" // Assuming 'id' is a string, adjust accordingly
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        <label className={styles.error}>{error}</label>
      </form>
    </div>
  );
};

export default Register;
