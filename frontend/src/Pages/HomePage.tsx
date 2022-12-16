import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TravelerGroupOverview from "../components/TravelerGroup/TravelerGroupOverview";
import { TravelerGroupModel } from "../components/TravelerGroup/TravelerGroupModel";
import { TravelerModel } from "../components/Traveler/TravelerModel";
import axios from "axios";
import AddTravelerGroupForm from "../components/TravelerGroup/AddTravelerGroupForm";
import AddTravelerForm from "../components/Traveler/AddTravelerForm";
import TravelerOverview from "../components/Traveler/TravelerOverview";
import { MuiBottomNavigation } from "../components/MuiBottomNavigation";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { TravelExUserModel } from "./TravelExUserModel";
import TravelExUserModal from "./TravelExUserModal";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

type HomePageProps = {
  fetchUsername: () => void;
  travelExUser: TravelExUserModel;
};

export default function HomePage(props: HomePageProps) {
  const [travelerGroupList, setTravelerGroupList] = useState<
    TravelerGroupModel[]
  >([]);
  const [travelers, setTravelers] = useState<TravelerModel[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);

  const fetchAllTravelerGroups = useCallback(() => {
    axios
      .get("/api/traveler-groups")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.error(error))
      .then(setTravelerGroupList);
  }, []);

  const fetchAllTravelers = useCallback(() => {
    axios
      .get("/api/travelers")
      .then((response) => response.data)
      .then(setTravelers);
  }, []);

  const logout = () => {
    axios.get("api/travelex-users/logout").then(props.fetchUsername);
  };

  useEffect(fetchAllTravelerGroups, [fetchAllTravelerGroups]);
  useEffect(fetchAllTravelers, [fetchAllTravelers]);

  return (
    <>
      {editModal && (
        <TravelExUserModal
          closeModal={() => setEditModal(false)}
          modalIsOpen={editModal}
          travelExUser={props.travelExUser}
          fetchUsername={props.fetchUsername}
          logout={logout}
        />
      )}
      <header>
        <AppBar position={"sticky"}>
          <Toolbar
            sx={{
              height: 100,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="h3" color={"white"}>
              TravelEx
            </Typography>
            {/*<LocalAtmIcon fontSize={"large"} />*/}
            <Stack
              direction={"row"}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <IconButton onClick={() => setEditModal(true)}>
                <AssignmentIndIcon />
              </IconButton>
              <IconButton onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
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
