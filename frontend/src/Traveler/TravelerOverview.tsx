import {useEffect} from "react";
import {TravelerModel} from "./TravelerModel/TravelerModel";
import TravelerCard from "./TravelerCard/TravelerCard";

type TravelerOverviewProps = {
    fetchAllTravelers: () => void,
    travelers: TravelerModel[]
}
export default function TravelerOverview({fetchAllTravelers, travelers}: TravelerOverviewProps) {

    useEffect(() => {
        fetchAllTravelers()
    }, [])


    const travelerList = travelers.map(traveler => {
        return <TravelerCard key={traveler.id} fetchAllTraveler={fetchAllTravelers} traveler={traveler}/>
    })
    return (
        <ul>
            <h3>List of Persons:</h3>
            {travelerList}
        </ul>

    );
}
