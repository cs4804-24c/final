import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';



export default function Homepage() {
    const navigate = useNavigate();
    const [playerList, setPlayerList] = useState([])
    const [todaysGames, setTodaysGames] = useState([])
    const onPlayerSelect = e => {
        console.log(e.target.value)
        navigate('/playerpage/'+e.target.value)
    }

    useEffect( () => {
        fetch('/players.json')
            .then(res => res.json())
            .then( data => {
                setPlayerList(data)
            })
    }, [])

    //Recent Games
    useEffect( () => {
        let date = new Date(Date.now())
        fetch(`/api/leaguegamefinder?PlayerOrTeam=T&DateFrom=${date.getMonth()+1}/${date.getDate()-1}/${date.getFullYear()}`)
            .then(res => res.json())
            .then( data => {
                setTodaysGames(data['LeagueGameFinderResults'])
            })
    }, [])

    return (
        <div className='homepage'>
            <h4>Select a Player:</h4>
            <select type={"text"} onChange={onPlayerSelect}>
                {
                    playerList.map( e => {
                        return <option key={e['id']} value={e['id']}>{e['full_name']}</option>
                    })
                }
            </select>
            <h4>Recent Games:</h4>
            <div>
                {
                    todaysGames.map( e => {
                        return (
                            <div>
                            <h5>{e['MATCHUP']}</h5>
                            <h6>{e['GAME_DATE']}</h6>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}