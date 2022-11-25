import axios from "axios";

export const fetchAllTravelerGroups = async () => {
    const res = await axios.get("/api/traveler-groups")
    return res.data
};
export const fetchAllTravelers = async () => {
    const res = await axios.get("/api/travelers")
    return res.data
};

