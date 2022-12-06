import { useEffect, useState } from "react";
import axios from "axios";
import { TravelerGroupModel } from "../TravelerGroupModel/TravelerGroupModel";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";
import TravelerGroupModal from "../TravelerGroupModal";
import "./TravelerGroupCard.css";
import { Alert, Button, Stack } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { GroupMemberModel } from "../TravelerGroupModel/GroupMember";

type TravelerCardProps = {
  travelerGroup: TravelerGroupModel;
  fetchAllTravelerGroups: () => void;
  fetchAllTraveler: () => void;
  travelers: TravelerModel[];
};

export default function TravelerGroupCard(props: TravelerCardProps) {
  const [messageStatus, setMessageStatus] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [travelerListInGroup, setTravelerListInGroup] = useState<
    TravelerModel[]
  >([]);
  const [groupData, setGroupData] = useState<GroupMemberModel[]>();

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
      {messageStatus && (
        <Alert severity={"error"} onClose={() => setMessageStatus("")}>
          {messageStatus}
        </Alert>
      )}
      <section className={"traveler-group-card"}>
        <h4>{props.travelerGroup.description}</h4>
        {travelerListInGroup.map((traveler) => {
          return <li key={traveler.id}>{traveler.name}</li>;
        })}
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
