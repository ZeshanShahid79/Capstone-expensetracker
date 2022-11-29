import { useState } from "react";
import axios from "axios";
import { TravelerGroupModel } from "../TravelerGroupModel/TravelerGroupModel";
import TravelerCard from "../../Traveler/TravelerCard/TravelerCard";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";
import "../../Traveler/TravelerCard/TravelerCard.css";
import TravelerGroupModal from "../TravelerGroupModal";
import { useNavigate } from "react-router-dom";

type TravelerCardProps = {
  travelerGroup: TravelerGroupModel;
  fetchAllTravelerGroups: () => void;
  fetchAllTraveler: () => void;
  travelers: TravelerModel[];
};

export default function TravelerGroupCard(props: TravelerCardProps) {
  const [messageStatus, setMessageStatus] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteTravelerGroup = () => {
    axios
      .delete("/api/traveler-groups/" + props.travelerGroup.id)
      .then((response) => response.status)
      .catch((error) => {
        if (error.status === 404)
          setMessageStatus("Error: traveler could not be deleted");
      })
      .then((status) => {
        if (status === 204) {
          setMessageStatus(
            "Traveler Group: " +
              props.travelerGroup.description +
              " is deleted successfully"
          );
        }
      })
      .then(() => setTimeout(() => props.fetchAllTravelerGroups(), 2000))
      .then(() => props.fetchAllTraveler);
  };

  return (
    <li>
      {editModal && (
        <TravelerGroupModal
          closeModal={() => setEditModal(false)}
          modalIsOpen={editModal}
          fetchAllTravelerGroups={props.fetchAllTravelerGroups}
          travelerGroup={props.travelerGroup}
          travelers={props.travelers}
        />
      )}
      {messageStatus && <p>{messageStatus}</p>}
      <section>
        <h4>{props.travelerGroup.description}</h4>
        <button onClick={deleteTravelerGroup}>delete</button>
        <button onClick={() => setEditModal(true)}>edit</button>
        {props.travelerGroup.travelerList.map((traveler) => {
          return (
            <TravelerCard
              key={traveler.id}
              fetchAllTraveler={props.fetchAllTraveler}
              traveler={traveler}
            />
          );
        })}
        <button onClick={() => navigate("/AddTravelerForm")}>
          Add Traveler
        </button>
      </section>
    </li>
  );
}
