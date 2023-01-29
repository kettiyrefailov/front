import React from 'react';
import {useEffect, useState} from "react";
import {sendApiGetRequest} from "../utiles/ApiRequests";

const LiveResult = () => {

    const [gamesDataResponse, setGamesDataResponse] = useState({
        allGames: undefined
    });

    useEffect(() => {
        sendApiGetRequest("http://localhost:8989/get-all-games", setGamesDataResponse)
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            sendApiGetRequest("http://localhost:8989/get-all-games", setGamesDataResponse)
        }, 5000);


        return () => clearInterval(interval);
    }, []);


    const selectColor = (goalsTo, goalsAgainst) => {
      if (goalsTo > goalsAgainst) {
          return " text-red-400"
      }
      else if (goalsTo < goalsAgainst) {
          return  " text-emerald-600"
      }
      else {
          return  " text-yellow-400"
      }
    }

    return (
        <div>

            <div className="relative overflow-x-auto shadow-md ">
                {
                    gamesDataResponse.allGames !== undefined && gamesDataResponse.allGames.filter((game) => game.inLive).length===0 ?
                        <h2 className={"text-center font-bold"}>There is no live games</h2> :
                        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Home team
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Foreign team
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Home score
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Foreign score
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                gamesDataResponse.allGames!=undefined&&
                                gamesDataResponse.allGames.map((game) => {
                                    return (
                                        game.inLive&&
                                        <tr className={"bg-white border-b dark:border-gray-700"} key={game.id}>
                                            <td className={"px-6 py-4"+selectColor(game.goalsToHome, game.goalsToForeign)}>
                                                {game.homeTeam}
                                            </td>
                                            <td className={"px-6 py-4"+selectColor(game.goalsToForeign, game.goalsToHome)}>
                                                {game.foreignTeam}
                                            </td>
                                            <td className="px-6 py-4">
                                                {game.goalsToForeign}
                                            </td>
                                            <td className="px-6 py-4">
                                                {game.goalsToHome}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default LiveResult;