import TravelerGroupCard from "./TravelerGroupCard/TravelerGroupCard";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";

import { NavLink } from "react-router-dom";

type TravelerGroupOverviewProps = {
  travelerGroup: TravelerGroupModel[];
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
  fetchAllTravelers: () => void;
};

export default function TravelerGroupOverview(
  props: TravelerGroupOverviewProps
) {
  const travelerGroupList = props.travelerGroup.map((travelerGroup) => {
    return (
      <TravelerGroupCard
        key={travelerGroup.id}
        fetchAllTravelerGroups={props.fetchAllTravelerGroups}
        travelerGroup={travelerGroup}
        travelers={props.travelers}
        fetchAllTraveler={props.fetchAllTravelers}
      />
    );
  });

  return (
    <ul>
      <h3>Traveler Group </h3>
      {travelerGroupList}
      <NavLink to={"/AddTravelerGroupForm"}>
        <button>Add Traveler-Group</button>
      </NavLink>
    </ul>
  );
}
