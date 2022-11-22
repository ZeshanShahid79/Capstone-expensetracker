import {useEffect, useState} from "react";
import axios from "axios";
import {TravelerModel} from "./TravelerModel/TravelerModel";
import AddTravelerForm from "./AddTravelerForm/AddTravelerForm";
import TravelerCard from "./TravelerCard/TravelerCard";


export default function TravelerOverview() {
    const [travelers, setTravelers] = useState<TravelerModel[]>([]);


    useEffect(() => {
        fetchAllTravelers()
    }, [])

    const fetchAllTravelers = () => {
        axios.get("/api/travelers")
            .then(response => response.data)
            .then((data) => {
                setTravelers(data)
            })
    }
    const travelerList = travelers.map(traveler => {
        return <TravelerCard key={traveler.id} fetchAllTraveler={fetchAllTravelers} traveler={traveler}/>
    })
    return (
        <ul>
            <h3>Traveler List:</h3>
            {travelerList}
            <AddTravelerForm fetchAllTraveler={fetchAllTravelers}/>
        </ul>

    );
}
