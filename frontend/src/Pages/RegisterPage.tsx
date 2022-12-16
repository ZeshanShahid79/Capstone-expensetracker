import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { Alert } from "@mui/material";

type RegisterPageProps = {
  fetchUsername: () => void;
  wouldLikeRegister: (value: boolean) => void;
};

export default function RegisterPage(props: RegisterPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const register = () => {
    axios
      .post("/api/travelex-users", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(username + ": " + response.statusText);
        }
      })
      .then(() => props.wouldLikeRegister(false))
      .then(login)

      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage(username + error.response);
        }
        console.log("Error =>" + error);
      });
    setUsername("");
    setPassword("");
    setConfirmPassword("");
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
      {successMessage && (
        <Alert
          variant={"outlined"}
          severity={"success"}
          onClose={() => setSuccessMessage(undefined)}
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          variant={"outlined"}
          severity={"error"}
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      )}
      <section>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor={"username"}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Max Mustermann"
              required
            />
            <label htmlFor={"password"}>Passwort:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Test123!"
              required
            />

            <label htmlFor={"confirmPassword"}>Passwort nochmal:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Test123!"
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
          <button onClick={() => props.wouldLikeRegister(false)}>cancel</button>
        </div>
      </section>
    </>
  );
}
