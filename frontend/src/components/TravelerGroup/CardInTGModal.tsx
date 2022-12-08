import React, { ChangeEvent, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GroupMemberModel } from "./TravelerGroupModel/GroupMember";
import axios from "axios";

type CardInTgModalProps = {
  traveler: GroupMemberModel;
  handleRemoveFromList: (id: string) => void;
  travelerGroupId: string;
  fetchAllTravelerGroups: () => void;
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
    <div key={props.traveler.id}>
      <p>{props.traveler.name}</p>
      <p>paid already: {props.traveler.amount}</p>
      <input
        type={"number"}
        onChange={handleNewAmount}
        value={`${newAmount}`}
      />
      <button onClick={handleSubmit}>Submit new Amount</button>
      <button onClick={() => props.handleRemoveFromList(props.traveler.id)}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
}

export default CardInTgModal;
