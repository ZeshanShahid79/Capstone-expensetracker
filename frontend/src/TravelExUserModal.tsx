import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { TravelExUserModel } from "./TravelExUserModel";
import { useNavigate } from "react-router-dom";

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

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      contentLabel={"update Traveler"}
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
      <h1>Update TravelExUser</h1>
      <form onSubmit={handleFormSubmit}>
        <label>username:</label>
        <input type={"text"} value={username} onChange={handleNewName} />
        <Button
          type={"submit"}
          size={"small"}
          variant={"outlined"}
          color={"success"}
          endIcon={<EditIcon />}
        >
          update
        </Button>
        <Button
          onClick={props.closeModal}
          size={"small"}
          variant={"contained"}
          color={"error"}
          endIcon={<CloseIcon />}
        >
          close
        </Button>
        <Button
          onClick={deleteUer}
          size={"small"}
          variant={"contained"}
          color={"error"}
          endIcon={<CloseIcon />}
        >
          Delete User
        </Button>
      </form>
    </Modal>
  );
}
