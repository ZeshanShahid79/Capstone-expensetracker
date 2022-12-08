import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TravelerGroupOverview from "./components/TravelerGroup/TravelerGroupOverview";
import { TravelerGroupModel } from "./components/TravelerGroup/TravelerGroupModel/TravelerGroupModel";
import { TravelerModel } from "./components/Traveler/TravelerModel/TravelerModel";
import axios from "axios";
import AddTravelerGroupForm from "./components/TravelerGroup/AddTravelerGroupForm/AddTravelerGroupForm";
import AddTravelerForm from "./components/Traveler/AddTravelerForm/AddTravelerForm";
import TravelerOverview from "./components/Traveler/TravelerOverview";
import "./Homepage.css";
import { MuiBottomNavigation } from "./MuiComponents/MuiBottomNavigation";
import { Typography } from "@mui/material";

export default function HomePage() {
  const [travelerGroupList, setTravelerGroupList] = useState<
    TravelerGroupModel[]
  >([]);
  const [travelers, setTravelers] = useState<TravelerModel[]>([]);

  useEffect(() => {
    fetchAllTravelers();
    fetchAllTravelerGroups();
  }, []);

  const fetchAllTravelerGroups = () => {
    axios
      .get("/api/traveler-groups")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.error(error))
      .then(setTravelerGroupList);
  };
  const fetchAllTravelers = () => {
    axios
      .get("/api/travelers")
      .then((response) => response.data)
      .then(setTravelers);
  };

  return (
    <>
      <header>
        <Typography variant="h4" component={"h1"}>
          Shmoney Tracker
        </Typography>
      </header>

      <Routes>
        <Route
          path={"/"}
          element={
            <TravelerGroupOverview
              travelers={travelers}
              travelerGroupList={travelerGroupList}
              fetchAllTravelers={fetchAllTravelers}
              fetchAllTravelerGroups={fetchAllTravelerGroups}
            />
          }
        />
        <Route
          path={"/TravelerOverview"}
          element={
            <TravelerOverview
              fetchAllTravelers={fetchAllTravelers}
              travelers={travelers}
              fetchAllTravelerGroups={fetchAllTravelerGroups}
            />
          }
        />
        <Route
          path={"/AddTravelerGroupForm"}
          element={
            <AddTravelerGroupForm
              travelers={travelers}
              fetchAllTravelerGroups={fetchAllTravelerGroups}
            />
          }
        />
        <Route
          path={"/AddTravelerForm"}
          element={<AddTravelerForm fetchAllTravelers={fetchAllTravelers} />}
        />
      </Routes>
      <MuiBottomNavigation />
    </>
  );
}
