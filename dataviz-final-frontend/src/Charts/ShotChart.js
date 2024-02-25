import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import './ShotChart.css'
import {useParams} from "react-router-dom";


const
    width = 500,
    height = 940;

function drawCourt(svg) {
    let xFeet = d3.scaleLinear()
        .domain([-25,25])
        .range([0,width])

    let yFeet = d3.scaleLinear()
        .domain([-47,47])
        .range([height,0])

    //Backboard
    svg.append('line')
        .attr('x1', xFeet(-3))
        .attr('x2', xFeet(3))
        .attr('y1', yFeet(-43))
        .attr('y2', yFeet(-43))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(-3))
        .attr('x2', xFeet(3))
        .attr('y1', yFeet(43))
        .attr('y2', yFeet(43))
        .attr('stroke', 'black')

    // Center Circle
    svg.append('circle')
        .attr("cx", xFeet(0))
        .attr('cy', yFeet(0))
        .attr('r', xFeet(-19))
        .attr('fill-opacity', 0)
        .attr('stroke', 'black')

    //Free throw circle

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(-28)} A 1 1 0 0 1 ${xFeet(6)} ${yFeet(-28)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(-28)} A 1 1 0 0 0 ${xFeet(6)} ${yFeet(-28)}`)
        .attr('stroke', 'black')
        .attr('stroke-dasharray',xFeet(-24))
        .attr('fill-opacity', 0)

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(28)} A 1 1 0 0 0 ${xFeet(6)} ${yFeet(28)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    svg.append('path')
        .attr('d', `M ${xFeet(-6)} ${yFeet(28)} A 1 1 0 0 1 ${xFeet(6)} ${yFeet(28)}`)
        .attr('stroke', 'black')
        .attr('stroke-dasharray',xFeet(-24))
        .attr('fill-opacity', 0)

    // Inner Paint lines
    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(-8))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(-28))
        .attr('y2', yFeet(-28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(-8))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(28))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(-8))
        .attr('x2', xFeet(8))
        .attr('y1', yFeet(28))
        .attr('y2', yFeet(28))
        .attr('stroke', 'black')

    // 3 point lines

    svg.append('line')
        .attr('x1', xFeet(-22))
        .attr('x2', xFeet(-22))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-33))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(22))
        .attr('x2', xFeet(22))
        .attr('y1', yFeet(-47))
        .attr('y2', yFeet(-33))
        .attr('stroke', 'black')

    svg.append('path')
        .attr('d', `M ${xFeet(-22)} ${yFeet(-33)} A 237 237 0 0 1 ${xFeet(22)} ${yFeet(-33)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    svg.append('line')
        .attr('x1', xFeet(-22))
        .attr('x2', xFeet(-22))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(33))
        .attr('stroke', 'black')

    svg.append('line')
        .attr('x1', xFeet(22))
        .attr('x2', xFeet(22))
        .attr('y1', yFeet(47))
        .attr('y2', yFeet(33))
        .attr('stroke', 'black')

    svg.append('path')
        .attr('d', `M ${xFeet(-22)} ${yFeet(33)} A 237 237 0 0 0 ${xFeet(22)} ${yFeet(33)}`)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0)

    //Mid court line

    svg.append('line')
        .attr('x1', xFeet(-25))
        .attr('x1', xFeet(25))
        .attr('y1', yFeet(0))
        .attr('y2', yFeet(0))
        .attr('stroke','black')
}

function drawShots(svg, data, videoVar) {
    let x = d3.scaleLinear()
        .domain([-250, 250])
        .range([ 0, width ]);

    let y = d3.scaleLinear()
        .domain([-50, 890])
        .range([height, 0]);

    var shape = d3.scaleOrdinal()
        .domain([1,0])
        .range([ d3.symbolCircle, d3.symbolTimes])

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("path")
        .attr("transform", d => `translate(${x(-d.LOC_X)}, ${y(d.LOC_Y)})`)
        .attr("stroke", d => d.SHOT_MADE_FLAG ? "#00FF00" : "#FF0000")
        .attr("stroke-width", 3)
        .attr('d', d3.symbol().size(50).type(d => shape(d.SHOT_MADE_FLAG)))
        .style("fill", d => d.SHOT_MADE_FLAG ? "#00AA00" : "#FF0000")
        .attr('fill-opacity', 0.25)
        .style('cursor', 'pointer')
        .on("click", (e,d) => {
            fetch(`/forceapi/videoeventsasset?GameEventID=${d['GAME_EVENT_ID']}&GameID=${d['GAME_ID']}`)
                .then(res => res.json())
                .then( data => {
                    videoVar(data['resultSets']["Meta"]["videoUrls"][0]["lurl"])
                })
        })
}


export default function ShotChart(props) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef()
    const [video, setVideo] = useState("")
    const params = useParams();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setVideo("");
        setIsOpen(false);
    }

    useEffect( () => {
        if (video !== "") openModal()
    }, [video])

    useEffect( () => {
        fetch(`/api/shotchartdetail?ContextMeasure=FGA&Month=0&OpponentTeamID=0&Period=0&PlayerID=${props.playerId}&Season=2023-24&TeamID=0&GameID=${props.selectedGame}&SeasonType=Regular+Season`)
            .then(resp => resp.json())
            .then(data => {
                const svg = d3.select(ref.current);
                svg.selectAll("*").remove()

                drawCourt(svg);
                drawShots(svg,data['Shot_Chart_Detail'], setVideo)
                svg.attr("height", '70vh')
                    .attr("viewBox", "0 0 " + width + " " + height)
                    .attr("perserveAspectRatio", "xMinYMid")
                    .style("border", "1px solid black")
            })
    },[props.playerId, props.selectedGame])

    return (
        <div>
            <svg ref={ref}/>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={"modal-style"}
            >
                <video src={video} controls="controls" autoPlay />
            </Modal>
        </div>

    )
}