import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import axios from "axios";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { Alert, Button, MenuItem, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { GroupMemberModel } from "./TravelerGroupModel/GroupMember";
import CardInTGModal from "./CardInTGModal";

type TravelerGroupModalProps = {
  modalIsOpen: boolean;
  travelerGroup: TravelerGroupModel;
  closeModal: () => void;
  fetchAllTravelerGroups: () => void;
  travelers: TravelerModel[];
  getBillForGroup: () => void;
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
          props.fetchAllTravelerGroups();
          props.getBillForGroup();
          props.closeModal();
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
          <CardInTGModal
            key={traveler.id}
            traveler={traveler}
            travelerGroupId={props.travelerGroup.id}
            handleRemoveFromList={handleRemoveFromList}
            fetchAllTravelerGroups={props.fetchAllTravelerGroups}
          />
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
