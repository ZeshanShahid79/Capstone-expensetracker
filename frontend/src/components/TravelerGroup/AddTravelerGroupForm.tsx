import React, { ChangeEvent, FormEvent, useState } from "react";
import { TravelerModel } from "../Traveler/TravelerModel";
import axios from "axios";
import {
  Alert,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { GroupMemberModel } from "./GroupMember";
import styled from "styled-components";

type AddTravelerProps = {
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
};
export default function AddTravelerGroupForm(props: AddTravelerProps) {
  const [description, setDescription] = useState("");
  const [selectedTravelers, setSelectedTravelers] = useState<
    GroupMemberModel[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const postTravelerGroup = () => {
    axios
      .post("/api/traveler-groups", {
        description,
        travelerList: selectedTravelers,
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage(description + ": " + response.statusText);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error =>" + error);

          setErrorMessage(error.response.data);
        }
      })
      .then(props.fetchAllTravelerGroups);
  };

  const handleRemoveFromList = (id: string) => {
    const filteredList = selectedTravelers.filter(
      (traveler) => traveler.id !== id
    );
    setSelectedTravelers(filteredList);
  };

  const handleSelectTraveler = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    const traveler = props.travelers.find((traveler) => traveler.id === id);
    const isSelected = selectedTravelers.find((traveler) => traveler.id === id);
    if (!isSelected && traveler) {
      const newMember = { ...traveler, amount: 0, due: 0 };
      setSelectedTravelers([...selectedTravelers, newMember]);
    }
  };

  const handleTravelerFrom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTravelerGroup();
    setDescription("");
    setSelectedTravelers([]);
  };
  return (
    <StyledSection>
      <Typography variant={"h6"} color={"primary"}>
        Add TravelerGroup
      </Typography>
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
      <StyledAddTravelerGroupForm onSubmit={handleTravelerFrom}>
        <Typography variant={"subtitle1"} color={"secondary"}>
          Selected Travellers
        </Typography>
        <Stack>
          {selectedTravelers.map((traveler) => (
            <StyledSelectedTraveler key={traveler.id}>
              <p>{traveler.name}</p>
              <IconButton onClick={() => handleRemoveFromList(traveler.id)}>
                <HighlightOffIcon fontSize={"small"} color={"primary"} />
              </IconButton>
            </StyledSelectedTraveler>
          ))}
        </Stack>
        <Stack spacing={2}>
          <TextField
            sx={{ zIndex: 0 }}
            label={"Group Name"}
            placeholder={"Mallorca 2022"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            size={"small"}
          />
          <TextField
            sx={{ zIndex: 0 }}
            label={"Select Traveller"}
            select
            value={""}
            onChange={handleSelectTraveler}
            size={"small"}
          >
            {props.travelers.map((traveler) => {
              return (
                <MenuItem key={traveler.id} value={traveler.id}>
                  {traveler.name}
                </MenuItem>
              );
            })}
          </TextField>
          <Button
            type={"submit"}
            variant={"outlined"}
            color={"primary"}
            endIcon={<AddIcon />}
          >
            Add TravelerGroup
          </Button>
        </Stack>
      </StyledAddTravelerGroupForm>
    </StyledSection>
  );
}

const StyledSelectedTraveler = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledAddTravelerGroupForm = styled.form`
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
