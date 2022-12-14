import axios from "axios";
import React, { useState } from "react";
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
      <main>
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
          <button onClick={() => setWouldLikeRegister(true)}>Register</button>
          <button onClick={() => login()}>LogIn</button>
        </div>
      </main>
    </>
  );
}
