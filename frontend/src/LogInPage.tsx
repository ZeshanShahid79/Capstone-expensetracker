import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import RegisterPage from "./RegisterPage";

type LogInPageProps = {
  fetchUsername: () => void;
};

export default function LogInPage(props: LogInPageProps) {
  const [wouldLikeRegister, setWouldLikeRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogInForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
  };

  if (wouldLikeRegister) {
    return (
      <>
        <header>
          <h1>TravelEx</h1>
        </header>
        <main>
          <RegisterPage
            wouldLikeRegister={setWouldLikeRegister}
            fetchUsername={props.fetchUsername}
          ></RegisterPage>
        </main>
      </>
    );
  }
  return (
    <>
      <header>
        <h1>TravelEx</h1>
      </header>
      <form onSubmit={handleLogInForm}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button onClick={() => login()}>LogIn</button>
        </div>
      </form>
      <button onClick={() => setWouldLikeRegister(true)}>Register</button>
    </>
  );
}
