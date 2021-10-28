import React, { useState, useEffect } from "react";

export function ChartCursor({ svgElm, rc, lnSegX, axis, data }) {
    const [x, setX] = useState(rc.left);
    const [y, setY] = useState(rc.top);

    const setPos = (x, y) => {
        setX(x + 0.5);
        // setY(y + 0.5);
    }

    const getVal = (x, y) => {
        let obj = data[0];
        // let axle = axis["t"];
        let idxDataHit = Math.trunc((x - rc.left) / lnSegX);
        // let val = axle.max/rc.bottom-rc.top  dataObj[idxDataHit];
        // let val = dataObj.t[idxDataHit];

        const out = [];
        let min = 0, max = 0, cls = 'axis', clrPath = '#000';
        for (const key in obj) {
            const el = obj[key]; // [21.2, ...]
            if (axis[key]) {
                ({ min, max, cls, clrPath } = axis[key]);
                out.push(`${axis[key].name}: ${20}`);
            }
        }
        return out;
    }

    useEffect(() => {
        svgElm.current.addEventListener('click', (e) => {
            // console.log('click', e.clientX);
            setPos(e.clientX, e.clientY);
        });

    }, []); // componentDidMount()

    return (
        <>
            <path d={`M${x} ${y}V${rc.bottom}`} className="cursor"></path>
            <FlyNote x={x} y={y} arrStr={getVal(x, y)} />
        </>

    );
}

export function FlyNote({ x, y, arrStr }) {
    return (
        <>
            <rect x={x} y={y} width="60" height="30" className="note" />
            {arrStr.map((el, i) => {
                return <text x={x} y={y + (i + 1) * 12} className="note-text">{el}  </text>;
            })
            }


        </>


    );
}
