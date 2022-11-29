import { TravelerModel } from "./Traveler/TravelerModel/TravelerModel";

export function checkIfExists(
  idToCheck: string,
  travelersList: TravelerModel[],
  selectedTravlers: TravelerModel[]
) {
  const traveler = travelersList.find((traveler) => traveler.id === idToCheck);
  const isExist = selectedTravlers.find(
    (traveler) => traveler.id === idToCheck
  );
  return { check: traveler && !isExist, traveler };
}
