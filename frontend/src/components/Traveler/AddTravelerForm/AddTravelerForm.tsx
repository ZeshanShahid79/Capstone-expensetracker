import "./AddTravelerForm.css";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type AddTravelerProps = {
  fetchAllTravelers: () => void;
};
export default function AddTravelerForm(props: AddTravelerProps) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const postTraveler = () => {
    axios
      .post("/api/travelers", {
        name,
      })
      .catch((error) => {
        console.log("Error =>" + error);
      })
      .then(props.fetchAllTravelers);
  };

  const handleTravelerFrom = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTraveler();

    setName("");
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={"Zeshan"}
        />
        <button>Add Traveler</button>
      </form>
    </section>
  );
}
