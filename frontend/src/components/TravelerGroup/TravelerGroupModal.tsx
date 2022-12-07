import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import axios from "axios";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { Alert, Button, MenuItem, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { GroupMemberModel } from "./TravelerGroupModel/GroupMember";

type TravelerGroupModalProps = {
  modalIsOpen: boolean;
  travelerGroup: TravelerGroupModel;
  closeModal: () => void;
  fetchAllTravelerGroups: () => void;
  travelers: TravelerModel[];
};

export default function TravelerGroupModal(props: TravelerGroupModalProps) {
  const [description, setDescription] = useState(
    props.travelerGroup.description
  );
  const [selectedTravelers, setSelectedTravelers] = useState<
    GroupMemberModel[]
  >(props.travelerGroup.travelerList);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleNewDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function updateTravelerGroup() {
    axios
      .put("/api/traveler-groups/" + props.travelerGroup.id, {
        description,
        travelerList: selectedTravelers,
        id: props.travelerGroup.id,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(description + ": " + response.statusText);
          setShowSuccessMessage(true);
          props.closeModal();
          props.fetchAllTravelerGroups();
          return response.data;
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error =>" + error);
          setErrorMessage(error.response.data);
          setShowErrorMessage(true);
        }
      });
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateTravelerGroup();
  }

  const handleSelectTravelerInUpdateForm = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.value;
    const traveler = props.travelers.find((traveler) => traveler.id === id);
    const isSelected = selectedTravelers.find((traveler) => traveler.id === id);
    if (!isSelected && traveler) {
      const newMember = { ...traveler, amount: 0 };
      setSelectedTravelers([...selectedTravelers, newMember]);
    }
  };
  const handleRemoveFromList = (id: string) => {
    const filteredList = selectedTravelers.filter(
      (traveler) => traveler.id !== id
    );
    setSelectedTravelers(filteredList);
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      contentLabel={"update Traveler"}
    >
      {showSuccessMessage && (
        <Alert
          variant={"outlined"}
          severity={"success"}
          onClose={() => setShowSuccessMessage(false)}
        >
          {successMessage}
        </Alert>
      )}
      {showErrorMessage && (
        <Alert
          variant={"outlined"}
          severity={"error"}
          onClose={() => setShowErrorMessage(false)}
        >
          {errorMessage}
        </Alert>
      )}
      <h1>Update TravelerGroup</h1>
      {selectedTravelers.map((traveler) => (
        <div key={traveler.id}>
          <p>{traveler.name}</p>
          <button onClick={() => handleRemoveFromList(traveler.id)}>X</button>
        </div>
      ))}
      <form onSubmit={handleFormSubmit}>
        <label>GroupName:</label>
        <input
          type={"text"}
          value={description}
          onChange={handleNewDescription}
        />
        <TextField
          select
          label={"Select Traveller"}
          value={""}
          onChange={handleSelectTravelerInUpdateForm}
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
