import React, { useState, useEffect } from "react";

// export function ChartCursor({ svgElm, rcClient, lnSegX, axis, data }) {
export function ChartCursor({ svgElm, rc, lnSegX, axis, data }) {
    console.log("Call ChartCursor");


    const [x, setX] = useState(rc.left);
    const [y, setY] = useState(rc.top);
    // const [rc, setRC] = useState(rcClient);

    // console.log(`rc.left ${rc.left} rc.right ${rc.right} rc.bottom ${rc.bottom}`);

    const testPosX = (x) => {
        x = x < rc.left ? rc.left : x;
        x = x > rc.right ? rc.right : x;
        return x + 0.5;
    }

    const testPosY = (y) => {
        y = y < rc.top ? rc.top : y;
        y = y > rc.bottom ? rc.bottom : y;
        return y + 0.5;
    }

    // TODO: resize flyNotes
    // TODO: resize padding

    // const setPos = (x, y) => {
    //     setX(x + 0.5);
    // console.log(`rc.left ${rc.left} rc.right ${rc.right} rc.bottom ${rc.bottom} xres ${x}`);
    // setX(testPosX(x) + 0.5);
    // setY(y + 0.5);
    // }

    const aprox = (v1, v2, range, posInRange) => {
        return v1 + ((v2 - v1) * posInRange) / range;
    }

    const getVal = (x, y, idxDataSet) => {
        const out = [];
        let obj = data[idxDataSet];
        let idxDataHit = Math.trunc((x - rc.left) / lnSegX);
        let posInRange = (x - rc.left) % lnSegX;

        // let min = 0, max = 0, cls = 'axis', clrPath = '#000';
        for (const key in obj) {
            const el = obj[key]; // [21.2, ...]
            if (axis[key]) {
                // ({ min, max, cls, clrPath } = axis[key]);
                let v1 = el[idxDataHit], v2 = el[idxDataHit + 1];
                out.push(`${axis[key].name}: ${aprox(v1, v2, lnSegX, posInRange).toFixed(1)}`);
            }
        }
        return out;
    }

    useEffect(() => {
        svgElm.current.addEventListener('click', (e) => {
            setX(e.offsetX);
            setY(e.offsetY);
        });

        svgElm.current.addEventListener('mousemove', (e) => {

            // console.log('mouseover', e);
            if (e.buttons === 1) {
                setX(e.offsetX);
                setY(e.offsetY);
            }
            // e.preventDefault();
            // e.stopPropagation();
            // e.cancelBubble = true;
            // e.returnValue = false;
            // console.log('click clientY', e.clientY);
            // console.log('click offsetY', e.offsetY);

        });

    }, []); // componentDidMount()

    return (

        <>
            {console.log('draw ChartCursor')}

            <path d={`M${testPosX(x)} ${rc.top}V${rc.bottom}`} className="cursor"></path>
            <FlyNote x={testPosX(x)} y={testPosY(y)} arrStr={getVal(testPosX(x), testPosY(y), 0)} />
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
