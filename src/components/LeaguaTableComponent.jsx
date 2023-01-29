import React from 'react';
import {useEffect, useState} from "react";
import {sendApiGetRequest} from "../utiles/ApiRequests";

const LeaguesTableComponent = (props) => {

    const [gamesDataResponse, setGamesDataResponse] = useState({
        allGames: undefined
    });
    const [teamsData, setTeamsData] = useState(undefined)

    const [teamResults, setTeamResults] = useState({
        results: []
    })

    const calculateResult = () => {

        let totalResult = []

        teamsData.teams.forEach((team) => {

            let teamResult = {
                teamName: "",
                totalPoints: 0,
                totalGames: 0,
                totalDraws: 0,
                totalLoses: 0,
                totalWinnings: 0,
                GD: 0
            }
            teamResult.teamName = team.teamName;
            gamesDataResponse.allGames.forEach((game) => {
                if (!game.inLive || props.live) {
                    if(team.teamName == game.homeTeam) {
                        teamResult.totalGames += 1
                        teamResult.GD += (game.goalsToForeign-game.goalsToHome)
                        if (game.goalsToForeign > game.goalsToHome) {
                            teamResult.totalPoints += 3
                            teamResult.totalWinnings +=1
                        }
                        else if (game.goalsToForeign == game.goalsToHome) {
                            teamResult.totalPoints += 1
                            teamResult.totalDraws += 1
                        }
                        else {
                            teamResult.totalLoses += 1
                        }
                    } else if (team.teamName == game.foreignTeam) {
                        teamResult.totalGames += 1
                        teamResult.GD += (game.goalsToHome - game.goalsToForeign)
                        if (game.goalsToForeign < game.goalsToHome) {
                            teamResult.totalPoints += 3
                            teamResult.totalWinnings +=1
                        }
                        else if (game.goalsToForeign == game.goalsToHome) {
                            teamResult.totalPoints += 1
                            teamResult.totalDraws += 1
                        }
                        else {
                            teamResult.totalLoses += 1
                        }
                    }
                }
            })
            totalResult.push(teamResult)
        })
        setTeamResults({
            results: totalResult
        })
    }

    useEffect(()=> {
        if (gamesDataResponse.allGames != undefined && teamsData != undefined) {
            calculateResult()
        }
    }, [gamesDataResponse])

    useEffect(() => {
        sendApiGetRequest("http://localhost:8989/get-all-games", setGamesDataResponse)
        sendApiGetRequest("http://localhost:8989/get-teams", setTeamsData)
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            sendApiGetRequest("http://localhost:8989/get-all-games", setGamesDataResponse)
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    const sortedResults = () => {
        return teamResults.results.sort((a, b) => {
            if(b.totalPoints == a.totalPoints) {
                if (b.GD == a.GD) {
                    return b.teamName > a.teamName ? -1 : 1
                }
                return b.GD - a.GD
            }
            return b.totalPoints - a.totalPoints
        })
    }

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md ">
                {
                    gamesDataResponse.allGames !== undefined && props.live && gamesDataResponse.allGames.filter((game) => game.inLive).length===0 ?
                        <h2 className={"text-center font-bold"}>There is no live games</h2> :
                        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Place
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Team name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total points
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total games
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total draws
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total loses
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total winnings
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    GD
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                sortedResults().map((result, index) => (
                                    <tr className={"bg-white border-b dark:border-gray-700"} key={index}>
                                        <td className={"px-6 py-4"}>
                                            {index+1}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.teamName}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.totalPoints}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.totalGames}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.totalDraws}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.totalLoses}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.totalWinnings}
                                        </td>
                                        <td className={"px-6 py-4"}>
                                            {result.GD}
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    );
};

export default LeaguesTableComponent;