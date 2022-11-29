import TravelerGroupCard from "./TravelerGroupCard/TravelerGroupCard";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";

import { NavLink } from "react-router-dom";

type TravelerGroupOverviewProps = {
  travelerGroupList: TravelerGroupModel[];
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
  fetchAllTravelers: () => void;
};

export default function TravelerGroupOverview(
  props: TravelerGroupOverviewProps
) {
  const GroupsList = props.travelerGroupList.map((travelerGroup) => {
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
      {GroupsList}
      <nav>
        <NavLink to={"/AddTravelerGroupForm"}>
          <button>Create New Traveler Group</button>
        </NavLink>
        <NavLink to={"/AddTravelerForm"}>
          <button>Create New Traveler</button>
        </NavLink>
      </nav>
    </ul>
  );
}
