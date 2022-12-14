import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { Link, useLocation } from "react-router-dom";

export const MuiBottomNavigation = () => {
  const [value, setValue] = useState(0);

  const location = useLocation();

  const setTabByLocation = () => {
    if (location.pathname === "/") {
      setValue(0);
    }
    if (location.pathname === "/TravelerOverview") {
      setValue(1);
    }
    if (location.pathname === "/AddTravelerGroupForm") {
      setValue(2);
    }
    if (location.pathname === "/AddTravelerForm") {
      setValue(3);
    }
  };
  useEffect(setTabByLocation, [location.pathname]);

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        component={Link}
        to={"/"}
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/TravelerOverview"}
        label="TravelerOverview"
        icon={<RecentActorsIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/AddTravelerGroupForm"}
        label="AddTravelerGroup"
        icon={<GroupAddIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={"/AddTravelerForm"}
        label="AddTraveler"
        icon={<PersonAddAlt1Icon />}
      />
    </BottomNavigation>
  );
};
