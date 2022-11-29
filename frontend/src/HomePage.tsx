import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import TravelerGroupOverview from "./components/TravelerGroup/TravelerGroupOverview";
import { TravelerGroupModel } from "./components/TravelerGroup/TravelerGroupModel/TravelerGroupModel";
import { TravelerModel } from "./components/Traveler/TravelerModel/TravelerModel";
import axios from "axios";
import AddTravelerGroupForm from "./components/TravelerGroup/AddTravelerGroupForm/AddTravelerGroupForm";
import AddTravelerForm from "./components/Traveler/AddTravelerForm/AddTravelerForm";

export default function HomePage() {
  const [travelerGroup, setTravelerGroup] = useState<TravelerGroupModel[]>([]);
  const [travelers, setTravelers] = useState<TravelerModel[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTravelers, setSelectedTravelers] = useState<TravelerModel[]>(
    []
  );

  useEffect(() => {
    fetchAllTravelers();
    fetchAllTravelerGroups();
  }, []);

  const fetchAllTravelerGroups = () => {
    axios
      .get("/api/traveler-groups")
      .then((response) => response.data)
      .then(setTravelerGroup);
  };
  const fetchAllTravelers = () => {
    axios
      .get("/api/travelers")
      .then((response) => response.data)
      .then(setTravelers);
  };
  const postTraveler = () => {
    axios
      .post("/api/travelers", {
        name,
      })
      .catch((error) => {
        console.log("Error =>" + error);
      })
      .then(fetchAllTravelers);
  };
  const postTravelerGroup = () => {
    axios
      .post("/api/traveler-groups", {
        description,
        travelerList: selectedTravelers,
      })
      .catch((error) => {
        console.log("Error =>" + error);
      })
      .then(fetchAllTravelerGroups);
  };

  return (
    <>
      <header>
        <h1>Shmoney Tracker</h1>
      </header>
      <Routes>
        <Route
          path={"/"}
          element={
            <TravelerGroupOverview
              travelers={travelers}
              travelerGroup={travelerGroup}
              fetchAllTravelers={fetchAllTravelers}
              fetchAllTravelerGroups={fetchAllTravelerGroups}
            />
          }
        />
        <Route path={"/TravelerOverview"} />
        <Route
          path={"/AddTravelerGroupForm"}
          element={
            <AddTravelerGroupForm
              travelers={travelers}
              fetchAllTravelerGroups={fetchAllTravelerGroups}
              setDescription={setDescription}
              description={description}
              setSelectedTravelers={setSelectedTravelers}
              selectedTravelers={selectedTravelers}
              postTravelerGroup={postTravelerGroup}
            />
          }
        />
        <Route
          path={"/AddTravelerForm"}
          element={
            <AddTravelerForm
              fetchAllTraveler={fetchAllTravelers}
              postTraveler={postTraveler}
              setName={setName}
              name={name}
            />
          }
        />
      </Routes>
    </>
  );
}
