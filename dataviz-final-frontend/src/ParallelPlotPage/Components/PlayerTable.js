import './PlayerTable.css'


export default function PlayerTable(props) {

    return (
        <div id='detail-panel'>
            <table>
                <thead>
                        <tr><th colSpan="2">{props.tableTitle}</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>FG PCT</td>
                        <td>{(props.playerData['FG_PCT']*100).toFixed(1)+"%"}</td>
                    </tr>
                    <tr>
                        <td>FG3 PCT</td>
                        <td>{(props.playerData['FG3_PCT']*100).toFixed(1)+"%"}</td>
                    </tr>
                    <tr>
                        <td>FT PCT</td>
                        <td>{(props.playerData['FT_PCT']*100).toFixed(1)+"%"}</td>
                    </tr>
                    <tr>
                        <td>REB</td>
                        <td>{(props.playerData['REB'] / props.playerData['GP']).toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>AST</td>
                        <td>{(props.playerData['AST'] / props.playerData['GP']).toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>STL</td>
                        <td>{(props.playerData['STL'] / props.playerData['GP']).toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>BLK</td>
                        <td>{(props.playerData['BLK'] / props.playerData['GP']).toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>PPG</td>
                        <td>{(props.playerData['PTS'] / props.playerData['GP']).toFixed(1)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}