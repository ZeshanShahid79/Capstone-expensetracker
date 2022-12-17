import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import RegisterPage from "./RegisterPage";
import styled from "styled-components";
import {
  AppBar,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

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
    <StyledLogin>
      <StyledHeader>
        <AppBar position={"sticky"}>
          <Toolbar sx={{ height: 100 }}>
            <Typography variant="h3" color={"white"}>
              TravelEx
            </Typography>
          </Toolbar>
        </AppBar>
      </StyledHeader>
      <Typography variant={"h6"} color={"primary"}>
        Login
      </Typography>
      <StyledLoginForm onSubmit={handleLogInForm}>
        <Stack spacing={2}>
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
        </Stack>
        <Stack spacing={2}>
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
        </Stack>
      </StyledLoginForm>
    </StyledLogin>
  );
}
const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
  height: 567px;
`;
const StyledLogin = styled.div`
  padding: 0;
  text-align: center;
  overflow: scroll;
`;

const StyledHeader = styled.header`
  margin-bottom: 16px;
`;
