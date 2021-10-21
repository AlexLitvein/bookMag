import React, { useState, useEffect } from "react";
// import MyGraph from "../classes/ChartObject";

const Axle = ({ d, cls }) => {
    //console.log(`create Axis`);// ${x} ${y}
    return (
        <path d={d} class={cls} ></path>
    );
}

const TextSvg = ({ opt }) => {
    return (
        <>
            {opt.msgFunc('draw TextSvg')}
            <text x="0" y={opt.y}>{opt.text}</text>
        </>
    );

}

// const TextSvg = ({ text, y }) => {
//     return (
//         <>
//             {console.log('draw TextSvg')}
//             <text x="0" y={y}>{text}</text>
//         </>
//     );

// }

// const Marker = ({ id }) => {
//     return (
//         <defs>
//             <marker id="mrkVHAxis"
//                 className={MyGraph.markers[id].cls}
//                 markerWidth={MyGraph.markers[id].w}
//                 markerHeight={MyGraph.markers[id].h}
//                 refX={MyGraph.markers[id].refX + 0.5} refY={MyGraph.markers[id].refY + 0.5}
//                 orient="auto">
//                 <line x1="0" y1="0" x2="0" y2={MyGraph.markers[id].h} />
//             </marker>
//         </defs>
//     );
// }

export { Axle, TextSvg }; // Marker, 
