import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import axios from "axios";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { checkIfExists } from "../utils";

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
  const [selectedTravelers, setSelectedTravelers] = useState<TravelerModel[]>(
    props.travelerGroup.travelerList
  );

  function handleNewDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function updateTravelerGroup() {
    axios
      .put("/api/traveler-groups/" + props.travelerGroup.id, {
        description,
        travelerList: [...selectedTravelers],
        id: props.travelerGroup.id,
      })
      .then((response) => {
        props.closeModal();
        props.fetchAllTravelerGroups();
        console.log(selectedTravelers);
        return response.data;
      })
      .catch((error) => console.log("error =>" + error));
  }

  function handleFormSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    updateTravelerGroup();
  }

  const handleSelectTravelerInUpdateForm = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const id = event.target.value;
    const { check, traveler } = checkIfExists(
      id,
      props.travelers,
      selectedTravelers
    );
    if (check && traveler) {
      setSelectedTravelers([...selectedTravelers, traveler]);
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
        <select
          name={"travelers"}
          id={"travelers"}
          onChange={handleSelectTravelerInUpdateForm}
        >
          <option value="">--Please choose a Traveler--</option>
          {props.travelers.map((traveler) => {
            return (
              <option key={traveler.id} value={traveler.id}>
                {traveler.name}
              </option>
            );
          })}
        </select>
        <button>update</button>
        <button onClick={props.closeModal}>close</button>
      </form>
    </Modal>
  );
}
