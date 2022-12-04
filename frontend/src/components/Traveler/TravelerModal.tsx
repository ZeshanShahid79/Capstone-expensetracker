import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerModel } from "./TravelerModel/TravelerModel";
import axios from "axios";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

type TravelerModalProps = {
  modalIsOpen: boolean;
  traveler: TravelerModel;
  closeModal: () => void;
  fetchAllTraveler: () => void;
  fetchAllTravelerGroups: () => void;
};

export default function TravelerModal(props: TravelerModalProps) {
  const [name, setName] = useState(props.traveler.name);

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
        props.closeModal();
        props.fetchAllTraveler();
        props.fetchAllTravelerGroups();
        return response.data;
      })
      .catch((error) => console.log("error =>" + error));
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateTraveler();
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      contentLabel={"update Traveler"}
    >
      <h1>Update Traveler</h1>
      <form onSubmit={handleFormSubmit}>
        <label>name:</label>
        <input type={"text"} value={name} onChange={handleNewName} />
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
      </form>
    </Modal>
  );
}
