import React, { ChangeEvent, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GroupMemberModel } from "./GroupMember";
import axios from "axios";
import { Button, IconButton, Stack, TextField } from "@mui/material";

type CardInTgModalProps = {
  traveler: GroupMemberModel;
  handleRemoveFromList: (id: string) => void;
  travelerGroupId: string;
  fetchAllTravelerGroups: () => void;
  getBillForGroup: () => void;
  closeModal: () => void;
};

function CardInTgModal(props: CardInTgModalProps) {
  const [newAmount, setNewAmount] = useState(props.traveler.amount);

  function handleNewAmount(event: ChangeEvent<HTMLInputElement>) {
    setNewAmount(parseFloat(parseFloat(event.target.value).toFixed(2)));
  }

  function handleSubmit() {
    axios
      .put(
        "/api/bill/" +
          props.travelerGroupId +
          "/traveller/" +
          props.traveler.id +
          "/amount",

        { amount: newAmount }
      )
      .then((response) => {
        if (response.status === 200) {
          props.fetchAllTravelerGroups();
          props.getBillForGroup();
          props.closeModal();
          return response.data;
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error =>" + error);
        }
      });
  }

  return (
    <>
      <p>{props.traveler.name}</p>
      <p>paid already: {props.traveler.amount}</p>
      <TextField
        type={"number"}
        onChange={handleNewAmount}
        value={`${newAmount}`}
        size={"small"}
      />
      <Stack spacing={2} direction={"row"}>
        <Button
          onClick={handleSubmit}
          size={"small"}
          variant={"contained"}
          color={"primary"}
        >
          Add amount
        </Button>
        <IconButton
          onClick={() => props.handleRemoveFromList(props.traveler.id)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Stack>
    </>
  );
}

export default CardInTgModal;
