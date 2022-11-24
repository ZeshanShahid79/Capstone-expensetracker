import React from 'react';
import TravelerOverview from "./Traveler/TravelerOverview";
import TravelerGroupOverview from "./TravelerGroup/TravelerGroupOverview";

function App() {


    return <>
        <header>
            <h1>Shmoney Tracker</h1>
        </header>
        <main>
            <TravelerOverview/>
            <TravelerGroupOverview/>
        </main>
    </>
        ;

}

export default App;
