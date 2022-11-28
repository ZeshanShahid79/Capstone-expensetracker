import { TravelerModel } from "../TravelerModel/TravelerModel";
import { useState } from "react";
import axios from "axios";
import "./TravelerCard.css";
import TravelerModal from "../TravelerModal";

type TravelerCardProps = {
  traveler: TravelerModel;
  fetchAllTraveler: () => void;
};

export default function TravelerCard(props: TravelerCardProps) {
  const [messageStatus, setMessageStatus] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);

  const deleteTraveler = () => {
    axios
      .delete("/api/travelers/" + props.traveler.id)
      .then((response) => response.status)
      .catch((error) => {
        if (error.status === 404)
          setMessageStatus("Error: traveler could not be deleted");
      })
      .then((status) => {
        if (status === 200) {
          setMessageStatus(
            "Traveler: " + props.traveler.name + " is deleted successfully"
          );
          console.log("status=>:" + status);
        }
      })
      .then(() => setTimeout(() => props.fetchAllTraveler(), 2000));
  };

  function openModal() {
    setEditModal(true);
  }

  function closeModal() {
    setEditModal(false);
  }

  return (
    <li>
      {messageStatus && <p>{messageStatus}</p>}
      {editModal && (
        <TravelerModal
          closeModal={closeModal}
          modalIsOpen={editModal}
          fetchAllTraveler={props.fetchAllTraveler}
          traveler={props.traveler}
        />
      )}
      <section>
        <h4>{props.traveler.name}</h4>
        <button onClick={deleteTraveler}>delete</button>
        <button onClick={openModal}>edit</button>
      </section>
    </li>
  );
}
