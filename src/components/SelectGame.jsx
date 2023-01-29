import React from 'react';

const SelectGame = (props) => {
    return (
        <div>
            <select id="underline_select" onChange={props.handleGameChange}
                    className=" mb-2 ml-1 w-full block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option defaultValue={""}>Choose a game to edit</option>
                {
                    props.allgames != undefined&&
                    props.allgames.map((game,index) => (
                        game.inLive&&
                        <option value={index} key={game.id}> {game.homeTeam} vs {game.foreignTeam}.
                             Current score - {" "}
                             {game.goalsToForeign} : {game.goalsToHome}</option>
                    ))

                }
            </select>
            
        </div>
    );
};

export default SelectGame;