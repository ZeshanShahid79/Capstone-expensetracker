import { useEffect, useState } from "react";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import AddTravelerGroupForm from "./AddTravelerGroupForm/AddTravelerGroupForm";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import AddTravelerForm from "../Traveler/AddTravelerForm/AddTravelerForm";
import TravelerOverview from "../Traveler/TravelerOverview";
import axios from "axios";
import TravelerGroupCard from "./TravelerGroupCard/TravelerGroupCard";

export default function TravelerGroupOverview() {
  const [travelerGroup, setTravelerGroup] = useState<TravelerGroupModel[]>([]);
  const [travelers, setTravelers] = useState<TravelerModel[]>([]);

  useEffect(() => {
    fetchAllTravelers();
    fetchAllTravelerGroups();
  }, []);

  const fetchAllTravelerGroups = () => {
    axios
      .get("/api/traveler-groups")
      .then((response) => response.data)
      .then((data) => {
        setTravelerGroup(data);
      });
  };
  const fetchAllTravelers = () => {
    axios
      .get("/api/travelers")
      .then((response) => response.data)
      .then((data) => {
        setTravelers(data);
      });
  };

  const travelerGroupList = travelerGroup.map((travelerGroup) => {
    return (
      <TravelerGroupCard
        key={travelerGroup.id}
        fetchAllTravelerGroups={fetchAllTravelerGroups}
        travelerGroup={travelerGroup}
        travelers={travelers}
        fetchAllTraveler={fetchAllTravelers}
      />
    );
  });

  return (
    <ul>
      <h3>Traveler Group </h3>
      {travelerGroupList}
      <TravelerOverview
        travelers={travelers}
        fetchAllTravelers={fetchAllTravelers}
      />
      <AddTravelerGroupForm
        travelers={travelers}
        fetchAllTravelerGroups={fetchAllTravelerGroups}
      />
      <AddTravelerForm fetchAllTraveler={fetchAllTravelers} />
    </ul>
  );
}
