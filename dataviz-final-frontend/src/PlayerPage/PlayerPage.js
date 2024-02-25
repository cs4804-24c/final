import {useParams} from "react-router-dom";
import ShotChart from "../Charts/ShotChart";
import {useEffect, useState} from "react";
import DetailsPanel from "./DetailsPanel";

export default function PlayerPage() {
    const params = useParams();
    const [gameList, setGameList] = useState([])
    const [selectedGame, setGame] = useState("")

    function selectGame(event) {
        console.log(event.target)
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
            <ShotChart playerId={params.playerId} selectedGame={selectedGame} />
        </div>
    )
}