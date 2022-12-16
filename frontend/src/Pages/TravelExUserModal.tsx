import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TravelExUserModel } from "./TravelExUserModel";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type TravelerModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  travelExUser: TravelExUserModel;
  fetchUsername: () => void;
  logout: () => void;
};

export default function TravelerModal(props: TravelerModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [username, setUsername] = useState(props.travelExUser.username);

  const navigate = useNavigate();

  function handleNewName(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateUser();
  }

  function updateUser() {
    axios
      .put("/api/travelex-users/" + props.travelExUser.id, {
        id: props.travelExUser.id,
        username,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(username + ": " + response.statusText);
          props.fetchUsername();
          props.closeModal();
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

  function deleteUer() {
    axios
      .delete("/api/travelex-users/" + props.travelExUser.id)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(username + ": " + response.statusText);
          props.fetchUsername();
          props.closeModal();
          return response.data;
        }
      })
      .catch((error) => {
        if (error.respons) {
          console.log("error =>" + error);
          setErrorMessage(error.respons.data);
        }
      })
      .then(props.logout)
      .then(() => navigate("/"));
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
      <Typography variant={"h6"} color={"primary"}>
        Update TravelExUser
      </Typography>
      <StyledTravellExuserModalForm onSubmit={handleFormSubmit}>
        <TextField
          sx={{ marginTop: 2 }}
          label={"Username"}
          size={"small"}
          value={username}
          onChange={handleNewName}
        />
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
        <Button
          onClick={deleteUer}
          size={"small"}
          variant={"outlined"}
          color={"error"}
          endIcon={<DeleteForeverIcon />}
        >
          Delete User
        </Button>
      </StyledTravellExuserModalForm>
    </Modal>
  );
}
const StyledTravellExuserModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
  height: 300px;
`;
