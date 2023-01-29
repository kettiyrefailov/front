import React from 'react';
import LeaguaTableComponent from "../components/LeaguaTableComponent";

const LeaguesTableLive = () => {
    return (
        <div>
            <LeaguaTableComponent live={true}/>
        </div>
    );
};

export default LeaguesTableLive;