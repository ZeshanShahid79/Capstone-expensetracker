import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { TravelerGroupModel } from "./TravelerGroupModel";
import { TravelerModel } from "../Traveler/TravelerModel";
import TravelerGroupModal from "./TravelerGroupModal";
import {
  Alert,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
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
  const [travelerGroupAmount, setTravelerGroupAmount] = useState(0);

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

  const getBillForGroup = () => {
    axios
      .get("api/bill/" + props.travelerGroup.id)
      .then((response: AxiosResponse<{ sum: number }>) => {
        if (response.status === 200) {
          setTravelerGroupAmount(response.data.sum);
        }
      })
      .then(props.fetchAllTravelerGroups)
      .catch((error) => console.error(error));
  };

  useEffect(getBillForGroup, [
    props.fetchAllTravelerGroups,
    props.travelerGroup.id,
  ]);

  return (
    <div>
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
          getBillForGroup={getBillForGroup}
        />
      )}

      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <span>
            <h4>{props.travelerGroup.description}</h4>
            <Stack>
              {props.travelerGroup.travelerList.map((traveler) => {
                return (
                  <li key={traveler.id}>
                    <span>
                      {traveler.name} {traveler.amount}€
                    </span>

                    {traveler.due !== 0 ? (
                      <Box border={"solid"} borderColor={"red"}>
                        Due: {traveler.due}
                      </Box>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
            </Stack>
            <div>Total Amount: {travelerGroupAmount}</div>

            <Stack
              spacing={2}
              direction={"row"}
              justifyContent={"center"}
              marginTop={3}
            >
              <IconButton
                onClick={() => setEditModal(true)}
                size={"small"}
                color={"primary"}
              >
                {<EditIcon />}
              </IconButton>

              <IconButton
                onClick={deleteTravelerGroup}
                size={"small"}
                color={"error"}
              >
                {<DeleteForeverIcon />}
              </IconButton>
            </Stack>
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
