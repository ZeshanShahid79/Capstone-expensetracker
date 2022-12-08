import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import axios from "axios";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { Alert, Button, MenuItem, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
  const [travelersInGroup, setTravelersInGroup] = useState<GroupMemberModel[]>(
    props.travelerGroup.travelerList
  );
  const [errorMessageForGroupUpdate, setErrorMessageForGroupUpdate] =
    useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  function updateTravelerGroup() {
    axios
      .put("/api/traveler-groups/" + props.travelerGroup.id, {
        description,
        travelerList: travelersInGroup,
        id: props.travelerGroup.id,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage(description + ": " + response.statusText);

          props.closeModal();
          props.fetchAllTravelerGroups();
          return response.data;
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error =>" + error);
          setErrorMessageForGroupUpdate(error.response.data);
        }
      });
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateTravelerGroup();
  }

  function handleNewDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleNewAmount(event: ChangeEvent<HTMLInputElement>) {
    const newAmount = parseFloat(parseFloat(event.target.value).toFixed(2));
    const id = event.target.id;
    const updatedMembers = travelersInGroup.map((member) => {
      if (member.id === id) {
        return { ...member, amount: newAmount };
      }
      return member;
    });
    setTravelersInGroup(updatedMembers);
  }

  const handleSelectTravelerInUpdateForm = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.value;
    const traveler = props.travelers.find((traveler) => traveler.id === id);
    const isSelected = travelersInGroup.find((traveler) => traveler.id === id);
    if (!isSelected && traveler) {
      const newMember = { ...traveler, amount: 0 };
      setTravelersInGroup([...travelersInGroup, newMember]);
    }
  };
  const handleRemoveFromList = (id: string) => {
    const filteredList = travelersInGroup.filter(
      (traveler) => traveler.id !== id
    );
    setTravelersInGroup(filteredList);
  };

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
      {errorMessageForGroupUpdate && (
        <Alert
          variant={"outlined"}
          severity={"error"}
          onClose={() => setErrorMessageForGroupUpdate(undefined)}
        >
          {errorMessageForGroupUpdate}
        </Alert>
      )}
      <h1>Update TravelerGroup</h1>
      <form onSubmit={handleFormSubmit}>
        <label>GroupName:</label>

        {travelersInGroup.map((traveler) => (
          <div key={traveler.id}>
            <p>{traveler.name}</p>
            <input
              id={traveler.id}
              type={"number"}
              onChange={handleNewAmount}
              value={`${traveler.amount}`}
            />

            <button onClick={() => handleRemoveFromList(traveler.id)}>
              <DeleteForeverIcon />
            </button>
          </div>
        ))}
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
