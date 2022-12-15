import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import RegisterPage from "./RegisterPage";
import styled from "styled-components";
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";

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
          <AppBar position={"sticky"}>
            <Toolbar sx={{ height: 100 }}>
              <Typography variant="h3" color={"white"}>
                TravelEx
              </Typography>
            </Toolbar>
          </AppBar>
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
        <AppBar position={"sticky"}>
          <Toolbar sx={{ height: 100 }}>
            <Typography variant="h3" color={"white"}>
              TravelEx
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <StyledLogInForm onSubmit={handleLogInForm}>
        <Typography variant={"h6"} color={"primary"}>
          Login
        </Typography>
        <TextField
          color={"primary"}
          label={"Username"}
          type="text"
          id="Username"
          size={"small"}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          color={"primary"}
          label={"Password"}
          type="password"
          id="Password"
          size={"small"}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          onClick={() => login()}
          size={"small"}
          variant={"contained"}
          color={"primary"}
        >
          LogIn
        </Button>
        <Button
          onClick={() => setWouldLikeRegister(true)}
          size={"small"}
          variant={"outlined"}
          color={"primary"}
        >
          Register
        </Button>
      </StyledLogInForm>
    </>
  );
}
const StyledLogInForm = styled.form`
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
`;
