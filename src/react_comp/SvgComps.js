import React, { useState, useEffect } from "react";

export function Axle({ d, cls }) {
    // console.log(`create Axis arguments:`, arguments);// ${x} ${y}
    return (
        <path d={d} class={cls} ></path>
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
