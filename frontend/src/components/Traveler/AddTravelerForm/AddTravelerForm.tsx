import "./AddTravelerForm.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Alert, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddTravelerProps = {
  fetchAllTravelers: () => void;
};
export default function AddTravelerForm(props: AddTravelerProps) {
  const [name, setName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const postTraveler = () => {
    axios
      .post("/api/travelers", {
        name,
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage(name + ": " + response.statusText);
          setShowSuccessMessage(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error =>" + error);
          setErrorMessage(error.response.data);
          setShowErrorMessage(true);
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
      <form onSubmit={handleTravelerFrom}>
        <label htmlFor={"name"}>Name :</label>
        <input
          type={"text"}
          id={"name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={"Zeshan"}
        />
        <Button
          type={"submit"}
          size={"small"}
          variant={"outlined"}
          color={"success"}
          endIcon={<AddIcon />}
        >
          Add Traveler
        </Button>
      </form>
    </section>
  );
}
