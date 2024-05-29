import React from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import styles from "./Entry.module.scss";

interface EntryProps {
  option: string;
  setOption: (option: string) => void;
}

const Entry: React.FC<EntryProps> = ({ option, setOption }) => {
  return (
    <div className={styles.entry}>
      <div className={styles.bg}></div>
      <div className={styles.entryHeader}>
        <div
          className={styles.entryLoginButton}
          onClick={() => {
            setOption("Login");
          }}
        >
          LoginButton
        </div>
        <div
          className={styles.entryRegisterButton}
          onClick={() => {
            setOption("Register");
          }}
        >
          RegisterButton
        </div>
      </div>
      <div className={styles.entryContent}>
        {option === "Login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Entry;
