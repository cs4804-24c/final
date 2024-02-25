import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './DetailsPanel.css'


export default function DetailsPanel() {
    const params = useParams();
    const [careerData, setCareerData] = useState({});
    useEffect( () => {
        fetch(`/api/playercareerstats?LeagueID=&PerMode=PerGame&PlayerID=${params.playerId}`)
            .then( res => res.json())
            .then( data => {
                setCareerData(data['CareerTotalsRegularSeason'][0])
            })
    },[params.playerId])


    return (
        <div id='detail-panel'>
            <img width='5%' src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${params.playerId}.png`} alt={"Player Headshot"}></img>
            <table>
                <thead>
                        <tr><th colSpan="2">Career Average Stats</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PTS</td>
                        <td>{careerData['PTS']}</td>
                    </tr>
                    <tr>
                        <td>MIN</td>
                        <td>{careerData['MIN']}</td>
                    </tr>
                    <tr>
                        <td>FG PCT</td>
                        <td>{careerData['FG_PCT']*100+"%"}</td>
                    </tr>
                    <tr>
                        <td>FG3 PCT</td>
                        <td>{careerData['FG3_PCT']*100+"%"}</td>
                    </tr>
                    <tr>
                        <td>FT PCT</td>
                        <td>{careerData['FT_PCT']*100+"%"}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}