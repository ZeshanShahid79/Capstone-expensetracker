import { useState } from "react";
import axios from "axios";
import { TravelerGroupModel } from "../TravelerGroupModel/TravelerGroupModel";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";
import TravelerGroupModal from "../TravelerGroupModal";
import "./TravelerGroupCard.css";
import { Alert, Button, Stack } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

type TravelerCardProps = {
  travelerGroup: TravelerGroupModel;
  fetchAllTravelerGroups: () => void;
  fetchAllTraveler: () => void;
  travelers: TravelerModel[];
};

export default function TravelerGroupCard(props: TravelerCardProps) {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const deleteTravelerGroup = () => {
    axios
      .delete("/api/traveler-groups/" + props.travelerGroup.id)
      .then((response) => {
        if (response.status === 204) {
          setSuccessMessage(
            props.travelerGroup.description + ": " + response.statusText
          );
        }
      })
      .catch((error) => {
        if (error.status === 404) setErrorMessage(error.status.data);
      })
      .then(() => setTimeout(() => props.fetchAllTravelerGroups(), 2000))
      .then(() => props.fetchAllTraveler);
  };

  return (
    <li>
      {successMessage && (
        <Alert
          variant={"outlined"}
          severity={"success"}
          onClose={() => setSuccessMessage(undefined)}
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          variant={"outlined"}
          severity={"error"}
          onClose={() => setErrorMessage(undefined)}
        >
          {errorMessage}
        </Alert>
      )}
      {editModal && (
        <TravelerGroupModal
          closeModal={() => setEditModal(false)}
          modalIsOpen={editModal}
          fetchAllTravelerGroups={props.fetchAllTravelerGroups}
          travelerGroup={props.travelerGroup}
          travelers={props.travelers}
        />
      )}
      <section className={"traveler-group-card"}>
        <h4>{props.travelerGroup.description}</h4>
        <div>
          {props.travelerGroup.travelerList.map((traveler) => {
            return (
              <ul key={traveler.id}>
                <li>
                  {traveler.name} {traveler.amount}€
                </li>
              </ul>
            );
          })}
        </div>
        <footer>
          <Stack spacing={2} direction={"row"}>
            <Button
              onClick={() => setEditModal(true)}
              size={"small"}
              variant={"outlined"}
              color={"success"}
              endIcon={<EditIcon />}
            >
              edit
            </Button>
            <Button
              onClick={deleteTravelerGroup}
              size={"small"}
              variant={"outlined"}
              color={"error"}
              endIcon={<DeleteForeverIcon />}
            >
              delete
            </Button>
          </Stack>
        </footer>
      </section>
    </li>
  );
}
