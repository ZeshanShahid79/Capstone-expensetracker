import {useEffect, useState} from "react";
import axios from "axios";
import {TravelerModel} from "./TravelerModel";


export default function TravelerOverview() {
    const [travelers, setTravelers] = useState<TravelerModel[]>([]);


    useEffect(() => {
        fetchAllTravelers()
    }, [])

    const fetchAllTravelers = () => {
        axios.get("/api/travelers")
            .then(response => response.data)
            .then(setTravelers)
    }
    const travelerList = travelers.map(traveler => {
        return <li key={traveler.id}>{traveler.name}</li>
    })
    return (
        <ul>
            {travelerList}
        </ul>

    );
}
