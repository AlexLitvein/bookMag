import React, { useState, useEffect, useMemo } from "react";

export const AniPath = ({ pref, cls, d, to, clrPath }) => {
    console.log("AniPath", pref);

    const [td, setTD] = useState({ t: "", d: "", });

    useEffect(() => {
        console.log(`AniPath useEffect `);

        setTD((prev) => {
            console.log('prev', prev);
            const res = {};
            if (prev.d.length === 0 || prev.d.length !== to.length) {
                res.d = d;
            } else {
                res.d = prev.t;
            }
            res.t = to;
            console.log('AniPath res', res);
            return res;
        });

    }, [to, d]);

    return (
        <path
            className={cls}
            style={{ stroke: clrPath, marker: `url("#mrk_${pref}")` }}
            // d={pD}>
            d={td.d}>
            <animate id={`ani_${pref}`} begin="ani_set_data.begin" attributeName="d" dur="0.5" fill="freeze" to={td.t} />
        </path>
    );
}

export function Axle({ d, cls }) {
    return (
        <path d={d} className={cls} ></path>
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
