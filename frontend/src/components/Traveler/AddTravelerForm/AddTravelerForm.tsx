import "./AddTravelerForm.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Alert, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddTravelerProps = {
  fetchAllTravelers: () => void;
};
export default function AddTravelerForm(props: AddTravelerProps) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const postTraveler = () => {
    axios
      .post("/api/travelers", {
        name,
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage(name + ": " + response.statusText);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error =>" + error);
          setErrorMessage(error.response.data);
        }
      })
      .then(props.fetchAllTravelers);
  };

  const handleTravelerFrom = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTraveler();

    setName("");
  };
  return (
    <section>
      <h2>Add Traveler to the List</h2>
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
      <form onSubmit={handleTravelerFrom}>
        <TextField
          label={"Name"}
          placeholder={"Zeshan"}
          value={name}
          onChange={(event) => setName(event.target.value)}
          size={"small"}
        />
        <Button
          type={"submit"}
          variant={"outlined"}
          color={"primary"}
          endIcon={<AddIcon />}
        >
          Add Traveler
        </Button>
      </form>
    </section>
  );
}
