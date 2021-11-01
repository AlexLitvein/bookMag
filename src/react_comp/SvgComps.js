import React, { useState, useEffect } from "react";

export const AniPath = ({ pref, cls, d, to, clrPath }) => {

    const [pD, setPD] = useState('');
    const [pTo, setPTo] = useState('');

    useEffect(() => {
        // console.log(`AniPath useEffect ${x} ${y}`);

        if (pD.length === 0 || pD.length !== to.length) {
            setPD(d);            
        } else {
            setPD(pTo);
        }
        setPTo(to);
    });

    return (
        <path
            className={cls}
            style={{ stroke: clrPath, marker: `url("#mrk_${pref}")` }}
            d={pD}>
            <animate id={`ani_${pref}`} begin="ani_set_data.begin" attributeName="d" dur="0.5" fill="freeze" to={pTo} />
        </path>
    );
}

export function Axle({ d, cls }) {
    // console.log(`create Axis arguments:`, arguments);// ${x} ${y}
    return (
        <path d={d} class={cls} ></path>
        // <path d={d} {...props}></path>
    );
}

export const SvgMarker = ({ id, cls, w, h, refX, refY, mrkEl }) => {
    return (
        <defs>
            <marker id={id}
                className={cls}
                markerWidth={w}
                markerHeight={h}
                refX={refX} refY={refY}
                orient="auto"
                markerUnits="userSpaceOnUse"
            >
                {mrkEl}
            </marker>
        </defs>
    );
}


// export { Axle, TextSvg }; // Marker, 
