import {useEffect, useState} from "react";
import {TravelerGroupModel} from "./TravelerGroupModel/TravelerGroupModel";
import AddTravelerGroupForm from "./AddTravelerGroupForm/AddTravelerGroupForm";
import {TravelerModel} from "../Traveler/TravelerModel/TravelerModel";
import AddTravelerForm from "../Traveler/AddTravelerForm/AddTravelerForm";
import {fetchAllTravelerGroups, fetchAllTravelers} from "../services/travelerService";


export default function TravelerGroupOverview() {
    const [travelerGroup, setTravelerGroup] = useState<TravelerGroupModel[]>([]);


    useEffect(() => {
        initialState().catch(err => console.log(err))
    }, [])


    const travelerGroupList = travelerGroup.map(travelerGroup => {
        return <section key={travelerGroup.id}>{travelerGroup.travelerList}</section>
    })

    return (
        <ul>
            <h3>Traveler Group </h3>
            {travelerGroupList}
            {/*<TravelerOverview travelers={travelers} fetchAllTravelers={fetchAllTravelers}/>*/}
            <AddTravelerGroupForm travelers={travelers} fetchAllTravelerGroups={fetchAllTravelerGroups}/>
            <AddTravelerForm fetchAllTraveler={fetchAllTravelers}/>

        </ul>

    );
}
