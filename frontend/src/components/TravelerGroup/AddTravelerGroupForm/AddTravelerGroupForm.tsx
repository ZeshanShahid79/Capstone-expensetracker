import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";

type AddTravelerProps = {
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
};
export default function AddTravelerGroupForm({
  travelers,
  fetchAllTravelerGroups,
}: AddTravelerProps) {
  const [description, setDescription] = useState("");
  const [selectedTravelers, setSelectedTravelers] = useState<TravelerModel[]>(
    []
  );

  const postForm = () => {
    axios
      .post("/api/traveler-groups", {
        description,
        travelerList: selectedTravelers,
      })
      .catch((error) => {
        console.log("Error =>" + error);
      })
      .then(fetchAllTravelerGroups);
  };

  const handleRemoveFromList = (id: string) => {
    const filteredList = selectedTravelers.filter(
      (traveler) => traveler.id !== id
    );
    setSelectedTravelers(filteredList);
  };

  const handleSelectTraveler = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    const traveler = travelers.find((traveler) => traveler.id === id);
    const isExist = selectedTravelers.find((traveler) => traveler.id === id);
    if (traveler && !isExist) {
      setSelectedTravelers([...selectedTravelers, traveler]);
    }
  };

  const handleTravelerFrom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postForm();
    setDescription("");
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
        <select name="travelers" id="travelers" onChange={handleSelectTraveler}>
          <option value="">--Please choose a Traveler--</option>
          {travelers.map((traveler) => {
            return (
              <option key={traveler.id} value={traveler.id}>
                {traveler.name}
              </option>
            );
          })}
        </select>
        <button>Add TravelerGroup</button>
      </form>
    </section>
  );
}
