import {useCallback, useEffect, useState} from "react";
import {TravelerGroupModel} from "./TravelerGroupModel/TravelerGroupModel";
import AddTravelerGroupForm from "./AddTravelerGroupForm/AddTravelerGroupForm";
import {TravelerModel} from "../Traveler/TravelerModel/TravelerModel";
import AddTravelerForm from "../Traveler/AddTravelerForm/AddTravelerForm";
import {fetchAllTravelerGroups, fetchAllTravelers} from "../../services/travelerService";
import TravelerOverview from "../Traveler/TravelerOverview";


export default function TravelerGroupOverview() {
    const [travelerGroup, setTravelerGroup] = useState<TravelerGroupModel[]>([]);
    const [travelers, setTravelers] = useState<TravelerModel[]>([]);


    const initialState = useCallback(async () => {

        const groups = await fetchAllTravelerGroups();
        const travelers = await fetchAllTravelers()

        setTravelerGroup(groups)
        setTravelers(travelers)
    }, [])

    useEffect(() => {
        initialState().catch(err => console.log(err))
    }, [fetchAllTravelers])


    const travelerGroupList = travelerGroup.map(travelerGroup => {
        return <section key={travelerGroup.id}>
            <h3>{travelerGroup.description}</h3>
            {travelerGroup.travelerList
                .map((traveler) => {
                    return (<ul key={traveler.id}>
                            <li>{traveler.name}</li>
                        </ul>
                    )
                })}</section>
    })

    return (
        <ul>
            <h3>Traveler Group </h3>
            {travelerGroupList}
            <TravelerOverview travelers={travelers} fetchAllTravelers={fetchAllTravelers}/>
            <AddTravelerGroupForm travelers={travelers} fetchAllTravelerGroups={fetchAllTravelerGroups}/>
            <AddTravelerForm fetchAllTraveler={fetchAllTravelers}/>

        </ul>

    );
}
