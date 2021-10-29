import React, { useState, useEffect, useRef } from "react";

// export function ChartCursor({ svgElm, rcClient, lnSegX, axis, data }) {
export function ChartCursor({ svgElm, rcClient, lnSegX, axis, data }) {
    console.log("Call ChartCursor");

    // const self = this;
    const rc = rcClient;
    const [_x, setX] = useState(rc.left);
    const [_y, setY] = useState(rc.top);
    // const [rc, setRC] = useState(rcClient);

    const txtRef = useRef(null);
    // const [txtLength, setLen] = useState(0);
    // let txtLength = 0;
    const [bigestStr, setStr] = useState('');
    // console.log("txtLength", txtLength);

    // const getBiggestStr = (data) => {
    //     // const out = [];
    //     let tmp = '';
    //     let obj = data[0];
    //     // let idxDataHit = Math.trunc((x - rc.left) / lnSegX);
    //     // let posInRange = (x - rc.left) % lnSegX;

    //     // let min = 0, max = 0, cls = 'axis', clrPath = '#000';
    //     for (const key in obj) {
    //         const el = obj[key]; // [21.2, ...]
    //         if (axis[key]) {
    //             // ({ min, max, cls, clrPath } = axis[key]);
    //             // let v1 = el[idxDataHit], v2 = el[idxDataHit + 1];
    //             let str = `${axis[key].name}: ${el[0]}`;
    //             tmp = str.length > bigestStr.length ? str : bigestStr;
    //             // out.push(str);
    //         }
    //     }

    //     setStr(tmp);
    // }

    //TODO: add date aprox

    const getBiggestStr = (axis) => {
        // const out = [];
        let tmp = '';
        // let obj = data[0];
        // let idxDataHit = Math.trunc((x - rc.left) / lnSegX);
        // let posInRange = (x - rc.left) % lnSegX;

        // let min = 0, max = 0, cls = 'axis', clrPath = '#000';
        for (const key in axis) {
            // const el = axis[key]; // [21.2, ...]
            // if (axis[key]) {
            // ({ min, max, cls, clrPath } = axis[key]);
            // let v1 = el[idxDataHit], v2 = el[idxDataHit + 1];
            let str = `${axis[key].name}: -34.5`;
            tmp = str.length > tmp.length ? str : tmp;
            // out.push(str);
            // }
        }

        setStr(tmp);
    }

    const getStrBBox = () => {
        // if (txtRef.current !== null) {
        //     console.log(txtRef.current.getBBox());
        // }
        // txtLength = txtRef.current && txtRef.current.getComputedTextLength();
        // return txtRef.current && txtRef.current.getComputedTextLength();
        return txtRef.current && txtRef.current.getBBox();
    }


    // console.log(`rc.left ${rc.left} rc.right ${rc.right} rc.bottom ${rc.bottom}`);

    // const testPosX=testX.bind(this);
    // function testX(x) {
    //     x = x < rc.left ? rc.left : x;
    //     x = x > rc.right ? rc.right : x;
    //     return x + 0.5;
    // }

    const testPosX = (x) => {
        x = x < rc.left ? rc.left : x;
        x = x > rc.right ? rc.right : x;
        return x + 0.5;
    }

    // const testPosY = (y) => {
    //     y = y < rc.top ? rc.top : y;
    //     y = y > rc.bottom ? rc.bottom : y;
    //     return y + 0.5;
    // }

    // TODO: resize flyNotes
    // TODO: resize padding

    const setPos = (x, y) => {
        setX(x + 0.5);
        setY(y + 0.5);
    }

    // (function setPos(x,y) {
    //     // setX(x + 0.5);
    //     // console.log(`rc.left ${rc.left} rc.right ${rc.right} rc.bottom ${rc.bottom} xres ${x}`);
    //     // console.log(this.rc);
    //     // setX(testPosX(e.offsetX));
    //     // setX(testPosX(x));
    //     _x=testPosX(x);
    //     // setY(y + 0.5);
    // })(x,y);

    // useEffect(() => {
    //     setPos(x, y);
    // }, [x, y]);

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
                let str = `${axis[key].name}: ${aprox(v1, v2, lnSegX, posInRange).toFixed(1)}`;
                // bigestStr = Math.max(bigestStr.length, str.length);               
                out.push(str);
            }
        }
        return out;
    }

    // useEffect(()=>{
    //     txtLength = txtRef.current.getComputedTextLength();
    //     console.log("useEffect txtLength", txtLength);
    // }, [bigestStr]);

    useEffect(() => {
        getBiggestStr(axis);
        // console.log("useEffect bigestStr", bigestStr);
        // setLen(txtRef.current.getComputedTextLength());


        svgElm.current.addEventListener('click', (e) => {
            // setX(e.offsetX);
            // setY(e.offsetY);
            setPos(e.offsetX, e.offsetY);


            // console.log(`rc.left ${rc.left} rc.right ${rc.right} rc.bottom ${rc.bottom}`);
        });

        svgElm.current.addEventListener('mousemove', (e) => {

            // console.log('mouseover', e);
            if (e.buttons === 1) {
                // setX(e.offsetX);
                // setY(e.offsetY);
                setPos(e.offsetX, e.offsetY);
            }
            // e.preventDefault();
            // e.stopPropagation();
            // e.cancelBubble = true;
            // e.returnValue = false;
            // console.log('click clientY', e.clientY);
            // console.log('click offsetY', e.offsetY);

        });

    }, []); // componentDidMount()

    // if (txtRef.current) {
    return (
        <>
            {console.log('draw ChartCursor')}

            <text x={0} y={-50} className="note-text" ref={txtRef}>{bigestStr}</text>
            <path d={`M${_x} ${rc.top}V${rc.bottom}`} className="cursor"></path>
            <FlyNote x={_x} y={_y} bbox={getStrBBox()} arrStr={getVal(_x, _y, 0)} />

        </>

    );
    // } else {
    //     <text x={0} y={50} className="note-text" ref={txtRef}>{bigestStr}</text>
    // }

}

export function FlyNote({ x, y, bbox, arrStr }) {
    console.log('FlyNote bbox', bbox);
    if (bbox && bbox.width) {
        return (
            <>
                <rect x={x} y={y} width={bbox.width + 8} height={(arrStr.length + 0) * bbox.height} className="note" />
                {arrStr.map((el, i) => {
                    // return <text x={x + 4} y={y + (bbox.height / 2) + (i + 0) * bbox.height} className="note-text">{el}  </text>;
                    return <text x={x + 4} y={y + (bbox.height * 0.7) + (i + 0) * bbox.height} className="note-text">{el}  </text>;
                })
                }
            </>


        );
    } else {
        return (<></>);
    }

}
