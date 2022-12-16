import TravelerGroupCard from "./TravelerGroupCard";
import { TravelerModel } from "../Traveler/TravelerModel";
import { TravelerGroupModel } from "./TravelerGroupModel";
import { Box, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

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
    <StyledGroupCardList>
      <Typography variant="h6" color={"primary"}>
        Traveler Group
      </Typography>
      <Box m={2}>{GroupsList}</Box>
    </StyledGroupCardList>
  );
}
const StyledGroupCardList = styled.ul`
  padding: 0;
  text-align: center;
  overflow: scroll;
`;
