import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import styled from "styled-components";

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
    <StyledRegister>
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
      <Typography variant={"h6"} color={"primary"}>
        Registration
      </Typography>
      <StyledLoginForm onSubmit={handleRegisterSubmit}>
        <Stack spacing={2}>
          <TextField
            color={"primary"}
            label={"Username"}
            value={username}
            type="text"
            id="Username"
            size={"small"}
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            color={"primary"}
            label={"Password"}
            type="password"
            value={password}
            id="Password"
            size={"small"}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            color={"primary"}
            label={"Confirm Password"}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            size={"small"}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Stack>
        <Stack spacing={2} direction={"column"}>
          <Button
            onClick={() => register()}
            size={"small"}
            variant={"contained"}
            color={"primary"}
          >
            Register
          </Button>
          <Button
            onClick={() => props.wouldLikeRegister(false)}
            size={"small"}
            variant={"outlined"}
            color={"primary"}
          >
            Cancel
          </Button>
        </Stack>
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
      </StyledLoginForm>
    </StyledRegister>
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

const StyledRegister = styled.div`
  padding: 0;
  text-align: center;
  overflow: scroll;
  margin-top: 16px;
`;
