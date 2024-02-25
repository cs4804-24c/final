import {useParams} from "react-router-dom";
import ShotChart from "../Charts/ShotChart";
import {useEffect, useState} from "react";
import StatTable from "./Components/StatTable";
import "./PlayerPage.css"

export default function PlayerPage() {
    const params = useParams();
    const [seasonList, setSeasonList] = useState([])
    const [gameList, setGameList] = useState([])
    const [selectedGame, setGame] = useState("")
    const [selectedSeason, setSeason] = useState("2023-24")

    function selectGame(event) {
        setGame(event.target.value);
    }

    function selectSeason(event) {
        setSeason(event.target.value);
    }

    // Career Stats
    const [careerData, setCareerData] = useState(false);
    useEffect( () => {
        fetch(`/api/playercareerstats?LeagueID=&PerMode=PerGame&PlayerID=${params.playerId}`)
            .then( res => res.json())
            .then( data => {
                data['SeasonTotalsRegularSeason'] = data['SeasonTotalsRegularSeason'].reverse()
                let tempSeasonList=[]
                data['SeasonTotalsRegularSeason'].forEach( season => {
                    tempSeasonList.push(season['SEASON_ID'])
                })
                setSeason(tempSeasonList[0])
                setSeasonList(tempSeasonList)
                setCareerData(data)
            })
    },[params.playerId])

    // Populate Game List
    useEffect( () => {
        fetch(`/api/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${params.playerId}&Season=${selectedSeason}&SeasonType=Regular+Season`)
            .then(res => res.json())
            .then( data => {
                data = data['PlayerGameLog']
                let setList = new Set(data.map(e => (JSON.stringify({
                    'name': `${e['MATCHUP']} - ${e['GAME_DATE']}`,
                    'ID': e['Game_ID']
                }))))
                let newList = []
                setList.forEach( e => {
                    e = JSON.parse(e);
                    newList.push(e);
                })
                setGameList(newList)
            })
    }, [params.playerId, selectedSeason])


    return (
        <div>
            <img height='100em' src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${params.playerId}.png`} alt={"Player Headshot"}></img><br/>
            <label>Choose a season: </label>
            <select onChange={selectSeason}>
                {
                    seasonList.map( e => {
                        return <option key={e} value={e}>{e}</option>
                    })
                }
            </select>
            <div className="hold-table">
                {careerData && <StatTable tableTitle="Career Average Stats" playerData={careerData['CareerTotalsRegularSeason'][0]} />}
                {careerData && <StatTable tableTitle={`${selectedSeason} Season Average Stats`} playerData={careerData['SeasonTotalsRegularSeason'][seasonList.indexOf(selectedSeason)]} />}
            </div>

            <label>Choose a game: </label>
            <select onChange={selectGame}>
                <option value=" " key="All Games">All Games</option>
                {
                    Array.from(gameList).map( e => {
                        return <option key={e.ID} value={e.ID}>{e['name']}</option>
                    })
                }
            </select>
            <ShotChart playerId={params.playerId} selectedGame={selectedGame} season={selectedSeason} />
        </div>
    )
}