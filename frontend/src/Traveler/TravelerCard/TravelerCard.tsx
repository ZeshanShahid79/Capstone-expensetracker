import {TravelerModel} from "../TravelerModel/TravelerModel";
import {useState} from "react";
import axios from "axios";
import "./TravelerCard.css"


type TravelerCardProps = {
    traveler: TravelerModel;
    fetchAllTraveler: () => void
}

export default function TravelerCard(props: TravelerCardProps) {

    const [messageStatus, setMessageStatus] = useState("")

    const deleteTraveler = () => {
        axios.delete("/api/travelers/" + props.traveler.id)
            .then((response) => response.status)
            .catch((error) => {
                if (error.status === 404) setMessageStatus("Error: traveler could not be deleted")
            })
            .then((status) => {
                if (status === 200) {
                    setMessageStatus("Traveler: " + props.traveler.name + " is deleted successfully")
                }
            })
            .then(() => setTimeout(() => props.fetchAllTraveler(), 2000))
    }
    return (
        <div>
            {messageStatus && <p>{messageStatus}</p>}
            <section>
                <h4>{props.traveler.name}</h4>
                <button onClick={deleteTraveler}>delete</button>
            </section>
        </div>
    )
}
