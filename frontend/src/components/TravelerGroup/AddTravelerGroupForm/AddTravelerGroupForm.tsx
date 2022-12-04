import { ChangeEvent, FormEvent, useState } from "react";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";
import axios from "axios";
import { checkIfExists } from "../../utils";
import { Button, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddTravelerProps = {
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
};
export default function AddTravelerGroupForm(props: AddTravelerProps) {
  const [description, setDescription] = useState("");
  const [selectedTravelers, setSelectedTravelers] = useState<TravelerModel[]>(
    []
  );

  const postTravelerGroup = () => {
    axios
      .post("/api/traveler-groups", {
        description,
        travelerList: selectedTravelers.map((traveler) => traveler.id),
      })
      .catch((error) => {
        console.log("Error =>" + error);
      })
      .then(props.fetchAllTravelerGroups);
  };

  const handleRemoveFromList = (id: string) => {
    const filteredList = selectedTravelers.filter(
      (traveler) => traveler.id !== id
    );
    setSelectedTravelers(filteredList);
  };

  const handleSelectTraveler = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    const { check, traveler } = checkIfExists(
      id,
      props.travelers,
      selectedTravelers
    );
    if (check && traveler) {
      setSelectedTravelers([...selectedTravelers, traveler]);
    }
  };

  const handleTravelerFrom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTravelerGroup();
    setDescription("");
    setSelectedTravelers([]);
  };
  return (
    <section>
      <h2>Add TravelerGroup</h2>
      <div>
        <h3>Selected Travelers</h3>
        {selectedTravelers.map((traveler) => (
          <div key={traveler.id}>
            <p>{traveler.name}</p>
            <button onClick={() => handleRemoveFromList(traveler.id)}>X</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleTravelerFrom}>
        <label htmlFor={"description"}>Group Name: </label>
        <input
          type={"text"}
          id={"description"}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={"Mallorca 2022"}
        />
        <TextField
          label={"Select Traveller"}
          select
          value={""}
          onChange={handleSelectTraveler}
          size={"small"}
        >
          {props.travelers.map((traveler) => {
            return (
              <MenuItem key={traveler.id} value={traveler.id}>
                {traveler.name}
              </MenuItem>
            );
          })}
        </TextField>
        <Button
          type={"submit"}
          size={"small"}
          variant={"outlined"}
          color={"success"}
          endIcon={<AddIcon />}
        >
          Add TravelerGroup
        </Button>
      </form>
    </section>
  );
}
