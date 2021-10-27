import React from "react";

// export const TextGroup = ({ rcClient, orient, offsX, offsY, texts }) => {
//     let ox = offsX, oy = offsY, angle = 0, x = rcClient.left, y = rcClient.top;
//     // let angle = orient === 'v' ? -90 : 0;
//     if (orient === 'v') {
//         x = rcClient.left;
//         y = rcClient.bottom;
//         angle = -90;
//         ox = offsY;
//         oy = offsX;
//     }
//     return (
//         <g id="x_text" class="txt-axis" transform={`translate(${x}, ${y}) rotate(${angle})`}>

//             {
//                 texts.map((el, i) => {
//                     // return (<TextSvg x={x + ox * i} y={y + oy * i} text={el} />);
//                     return (<TextSvg x={0} y={oy * i} text={el} />);
//                 })
//             }
//         </g>
//     );
// }

export const TextGroup = ({ x, y, orient, offsX, offsY, texts, clr }) => {
    let ox = offsX, oy = offsY, angle = 0;
    if (orient === 'V') {
        angle = -90;
        ox = offsY;
        oy = offsX;
    }
    return (
        <g class="txt-axis" fill={clr} transform={`translate(${x}, ${y}) rotate(${angle})`}>
            {
                texts.map((el, i) => {
                    return (<TextSvg x={ox * i} y={oy * i} text={el} />);
                })
            }
        </g>
    );
}

const TextSvg = ({ x, y, text }) => {
    return (
        <text x={x} y={y}>{text}</text>
    );
}

// export { TextGroup, TextSvg };