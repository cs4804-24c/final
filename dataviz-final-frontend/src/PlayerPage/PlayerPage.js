import {useParams} from "react-router-dom";
import ShotChart from "../Charts/ShotChart";
import {useEffect, useState} from "react";
import DetailsPanel from "./DetailsPanel";

export default function PlayerPage() {
    const params = useParams();
    const [shotData, setShotData] = useState([])
    const [gameList, setGameList] = useState([])
    const [selectedGame, setGame] = useState("")

    function selectGame(event) {
        setGame(event.target.value);
    }

    useEffect( () => {
        fetch(`/api/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${params.playerId}&Season=2023-24&SeasonType=Regular+Season`)
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
    }, [params.playerId])

    useEffect( () => {
        fetch(`/api/shotchartdetail?ContextMeasure=FGA&Month=0&OpponentTeamID=0&Period=0&PlayerID=${params.playerId}&Season=2023-24&TeamID=0&GameID=${selectedGame}&SeasonType=Regular+Season`)
            .then(resp => resp.json())
            .then(data => {
                setShotData(data['Shot_Chart_Detail'])
            })
    },[params.playerId, selectedGame])
    return (
        <div>
            <DetailsPanel playerId={params.playerId} />
            <label>Choose a game: </label>
            <select onChange={selectGame}>
                <option value=" " key="All Games">All Games</option>
                {
                    Array.from(gameList).map( e => {
                        return <option key={e.ID} value={e.ID}>{e['name']}</option>
                    })
                }
            </select>
            <ShotChart shotData={shotData}/>
        </div>
    )
}