import { TravelerModel } from "./TravelerModel/TravelerModel";
import TravelerCard from "./TravelerCard/TravelerCard";

type TravelerOverviewProps = {
  fetchAllTravelers: () => void;
  travelers: TravelerModel[];
  fetchAllTravelerGroups: () => void;
};
export default function TravelerOverview({
  fetchAllTravelers,
  travelers,
  fetchAllTravelerGroups,
}: TravelerOverviewProps) {
  const travelerList = travelers.map((traveler) => {
    return (
      <TravelerCard
        key={traveler.id}
        fetchAllTraveler={fetchAllTravelers}
        traveler={traveler}
        fetchAllTravelerGroups={fetchAllTravelerGroups}
      />
    );
  });
  return (
    <ul>
      <h3>List of Persons:</h3>
      {travelerList}
    </ul>
  );
}
