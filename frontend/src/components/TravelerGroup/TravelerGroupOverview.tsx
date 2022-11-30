import TravelerGroupCard from "./TravelerGroupCard/TravelerGroupCard";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";

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
    </ul>
  );
}
