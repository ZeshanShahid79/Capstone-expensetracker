import { useEffect, useState } from "react";
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
  const [travelerListInGroup, setTravelerListInGroup] = useState<
    TravelerModel[]
  >([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const deleteTravelerGroup = () => {
    axios
      .delete("/api/traveler-groups/" + props.travelerGroup.id)
      .then((response) => {
        if (response.status === 204) {
          setSuccessMessage(
            props.travelerGroup.description + ": " + response.statusText
          );
          setShowSuccessMessage(true);
        }
      })
      .catch((error) => {
        if (error.status === 404) setErrorMessage(error.status.data);
        setShowErrorMessage(true);
      })
      .then(() => setTimeout(() => props.fetchAllTravelerGroups(), 2000))
      .then(() => props.fetchAllTraveler);
  };

  const fetchTravelersByGroupId = () => {
    axios
      .get("api/traveler-groups/" + props.travelerGroup.id + "/travelers")
      .then((response) => response.data)
      .then(setTravelerListInGroup)
      .catch((error) => console.error(error));
  };
  useEffect(fetchTravelersByGroupId, [props.travelerGroup.id]);

  return (
    <li>
      {showSuccessMessage && (
        <Alert
          variant={"outlined"}
          severity={"success"}
          onClose={() => setShowSuccessMessage(false)}
        >
          {successMessage}
        </Alert>
      )}
      {showErrorMessage && (
        <Alert
          variant={"outlined"}
          severity={"error"}
          onClose={() => setShowErrorMessage(false)}
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
          travelerListInGroup={travelerListInGroup}
          fetchTravelersByGroupId={fetchTravelersByGroupId}
        />
      )}
      <section className={"traveler-group-card"}>
        <h4>{props.travelerGroup.description}</h4>
        {travelerListInGroup.map((traveler) => {
          return <li key={traveler.id}>{traveler.name}</li>;
        })}
        <div>
          {props.travelerGroup.travelerList.map((traveler) => {
            return (
              <div key={traveler.id}>
                <h6>{traveler.name}</h6>
                <input readOnly={true} value={traveler.amount} />
                <p>€</p>
              </div>
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
