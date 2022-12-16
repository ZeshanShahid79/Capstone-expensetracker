import { GroupMemberModel } from "./GroupMember";

export type TravelerGroupModel = {
  description: string;
  travelerList: GroupMemberModel[];
  id: string;
};
