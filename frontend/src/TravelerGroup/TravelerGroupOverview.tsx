import {useEffect, useState} from "react";
import axios from "axios";
import {TravelerGroupModel} from "./TravelerGroupModel/TravelerGroupModel";


export default function TravelerGroupOverview() {
    const [travelerGroup, setTravelerGroup] = useState<TravelerGroupModel[]>([]);


    useEffect(() => {
        fetchAllTravelerGroups()
    }, [])

    const fetchAllTravelerGroups = () => {
        axios.get("/api/traveler-groups")
            .then(response => response.data)
            .then((data) => {
                setTravelerGroup(data)
            })
    }
    const travelerGroupList = travelerGroup.map(travelerGroup => {
        return <section key={travelerGroup.id}>{travelerGroup.travelerList}</section>
    })
    return (
        <ul>
            <h3>Traveler Group </h3>
            {travelerGroupList}
        </ul>

    );
}
