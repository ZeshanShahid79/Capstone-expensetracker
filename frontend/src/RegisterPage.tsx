import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";

type RegisterPageProps = {
  fetchUsername: () => void;
  wouldLikeRegister: (value: boolean) => void;
};

export default function RegisterPage(props: RegisterPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [failedUsername, setFailedUsername] = useState("");
  const [messageStatus, setMessageStatus] = useState("");

  const register = () => {
    axios
      .post("/api/travelex-users", {
        username,
        password,
      })
      .then((response) => response.status)
      .then((status) => {
        if (status === 200) {
          setMessageStatus(username + " erfolreich registriert.");
          setTimeout(() => props.wouldLikeRegister(false), 2000);
          setTimeout(() => login(), 2000);
          setUsername("");
          setPassword("");
          setConfirmPassword("");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setFailedUsername(username + " existiert schon.");
          setTimeout(() => setFailedUsername(""), 5000);
          setUsername("");
        }
        console.log("Error =>" + error);
      });
  };

  const login = () => {
    axios
      .get("/api/travelex-users/login", {
        auth: {
          username,
          password,
        },
      })
      .then(props.fetchUsername);
  };

  const handleRegisterSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    register();
  };

  return (
    <>
      <section>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor={"username"}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="chris_yooo"
              required
            />

            {failedUsername && <p>{failedUsername}</p>}

            <label htmlFor={"password"}>Passwort:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Bello123!"
              required
            />

            <label htmlFor={"confirmPassword"}>Passwort nochmal:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Bello123!"
              required
            />
          </div>
          <button>Register</button>
        </form>
        <div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={confirmPassword}
            messages={{
              minLength: "muss minimum 8 Zeichen enthalten",
              match: "muss übereinstimmen",
              number: "muss eine Zahl enthalten",
              specialChar: "muss ein Sonderzeichen enthalten",
              capital: "muss einen Großbuchstaben enthalten",
            }}
          />
        </div>
        <div>
          <button onClick={() => props.wouldLikeRegister(false)}>Abort</button>
        </div>
        {messageStatus && <p>{messageStatus}</p>}
      </section>
    </>
  );
}
