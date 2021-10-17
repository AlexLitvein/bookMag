import React, { useState, useEffect } from "react";
import MyGraph from "../classes/ChartObject";

const Axis = ({ id }) => {    
    //console.log(`create Axis`);// ${x} ${y}
    return (
        <path d={MyGraph.axis[id].d} class={MyGraph.axis[id].cls} ></path>
    );
}

const Marker = ({ id }) => {
    return (
        <defs>
            <marker id="mrkVHAxis" 
            class={MyGraph.markers[id].cls} 
            markerWidth={MyGraph.markers[id].w}
            markerHeight={MyGraph.markers[id].h} 
            refX={MyGraph.markers[id].refX+0.5} refY={MyGraph.markers[id].refY+0.5}
            orient="auto">
                <line x1="0" y1="0" x2="0" y2={MyGraph.markers[id].h} />
            </marker>
        </defs>
    );
}

export { Axis, Marker };
