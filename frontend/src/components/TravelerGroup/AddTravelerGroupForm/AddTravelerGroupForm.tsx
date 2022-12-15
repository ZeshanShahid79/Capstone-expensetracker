import { ChangeEvent, FormEvent, useState } from "react";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";
import axios from "axios";
import { Alert, Button, IconButton, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { GroupMemberModel } from "../TravelerGroupModel/GroupMember";
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
    <section>
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
      <h2>Add TravelerGroup</h2>
      <div>
        <h3>Selected Travelers</h3>
        {selectedTravelers.map((traveler) => (
          <StyledSelectedTraveler key={traveler.id}>
            <p>{traveler.name}</p>
            <IconButton onClick={() => handleRemoveFromList(traveler.id)}>
              <HighlightOffIcon fontSize={"small"} color={"primary"} />
            </IconButton>
          </StyledSelectedTraveler>
        ))}
      </div>
      <form onSubmit={handleTravelerFrom}>
        <TextField
          label={"Group Name"}
          placeholder={"Mallorca 2022"}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          size={"small"}
        />
        <TextField
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
      </form>
    </section>
  );
}

const StyledSelectedTraveler = styled.div`
  display: flex;
  justify-content: center;
`;
