import React, { useState, useEffect, useRef } from "react";

export function ChartCursor({ svgElm, gObj, axis, data }) {
    console.log("Call ChartCursor");

    gObj.noteW = 0;
    gObj.noteH = 0;
    const [_x, setX] = useState(gObj.rcClient.left);
    const [_y, setY] = useState(gObj.rcClient.top);

    // const txtRef = useRef(null);    
    // const [bigestStr, setStr] = useState('');

    // const getBiggestStr = (axis) => {
    //     // const out = [];
    //     let tmp = '';
    //     // let obj = data[0];
    //     // let idxDataHit = Math.trunc((x - rc.left) / lnSegX);
    //     // let posInRange = (x - rc.left) % lnSegX;

    //     // let min = 0, max = 0, cls = 'axis', clrPath = '#000';
    //     for (const key in axis) {
    //         // const el = axis[key]; // [21.2, ...]
    //         // if (axis[key]) {
    //         // ({ min, max, cls, clrPath } = axis[key]);
    //         // let v1 = el[idxDataHit], v2 = el[idxDataHit + 1];
    //         let str = `${axis[key].name}: -34.5`;
    //         tmp = str.length > tmp.length ? str : tmp;
    //         // out.push(str);
    //         // }
    //     }

    //     setStr(tmp);
    // }

    // const getStrBBox = () => {
    //     // if (txtRef.current !== null) {
    //     //     console.log(txtRef.current.getBBox());
    //     // }
    //     // txtLength = txtRef.current && txtRef.current.getComputedTextLength();
    //     // return txtRef.current && txtRef.current.getComputedTextLength();
    //     return txtRef.current && txtRef.current.getBBox();
    // }

    const testPosX = (x) => {
        x = x < gObj.rcClient.left ? gObj.rcClient.left : x;
        x = x > gObj.rcClient.right ? gObj.rcClient.right : x;
        return x;
    }
    const testPosY = (y) => {
        y = y < gObj.rcClient.top ? gObj.rcClient.top : y;
        y = y > gObj.rcClient.bottom ? gObj.rcClient.bottom : y;
        return y;
    }

    const setPos = (x, y) => {
        setX(testPosX(x) + 0.5);
        setY(testPosY(y) + 0.5);
    }

    const aprox = (v1, v2, range, posInRange) => {
        return v1 + ((v2 - v1) * posInRange) / range;
    }

    const getVal = (x, y, idxDataSet) => {
        const out = [];
        let obj = data[idxDataSet];
        let idxDataHit = Math.trunc((x - gObj.rcClient.left) / gObj.lnHSeg);
        let posInRange = (x - gObj.rcClient.left) % gObj.lnHSeg;

        // let min = 0, max = 0, cls = 'axis', clrPath = '#000';
        for (const key in obj) {
            const el = obj[key]; // [21.2, ...]
            if (axis[key]) {
               
                if (axis[key].type === 'H') {
                    continue;
                }

                let v1 = el[idxDataHit], v2 = el[idxDataHit + 1] || v1;
                let str = `${axis[key].name}: ${aprox(v1, v2, gObj.lnHSeg, posInRange).toFixed(1)}`;

                gObj.noteW = str.length * gObj.avgSymW > gObj.noteW ? str.length * gObj.avgSymW : gObj.noteW;
                gObj.noteH += gObj.fontBBoxHeight;

                // console.log('gObj.noteW', gObj.noteW);
                // bigestStr = Math.max(bigestStr.length, str.length);               
                out.push(str);
            }
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
    const calcRect = () => {
        let out = {
            x: x,
            y: y,
            // width: gObj.noteW + 8,
            // height: (arrStr.length + 0) * gObj.fontBBoxHeight,
        };

        // if (out.x + out.width > gObj.rcClient.right) {
        //     out.x = out.x - out.width;
        // }
        if (out.x + gObj.noteW > gObj.rcClient.right) {
            out.x = out.x - gObj.noteW;
        }

        if (out.y + gObj.noteH > gObj.rcClient.bottom) {
            out.y = gObj.rcClient.bottom - gObj.noteH;
        }

        return out;
    }

    const [pos, setPos] = useState({ x: 0, y: 0 });
    // const [rc, setRc] = useState({ x: 0, y: 0, width: 0, height: 0 });
    // const [rc, setRc] = useState(calcRect());

    // setRc(calcRect());
    useEffect(() => {
        // setRc(calcRect());
        setPos(calcRect());
    }, [x, y]);

    if (gObj.noteW) {
        return (
            <>
                {/* <rect {...rc} className="note" /> */}
                <rect {...pos} width={gObj.noteW} height={gObj.noteH} className="note" />
                {arrStr.map((el, i) => {
                    // return <text x={x + 4} y={y + (bbox.height / 2) + (i + 0) * bbox.height} className="note-text">{el}  </text>;
                    // return <text x={x + 4} y={y + (gObj.fontBBoxHeight * 0.7) + (i + 0) * gObj.fontBBoxHeight} className="note-text">{el}  </text>;
                    return <text x={pos.x + 4} y={pos.y + (gObj.fontBBoxHeight * 0.7) + (i + 0) * gObj.fontBBoxHeight} className="note-text">{el}  </text>;
                })
                }
            </>


        );
    } else {
        return 0;
    }

}
