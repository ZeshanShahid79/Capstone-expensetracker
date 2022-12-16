import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerModel } from "./TravelerModel";
import axios from "axios";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

type TravelerModalProps = {
  modalIsOpen: boolean;
  traveler: TravelerModel;
  closeModal: () => void;
  fetchAllTraveler: () => void;
  fetchAllTravelerGroups: () => void;
};

export default function TravelerModal(props: TravelerModalProps) {
  const [name, setName] = useState(props.traveler.name);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  function handleNewName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function updateTraveler() {
    axios
      .put("/api/travelers/" + props.traveler.id, {
        id: props.traveler.id,
        name,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(name + ": " + response.statusText);
          props.fetchAllTraveler();
          props.fetchAllTravelerGroups();
          return response.data;
        }
      })
      .catch((error) => {
        if (error.respons) {
          console.log("error =>" + error);
          setErrorMessage(error.respons.data);
        }
      });
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateTraveler();
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      contentLabel={"update Traveler"}
      style={customStyles}
    >
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
      <Typography variant={"h5"} color={"primary"}>
        Update Traveller
      </Typography>
      <StyledTravellerModalForm onSubmit={handleFormSubmit}>
        <TextField label={"Name"} value={name} onChange={handleNewName} />
        <Stack spacing={2}>
          <Button
            type={"submit"}
            size={"small"}
            variant={"contained"}
            color={"primary"}
            endIcon={<EditIcon />}
          >
            update
          </Button>
          <Button
            onClick={props.closeModal}
            size={"small"}
            variant={"outlined"}
            color={"primary"}
            endIcon={<CloseIcon />}
          >
            close
          </Button>
        </Stack>
      </StyledTravellerModalForm>
    </Modal>
  );
}
const StyledTravellerModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
  height: 300px;
`;
