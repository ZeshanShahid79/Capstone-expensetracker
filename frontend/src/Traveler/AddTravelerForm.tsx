import axios from "axios";
import {ChangeEvent, useState} from "react";

export default function AddTravelerForm() {

    const [name, setName] = useState("");

    const postForm = () => {
        axios.post("/api/travelers", {
            name,
        })
            .catch((error) => {
                console.log("Error =>" + error)
            })
    }

    const handleTravelerFrom = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        postForm();
        setName("");

    }
    return (
        <>
            <h2>Add Traveler to the List</h2>
            <form onSubmit={handleTravelerFrom}>
                <label htmlFor={"name"}>Name</label>
                <input type={"text"} id={"name"} value={name} onChange={(event) => setName(event.target.value)}
                       placeholder={"Zeshan"}/>
                <button>Add Traveler</button>
            </form>
        </>
    )
}
