import TravelerGroupCard from "./TravelerGroupCard/TravelerGroupCard";
import { TravelerModel } from "../Traveler/TravelerModel/TravelerModel";
import { TravelerGroupModel } from "./TravelerGroupModel/TravelerGroupModel";
import { Typography } from "@mui/material";
import React from "react";

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
    <>
      <Typography variant="h6">Traveler Group</Typography>
      <ul>{GroupsList}</ul>
    </>
  );
}
