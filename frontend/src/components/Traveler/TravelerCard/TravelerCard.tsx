import { TravelerModel } from "../TravelerModel/TravelerModel";
import { useState } from "react";
import axios from "axios";
import "./TravelerCard.css";
import TravelerModal from "../TravelerModal";

type TravelerCardProps = {
  traveler: TravelerModel;
  fetchAllTraveler: () => void;
  fetchAllTravelerGroups: () => void;
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
        if (status === 204) {
          setMessageStatus(
            "Traveler: " + props.traveler.name + " is deleted successfully"
          );
        }
      })
      .then(() =>
        setTimeout(() => {
          props.fetchAllTraveler();
          props.fetchAllTravelerGroups();
        }, 2000)
      );
  };

  return (
    <li>
      {editModal && (
        <TravelerModal
          closeModal={() => setEditModal(false)}
          modalIsOpen={editModal}
          fetchAllTraveler={props.fetchAllTraveler}
          traveler={props.traveler}
          fetchAllTravelerGroups={props.fetchAllTravelerGroups}
        />
      )}
      <section>
        {messageStatus && <p>{messageStatus}</p>}
        <h4>{props.traveler.name}</h4>
        <button onClick={deleteTraveler}>delete</button>
        <button onClick={() => setEditModal(true)}>edit</button>
      </section>
    </li>
  );
}
