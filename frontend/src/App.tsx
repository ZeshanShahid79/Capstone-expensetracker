import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import axios from "axios";
import { TravelExUserModel } from "./TravelExUserModel";

function App() {
  const [travelExUserLogIn, setTravelExUserLogIn] = useState();
  const [travelExUser, setTravelExUser] = useState<TravelExUserModel>({
    id: "",
    username: "",
  });

  const fetchUsername = () => {
    axios
      .get("/api/travelex-users/login")
      .then((response) => response.data)
      .then(setTravelExUserLogIn);
  };

  const fetchUser = () => {
    if (
      travelExUserLogIn === undefined ||
      travelExUserLogIn === "anonymousUser"
    ) {
      return;
    }
    axios
      .get("/api/travelex-users/" + travelExUserLogIn)
      .then((response) => response.data)
      .then(setTravelExUser);
  };

  useEffect(fetchUsername, []);

  useEffect(fetchUser, [travelExUserLogIn]);

  if (travelExUserLogIn === undefined) {
    return <LogInPage fetchUsername={fetchUsername} />;
  }
  if (!travelExUserLogIn) {
    return <>Bitte haben Sie einen Augenblick Geduld...</>;
  }
  if (travelExUserLogIn === "anonymousUser") {
    return <LogInPage fetchUsername={fetchUsername}></LogInPage>;
  }

  return <HomePage fetchUsername={fetchUsername} travelExUser={travelExUser} />;
}

export default App;
