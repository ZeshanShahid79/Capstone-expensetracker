import {useEffect, useState} from "react";
import axios from "axios";
import {TravelerModel} from "./TravelerModel";


export default function TravelerOverview() {
    const [travelers, setTravelers] = useState<TravelerModel[]>([]);


    useEffect(() => {
        fetchAllTravelers()
    }, [])

    const fetchAllTravelers = () => {
        axios.get("/api/traveler")
            .then(response => response.data)
            .then(setTravelers)
    }
    const travelerList = travelers.map(traveler => {
        return <p key={traveler.id}>{traveler.name}</p>
    })
    return (
        <ul>
            {travelerList}
        </ul>

    );
}
