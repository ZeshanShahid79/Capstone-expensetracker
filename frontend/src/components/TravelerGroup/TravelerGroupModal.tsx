import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import axios from "axios";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";

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

  function handleNewDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function updateTravelerGroup() {
    axios
      .put("/api/traveler-groups/" + props.travelerGroup.id, {
        description,
        travelerList: props.travelerGroup.travelerList,
        id: props.travelerGroup.id,
      })
      .then((response) => {
        props.closeModal();
        props.fetchAllTravelerGroups();
        return response.data;
      })
      .catch((error) => console.log("error =>" + error));
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateTravelerGroup();
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      ariaHideApp={false}
      contentLabel={"update Traveler"}
    >
      <h1>Update TravelerGroup</h1>
      <form onSubmit={handleFormSubmit}>
        <label>GroupName:</label>
        <input
          type={"text"}
          value={description}
          onChange={handleNewDescription}
        />
        <button>update</button>
        <button onClick={props.closeModal}>close</button>
      </form>
    </Modal>
  );
}
