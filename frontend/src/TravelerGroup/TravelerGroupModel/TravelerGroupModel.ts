import {TravelerModel} from "../../Traveler/TravelerModel/TravelerModel";

export type TravelerGroupModel = {
    description: string,
    travelerList: TravelerModel[],
    id: string
}

