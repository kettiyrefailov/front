import React, {useEffect, useState} from 'react';
import {sendApiGetRequest, sendApiPostRequest} from "../utiles/ApiRequests";
import SelectGame from "./SelectGame";

const AddGame = (props) => {

    const [teamsData, setTeamsData] = useState()
    const [foreignTeam, setForeignTeam] = useState("")
    const [goalsToForeign, setGoalsToForeign] = useState(0)
    const [goalsToHome, setGoalsToHome] = useState(0)
    const [homeTeam, setHomeTeam] = useState("")
    const [editGame, setEditGame] = useState(undefined)
    const [gamesDataResponse, setGamesDataResponse] = useState({
        allGames: undefined,
        success: null,
        errorCode: -1

    });

    useEffect(() => {
        sendApiGetRequest("http://localhost:8989/get-teams", setTeamsData)
        sendApiGetRequest("http://localhost:8989/get-all-games", setGamesDataResponse)
    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
            sendApiGetRequest("http://localhost:8989/get-all-games", setGamesDataResponse)
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const [editChecked, setEditChecked] = useState(false)

    const handleRadioChange = () => {
        setEditChecked(!editChecked)
        setEditGame(undefined);
        setHomeTeam("")
        setForeignTeam("")
        setGoalsToForeign(0)
        setGoalsToHome(0)
    }

    const handleForeignChange = (e) => {
        setForeignTeam(e.target.value)
    }

    const handleHomeChange = (e) => {
      setHomeTeam(e.target.value)
    }

    const handleGoalsToForeign = (e) => {
      setGoalsToForeign(e.target.value)
    }

    const handleGoalsToHome = (e) => {
      setGoalsToHome(e.target.value)
    }

    const handleAddGame = () => {
        sendApiPostRequest("http://localhost:8989/add-game", {
            foreignTeam: foreignTeam, goalsToForeign: goalsToForeign, goalsToHome: goalsToHome,
            homeTeam, inLive: true, userId: null, token: props.token
        }, setGamesDataResponse)
    }

    const isTeamAlreadyPlayInLive = (teamName) => {
        let alreadyPlay = false
        if (gamesDataResponse.allGames !== undefined) {
            gamesDataResponse.allGames.map((game) => {
                if (game.inLive) {
                    if(game.homeTeam===teamName || game.foreignTeam===teamName) {
                        alreadyPlay = true;
                        return alreadyPlay
                    }
                }
            })
        }
        return alreadyPlay
    }

    const handleGameChange = (e) => {
        setEditGame(gamesDataResponse.allGames[e.target.value])
    }

    const handleEditHomeChange = (e) => {
        setEditGame((previousGame) => ({
            ...previousGame,
            homeTeam: e.target.value
        }))
    }

    const handleEditForeignChange = (e) => {
        setEditGame((previousGame) => ({
            ...previousGame,
            foreignTeam: e.target.value
        }))
    }

    const handleGoalsToForeignEdit = (e) => {
        setEditGame((previousGame) => ({
            ...previousGame,
            goalsToForeign: e.target.value
        }))
    }

    const handleGoalsToHomeEdit = (e) => {
        setEditGame((previousGame) => ({
            ...previousGame,
            goalsToHome: e.target.value
        }))
    }

    const handleEditGameInLive = () => {
        setEditGame((previousGame) => ({
            ...previousGame,
            inLive: !editGame.inLive
        }))
    }

    const handleEditGame = () => {
      sendApiPostRequest("http://localhost:8989/update-game", {...editGame, token: props.token}, setGamesDataResponse)
      setEditGame(undefined)

    }

    const handleClearAddGame = () => {
        setForeignTeam("")
        setHomeTeam("")
        setGoalsToHome(0)
        setGoalsToForeign(0)
    }

    const editGameIsUndefined = () => {
      return editGame===undefined
    }

    const teamsFieldIsEmptyModeAdd = () => {
        return !editChecked && (homeTeam=="" || foreignTeam=="")
    }



    return (
        <div>
            <div className='relative w-full h-1/2 bg-zinc-400'>
                <div className='flex justify-center items-center ' >
                    <form className='max-w-[600px]  w-full mx-auto bg-white p-8 mt-1'>
                        <h2 className='text-4xl font-bold text-center py-4'>{editChecked ? "Edit games" : "Add game"}</h2>
                        <div className='flex justify-center py-8'>
                            <input id="default-radio-1" type="radio" checked={!editChecked}  onChange={handleRadioChange}
                                   className="mt-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
                            <label htmlFor="default-radio-1"
                                   className="mt-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add game
                            </label>

                            <input checked id="default-radio-2" type="radio" checked={editChecked} onChange={handleRadioChange}
                                   className="mt-2 ml-10 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"/>
                            <label htmlFor="default-radio-2"
                                   className="mt-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit games
                            </label>
                        </div>
                        {
                            editChecked &&
                            <>
                                {gamesDataResponse.allGames !== undefined && gamesDataResponse.allGames.filter((game) => game.inLive).length===0  ? <h2 className={"text-center font-bold"}>There is no live games</h2> :
                                    <SelectGame handleGameChange={handleGameChange}  allgames={gamesDataResponse.allGames}/>}
                            </>
                        }
                        <div className='flex flex-row mb-4'>

                            <select id="underline_select" value={editGameIsUndefined() ? homeTeam : editGame.homeTeam} onChange={editGameIsUndefined()? handleHomeChange : handleEditHomeChange} disabled={editChecked && editGameIsUndefined()}
                                    className="ml-1 mr-2 block py-2.5 px-0 w-3/4 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value="" className={!editGameIsUndefined()?'bg-emerald-200':""}>{editGameIsUndefined()? "Choose a home team" : editGame.homeTeam}</option>
                                {
                                    teamsData != undefined&&
                                    teamsData.teams.sort((a,b) => b.teamName.length-a.teamName.length).map((team) => (
                                        (!editChecked && team.teamName != foreignTeam || editChecked && !editGameIsUndefined() && team.teamName !=editGame.homeTeam && team.teamName != editGame.foreignTeam)&&<option
                                            className={isTeamAlreadyPlayInLive(team.teamName)?"bg-red-400":""}
                                            disabled={isTeamAlreadyPlayInLive(team.teamName)}
                                            key={team.id}
                                            value={team.teamName}>{team.teamName}
                                            {isTeamAlreadyPlayInLive(team.teamName)&& " IN GAME"}
                                        </option>
                                    ))
                                }
                            </select>

                            <select id="underline_select" value={editGameIsUndefined() ? foreignTeam : editGame.foreignTeam}  onChange={editGameIsUndefined() ? handleForeignChange : handleEditForeignChange} disabled={editChecked && editGameIsUndefined()}
                                    className="block py-2.5 px-0 w-3/4 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                <option value="" className={!editGameIsUndefined()?'bg-emerald-200':""} > {editGameIsUndefined() ? "Choose a foreign team" : editGame.foreignTeam }</option>
                                {
                                    teamsData != undefined&&
                                    teamsData.teams.sort((a,b) => b.teamName.length-a.teamName.length).map((team) => (

                                        (!editChecked && team.teamName != homeTeam || editChecked && editGame != undefined && team.teamName !=editGame.homeTeam && team.teamName != editGame.foreignTeam)&& <option className={isTeamAlreadyPlayInLive(team.teamName)?"bg-red-400":""}
                                                disabled={isTeamAlreadyPlayInLive(team.teamName)}
                                                key={team.id} value={team.teamName}>{team.teamName}
                                                {isTeamAlreadyPlayInLive(team.teamName)&& " IN GAME"}
                                            </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='flex flex-row '>
                            <label className={'ml-0.5 mr-0.5 mt-2'}>
                                Goals</label>
                            <input className='border relative bg-gray-100 p-2' disabled={(editChecked && editGameIsUndefined()) || (!editChecked && (homeTeam=="" || foreignTeam==""))} value={editChecked ? editGameIsUndefined() ? 0 : editGame.goalsToForeign : goalsToForeign} onChange={editChecked ? handleGoalsToForeignEdit : handleGoalsToForeign} type="number" min={0}/>
                            <label className={'ml-5 mr-0.5 mt-2'}>
                                Goals</label>
                            <input className='border relative bg-gray-100 p-2' disabled={(editChecked && editGameIsUndefined()) || (!editChecked && (homeTeam=="" || foreignTeam==""))} value={editChecked ? editGameIsUndefined() ? 0 : editGame.goalsToHome : goalsToHome} onChange={editChecked ? handleGoalsToHomeEdit : handleGoalsToHome} type="number" min={0}/>
                        </div>

                        <div className="flex-row items-center mt-4">
                            {
                                editChecked&&
                                <>
                                    <input checked={!editGameIsUndefined() && !editGame.inLive} id="default-checkbox" type="checkbox" disabled={editGameIsUndefined()} onChange={handleEditGameInLive}
                                           className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="default-checkbox"
                                           className={editGameIsUndefined() ? "ml-2 text-sm font-medium text-gray-400 dark:text-gray-100" : "ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"}>{!editGameIsUndefined()&&!editGame.inLive ? "Set game as completed" : "Set game as in live"}</label>
                                </>
                            }
                        </div>
                            <button  onClick={editChecked ? handleEditGame : handleAddGame}
                                     disabled={teamsFieldIsEmptyModeAdd() || (editChecked && editGameIsUndefined())}
                                     className={
                                         teamsFieldIsEmptyModeAdd() || (editChecked && editGameIsUndefined())?
                                             'w-[200px] py-3 mt-8 bg-amber-300 opacity-40 text-white'
                                             :
                                             'w-[200px] py-3 mt-8 bg-amber-400 opacity-100 hover:bg-amber-500 text-white'
                                     }
                            >{editChecked ? "Edit game":"Add game"}</button>
                        {
                            !editChecked&&
                            <button
                                className={teamsFieldIsEmptyModeAdd() ?
                                    'ml-4 w-[200px] py-3 mt-8 bg-red-300 opacity-60 text-white'
                                    :
                                    'ml-4 w-[200px] py-3 mt-8 bg-red-500 opacity-100 hover:bg-red-600 text-white'}
                                disabled={teamsFieldIsEmptyModeAdd()}
                                onClick={handleClearAddGame}
                            >Clear all</button>
                        }


                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddGame;