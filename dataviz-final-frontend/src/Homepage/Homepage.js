import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';



export default function Homepage() {
    const navigate = useNavigate();
    const [playerList, setPlayerList] = useState([])
    const onPlayerSelect = e => {
        console.log(e.target.value)
        navigate('/playerpage/'+e.target.value)
    }

    useEffect( () => {
        fetch('/api/playerindex?LeagueID=00&Season=2023-24&SeasonType=Regular+Season')
            .then(res => res.json())
            .then( data => {
                setPlayerList(data['PlayerIndex'])
            })
    }, [])

    return (
        <div className='homepage'>
            <h4>Select a Player:</h4>
            <select type={"text"} onChange={onPlayerSelect}>
                {
                    playerList.map( e => {
                        return <option key={e['PERSON_ID']} value={e['PERSON_ID']}>{e['PLAYER_FIRST_NAME'] + " " + e['PLAYER_LAST_NAME']}</option>
                    })
                }
            </select>
        </div>
    )
}