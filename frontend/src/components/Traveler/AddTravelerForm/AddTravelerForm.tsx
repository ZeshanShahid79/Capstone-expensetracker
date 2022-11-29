import "./AddTravelerForm.css";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type AddTravelerProps = {
  fetchAllTraveler: () => void;
  postTraveler: () => void;
  setName: (name: string) => void;
  name: string;
};
export default function AddTravelerForm(props: AddTravelerProps) {
  const navigate = useNavigate();

  const handleTravelerFrom = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.postTraveler();

    props.setName("");
    navigate("/");
  };
  return (
    <section>
      <h2>Add Traveler to the List</h2>
      <form onSubmit={handleTravelerFrom}>
        <label htmlFor={"name"}>Name :</label>
        <input
          type={"text"}
          id={"name"}
          value={props.name}
          onChange={(event) => props.setName(event.target.value)}
          placeholder={"Zeshan"}
        />
        <button>Add Traveler</button>
      </form>
    </section>
  );
}
