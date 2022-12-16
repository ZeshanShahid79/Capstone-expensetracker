import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

type AddTravelerProps = {
  fetchAllTravelers: () => void;
};
export default function AddTravelerForm(props: AddTravelerProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const postTraveler = () => {
    axios
      .post("/api/travelers", {
        name,
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage(name + ": " + response.statusText);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error =>" + error);
          setErrorMessage(error.response.data);
        }
      })
      .then(props.fetchAllTravelers);
  };

  const handleTravelerFrom = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTraveler();

    setName("");
  };
  return (
    <StyledSection>
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
        Add Traveler
      </Typography>
      <StyledAddTravelerForm onSubmit={handleTravelerFrom}>
        <Stack spacing={2}>
          <TextField
            label={"Name"}
            placeholder={"Zeshan"}
            value={name}
            onChange={(event) => setName(event.target.value)}
            size={"small"}
          />
          <Button
            type={"submit"}
            variant={"outlined"}
            color={"primary"}
            endIcon={<AddIcon />}
          >
            Add Traveler
          </Button>
        </Stack>
      </StyledAddTravelerForm>
    </StyledSection>
  );
}
const StyledAddTravelerForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
  height: 500px;
`;

const StyledSection = styled.section`
  text-align: center;
  margin-top: 16px;
`;
