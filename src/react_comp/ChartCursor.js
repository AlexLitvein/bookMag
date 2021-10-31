import React, { useState, useEffect, useRef } from "react";

export function ChartCursor({ svgElm, gObj, axis, data }) {
    console.log("Call ChartCursor");

    gObj.noteW = 0;
    gObj.noteH = 0;
    
    const [_x, setX] = useState(gObj.rcClient.right);
    const [_y, setY] = useState(gObj.rcClient.top);

    const testPosX = (x) => {
        x = x < gObj.rcClient.left ? gObj.rcClient.left : x;
        x = x > gObj.rcClient.right ? gObj.rcClient.right : x;

        console.log(`x ${x} gObj.rcClient.right ${gObj.rcClient.right} `);
        return x;
    }
    const testPosY = (y) => {
        y = y < gObj.rcClient.top ? gObj.rcClient.top : y;
        y = y > gObj.rcClient.bottom ? gObj.rcClient.bottom : y;
        return y;
    }

    const setPos = (x, y) => {
        setX(testPosX(x));
        setY(testPosY(y));
    }

    const aprox = (v1, v2, range, posInRange) => {
        return v1 + ((v2 - v1) * posInRange) / range;
    }

    const getVal = (x, y, idxDataSet) => {
        const out = [];
        let obj = data[idxDataSet];
        let idxDataHit = Math.trunc((x - gObj.rcClient.left) / gObj.lnHSeg);
        let posInRange = (x - gObj.rcClient.left) % gObj.lnHSeg;

        for (const key in obj) {
            const el = obj[key]; // [21.2, ...]
            let v1 = el[idxDataHit];
            let v2 = idxDataHit + 1 >= el.length ? el[idxDataHit] : el[idxDataHit + 1];
            // console.log(`v1 ${v1} v2 ${v2} idxDataHit + 1 ${idxDataHit + 1}`);

            if (axis[key].type === 'H') {
                v1 = Date.parse(v1);
                v2 = Date.parse(v2);
            }

            let apx = aprox(v1, v2, gObj.lnHSeg, posInRange);
            let res = apx.toFixed(1);

            if (axis[key].type === 'H') {
                res = new Date(apx);
                res =
                    ('0' + res.getDate()).slice(-2) +
                    '/' + ('0' + (res.getMonth() + 1)).slice(-2) +
                    '/' + res.getFullYear() % 100 + " " +
                    ('0' + res.getHours()).slice(-2) + ':' +
                    ('0' + res.getMinutes()).slice(-2);
            }

            let str = `${axis[key].name}: ${res}`;
            const sz = gObj.getStrBoundSize(str);
            gObj.noteW = sz.width > gObj.noteW ? sz.width : gObj.noteW;
            gObj.noteH += sz.height;
            out.push({ clr: axis[key].clrPath, txt: str });
        }
        return out;
    }

    useEffect(() => {
        svgElm.current.addEventListener('click', (e) => {
            setPos(e.offsetX, e.offsetY);
            // console.log(`rc.left ${rc.left} rc.right ${rc.right} rc.bottom ${rc.bottom}`);
        });

        svgElm.current.addEventListener('mousemove', (e) => {

            // console.log('mouseover', e);
            if (e.buttons === 1) {
                setPos(e.offsetX, e.offsetY);
            }
        });

    }, []); // componentDidMount()

    return (
        <>
            {console.log('draw ChartCursor')}

            <path d={`M${_x} ${gObj.rcClient.top}V${gObj.rcClient.bottom}`} className="cursor"></path>
            <FlyNote x={_x} y={_y} gObj={gObj} arrStr={getVal(_x, _y, 0)} />
        </>
    );
}

export function FlyNote({ x, y, gObj, arrStr }) {
    // console.log('FlyNote gObj', gObj);
    const testPos = () => {
        let out = { x: x, y: y, };
        if (out.x + gObj.noteW > gObj.rcClient.right) {
            out.x = out.x - gObj.noteW;
        }
        if (out.y + gObj.noteH > gObj.rcClient.bottom) {
            out.y = gObj.rcClient.bottom - gObj.noteH;
        }
        return out;
    }

    function createRoundRect(x, y, w, h, r) {
        return (`
        M${x},${y} a${r},${r} 0 0,1 ${r},${-r} 
        h${w - (r << 1)} a${r},${r} 0 0,1 ${r},${r}
        v${h - r} a${r},${r} 0 0,1 ${-r},${r}
        h${-w + (r << 1)} a${r},${r} 0 0,1 ${-r},${-r}z
        `)
    }

    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        setPos(testPos());
    }, [x, y]);

    if (gObj.noteW) {
        return (
            <>
                <path d={createRoundRect(pos.x, pos.y, gObj.noteW, gObj.noteH, 6)} className="note" />
                {arrStr.map((el, i) => {
                    return <text x={pos.x + 4} y={pos.y + (gObj.fontBBoxHeight * 0.7) + (i + 0) * gObj.fontBBoxHeight} className="note-text" fill={el.clr}>{el.txt}  </text>;
                })
                }
            </>
        );
    } else {
        return 0;
    }
}
