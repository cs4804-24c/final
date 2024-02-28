import { useNavigate } from "react-router-dom";
import img from "../src/derrick.png"


export default function Banner() {
    const navigate = useNavigate();

    return (
        <div>
            <img src={img} style={{height: '6em', cursor: 'pointer'}} onClick={e => navigate('/')}/>
        </div>
    )
}