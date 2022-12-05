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
  const [createdTravellerMessage, setCreateTravellerdMessage] = useState("");

  const postTraveler = () => {
    axios
      .post("/api/travelers", {
        name,
      })
      .catch((error) => {
        console.log("Error =>" + error);
      })
      .then(() =>
        setCreateTravellerdMessage(name + " was created successfully")
      )
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
      {createdTravellerMessage && (
        <Alert
          variant={"outlined"}
          severity={"success"}
          onClose={() => setCreateTravellerdMessage("")}
        >
          {createdTravellerMessage}
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
