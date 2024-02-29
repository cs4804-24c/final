import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';
import Banner from "../Banner";



export default function Homepage() {
    const navigate = useNavigate();
    const [playerList, setPlayerList] = useState([])
    const [todaysGames, setTodaysGames] = useState([])
    const onPlayerSelect = e => {
        navigate('/playerpage/'+e.target.value);
    }

    const onGameClick = gameID => {
        navigate('/game/'+gameID);
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
        fetch(`/api/leaguegamefinder?LeagueID=00&PlayerOrTeam=T&DateFrom=${date.getMonth()+1}/${date.getDate()-1}/${date.getFullYear()}`)
            .then(res => res.json())
            .then( data => {
                setTodaysGames(data['LeagueGameFinderResults'])
            })
    }, [])

    return (
        <div className='homepage'>
            <Banner/>
            <h4>Select a Player:</h4>
            <select type="text" onChange={onPlayerSelect}>
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
                        if (!e['MATCHUP'].includes('@')) {
                            return (
                                <div key={e['GAME_ID']} onClick={() => onGameClick(e['GAME_ID'])} className='matchup'>
                                    <h4 style={{margin:'0.5em'}}>{e['MATCHUP']}</h4>
                                    <h6 style={{margin:'0.5em'}}>{e['GAME_DATE']}</h6>
                                </div>

                            )
                        }
                    })
                }
            </div>
            <button onClick={() => navigate('/parallelplot')}>Show me the Stats!</button>
        </div>
    )
}