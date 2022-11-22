import React from 'react';
import TravelerOverview from "./Traveler/TravelerOverview";
import AddTravelerForm from "./Traveler/AddTravelerForm";

function App() {


    return <>
        <h1>Shmoney Tracker</h1>
        <h3>Traveler List:</h3>
        <TravelerOverview/>
        <AddTravelerForm/>

    </>;
}

export default App;
