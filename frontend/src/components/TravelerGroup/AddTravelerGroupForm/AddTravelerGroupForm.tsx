import { ChangeEvent, FormEvent } from "react";
import { TravelerModel } from "../../Traveler/TravelerModel/TravelerModel";
import { useNavigate } from "react-router-dom";

type AddTravelerProps = {
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
  setDescription: (description: string) => void;
  setSelectedTravelers: (selectedTravelers: TravelerModel[]) => void;
  selectedTravelers: TravelerModel[];
  description: string;
  postTravelerGroup: () => void;
};
export default function AddTravelerGroupForm(props: AddTravelerProps) {
  const navigate = useNavigate();

  const handleRemoveFromList = (id: string) => {
    const filteredList = props.selectedTravelers.filter(
      (traveler) => traveler.id !== id
    );
    props.setSelectedTravelers(filteredList);
  };

  const handleSelectTraveler = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    const traveler = props.travelers.find((traveler) => traveler.id === id);
    const isExist = props.selectedTravelers.find(
      (traveler) => traveler.id === id
    );
    if (traveler && !isExist) {
      props.setSelectedTravelers([...props.selectedTravelers, traveler]);
    }
  };

  const handleTravelerFrom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.postTravelerGroup();
    props.setDescription("");
    navigate("/");
  };
  return (
    <section>
      <h2>Add TravelerGroup</h2>
      <div>
        <h3>Selected Travelers</h3>
        {props.selectedTravelers.map((traveler) => (
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
          value={props.description}
          onChange={(event) => props.setDescription(event.target.value)}
          placeholder={"Mallorca 2022"}
        />
        <select name="travelers" id="travelers" onChange={handleSelectTraveler}>
          <option value="">--Please choose a Traveler--</option>
          {props.travelers.map((traveler) => {
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
