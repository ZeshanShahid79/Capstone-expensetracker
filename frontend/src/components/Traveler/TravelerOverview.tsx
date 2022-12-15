import { TravelerModel } from "./TravelerModel/TravelerModel";
import TravelerCard from "./TravelerCard/TravelerCard";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

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
    <StyledCardList>
      <Typography variant={"h5"} color={"primary"}>
        List of Persons
      </Typography>
      <Box m={2}>{travelerList}</Box>
    </StyledCardList>
  );
}
const StyledCardList = styled.ul`
  padding: 0;
  text-align: center;
  overflow: scroll;
`;
