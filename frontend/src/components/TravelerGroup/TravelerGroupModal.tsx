import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerGroupModel } from "./TravelerGroupModel";
import axios from "axios";
import { TravelerModel } from "../Traveler/TravelerModel";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { GroupMemberModel } from "./GroupMember";
import CardInTGModal from "./CardInTGModal";
import styled from "styled-components";

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
    event: SelectChangeEvent<HTMLSelectElement>
  ) => {
    const id = event.target.value;
    const traveler = props.travelers.find((traveler) => traveler.id === id);
    const isSelected = travelersInGroup.find((traveler) => traveler.id === id);
    if (!isSelected && traveler) {
      const newMember = { ...traveler, amount: 0, due: 0 };
      setTravelersInGroup([...travelersInGroup, newMember]);
    }
  };
  const handleRemoveFromList = (id: string) => {
    const filteredList = travelersInGroup.filter(
      (traveler) => traveler.id !== id
    );
    setTravelersInGroup(filteredList);
  };

  const customStylesTg = {
    content: {
      height: "400px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      overflow: "scroll",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      contentLabel={"update Traveler"}
      style={customStylesTg}
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
      <Typography variant={"h5"} color={"primary"} marginBottom={2}>
        Update TravellerGroup
      </Typography>
      <StyledTravellerGroupModalForm onSubmit={handleFormSubmit}>
        <TextField
          sx={{ marginTop: 2 }}
          label={"Group Name"}
          size={"small"}
          value={description}
          onChange={handleNewDescription}
        />
        <Box m={2}>
          {travelersInGroup.map((traveler) => (
            <Card sx={{ marginBottom: 2 }}>
              <CardContent>
                <CardInTGModal
                  key={traveler.id}
                  traveler={traveler}
                  travelerGroupId={props.travelerGroup.id}
                  handleRemoveFromList={handleRemoveFromList}
                  fetchAllTravelerGroups={props.fetchAllTravelerGroups}
                  getBillForGroup={props.getBillForGroup}
                  closeModal={props.closeModal}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
        <Stack spacing={2}>
          <Select
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
          </Select>

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
      </StyledTravellerGroupModalForm>
    </Modal>
  );
}
const StyledTravellerGroupModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  gap: 6px;
  overflow-y: scroll;
`;
