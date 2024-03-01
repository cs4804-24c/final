import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css';
import Banner from "../Banner";
import pdf from "../ProcessBook.pdf"




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
        let adjustedDate = Date.now()/1000-86400
        let date = new Date(0)
        date.setUTCSeconds(adjustedDate)
        fetch(`/api/leaguegamefinder?LeagueID=00&PlayerOrTeam=T&DateFrom=${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`)
            .then(res => res.json())
            .then( data => {
                setTodaysGames(data['LeagueGameFinderResults'])
            })
    }, [])

    return (
        <div>
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
            <br/>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/CBffDvCBY2U?si=2xg0N0fvJ1n1JqYE"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
            <iframe src={pdf} width="75%" height="750px"></iframe>

        </div>
    )
}