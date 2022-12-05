import { TravelerModel } from "../TravelerModel/TravelerModel";
import { useState } from "react";
import axios from "axios";
import "./TravelerCard.css";
import TravelerModal from "../TravelerModal";
import { Alert, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

type TravelerCardProps = {
  traveler: TravelerModel;
  fetchAllTraveler: () => void;
  fetchAllTravelerGroups: () => void;
};

export default function TravelerCard(props: TravelerCardProps) {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deletemessageStatus, setDeleteMessageStatus] = useState("");

  const deleteTraveler = () => {
    axios
      .delete("/api/travelers/" + props.traveler.id)
      .then((response) => response.status)
      .catch((error) => {
        if (error.status === 404)
          setDeleteMessageStatus("Error: traveler could not be deleted");
      })
      .then((status) => {
        if (status === 204) {
          setDeleteMessageStatus(
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
    <div>
      {deletemessageStatus && (
        <Alert severity={"error"} onClose={() => setDeleteMessageStatus("")}>
          {deletemessageStatus}
        </Alert>
      )}
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
        <section className={"traveler-card"}>
          <h4>{props.traveler.name}</h4>
          <footer>
            <Button
              onClick={() => setEditModal(true)}
              type={"submit"}
              size={"small"}
              variant={"outlined"}
              color={"success"}
              endIcon={<EditIcon />}
            >
              edit
            </Button>
            <Button
              onClick={deleteTraveler}
              size={"small"}
              variant={"outlined"}
              color={"error"}
              endIcon={<DeleteForeverIcon />}
            >
              delete
            </Button>
          </footer>
        </section>
      </li>
    </div>
  );
}
