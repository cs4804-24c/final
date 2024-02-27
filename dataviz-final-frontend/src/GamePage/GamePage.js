import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import Modal from "react-modal";


export default function GamePage() {
    const params = useParams();
    const ref = useRef();
    const [video, setVideo] = useState("")
    const [isOpen, setIsOpen] = useState(false);


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setVideo("");
        setIsOpen(false);
    }




    // play by play
    useEffect( () => {
        const colors = {
            1:'#00FF00', //Shot made
            2:'#FF0000', //Shot missed
            9:'#0000FF', // TIMEOUT
            12:'#00FFFF'
        }
        fetch(`/api/playbyplayv2?EndPeriod=0&GameID=${params.gameId}&StartPeriod=0`)
            .then( res => res.json())
            .then( data => {
                const svg = d3.select(ref.current);
                svg.selectAll("*").remove()
                if(data['PlayByPlay'].length===0) {
                    svg.attr("viewBox", "0 0 " + 800 + " " + 400)
                        .attr("perserveAspectRatio", "xMinYMid")
                        .attr('width', '50%')
                    svg.append('text')
                        .attr('x', 400)
                        .attr('y', 100)
                        .style("stroke","black")
                        .attr('text-anchor', 'middle')
                        .text("Play by Play data not available")
                    return;
                }
                data = data['PlayByPlay']
                const height = 100*data[data.length-1]['EVENTNUM']+100,
                    width = 800
                svg.attr("viewBox", "0 0 " + width + " " + height)
                    .attr("perserveAspectRatio", "xMinYMid")
                    .attr('width', '50%')
                svg.append('line')
                    .attr('x1', 400)
                    .attr('x2', 400)
                    .attr('y1', 100)
                    .attr('y2', 100*data[data.length-1]['EVENTNUM']-100)
                    .style("stroke","black")

                data.forEach( e => {
                    svg.append('line')
                        .attr('x1', 375)
                        .attr('x2', 425)
                        .attr('y1', 100*e['EVENTNUM']-100)
                        .attr('y2', 100*e['EVENTNUM']-100)
                        .attr('stroke-width', 10)
                        .style("stroke", colors[e['EVENTMSGTYPE']] || "black")
                    //Event
                    svg.append('text')
                        .attr('x', 350)
                        .attr('y', 100*e['EVENTNUM']-95)
                        .attr('text-anchor', 'end')
                        .attr('font-size','0.75em')
                        .text(e['HOMEDESCRIPTION'] || e['NEUTRALDESCRIPTION'] || e['VISITORDESCRIPTION'])
                    //Time
                    svg.append('text')
                        .attr('x', 450)
                        .attr('y', 100*e['EVENTNUM']-95)
                        .text(`${e['PCTIMESTRING']}`)
                    svg.append('text')
                        .attr('x', 450)
                        .attr('y', 100*e['EVENTNUM']-55)
                        .text(e['SCORE'] || "")
                })
            })
    }, [params.gameId])


    return (
        <div style={{textAlign: "center"}}>
            <svg ref={ref}/>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={"modal-style"}
                ariaHideApp={false}
            >
                <video src={video} controls="controls" autoPlay />
            </Modal>
        </div>
    )
}