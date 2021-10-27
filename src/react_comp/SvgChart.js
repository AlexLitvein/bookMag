import React, { useState, useEffect, useRef } from "react";
import { Axle } from "./SvgComps";
import { TextGroup } from "./SvgTextGroup";

const SvgChart = ({ options, axis, dataSets = [] }) => {
    const [w, setW] = useState(320);
    const [h, setH] = useState(320);

    const _clientRect = () => { // oreder!
        return {
            left: options.padding.left,
            top: options.padding.top,
            right: w - options.padding.right,
            bottom: h - options.padding.bottom
        };
    }
    // let options = opt;
    let rcClient = _clientRect();
    let numHSeg = dataSets.length !== 0 ? dataSets[0]._id.length - 1 : 1;
    let lnHSeg = (rcClient.right - rcClient.left) / numHSeg;
    let lnVSeg = (rcClient.bottom - rcClient.top) / (options.countVLabels - 1);
    // console.log(`lnSeg: ${lnSeg} w: ${w}`);

    let numMainVLine = 2;
    let numMainHLine = 2;
    const svgElm = useRef(null);
    const cut = (n) => Math.trunc(n) + 0.5; // trunc

    const _getOrthoPath = (x, y, size, numSeg, type) => {
        let d = `M${cut(x)} ${cut(y)}`;
        let pos = type === 'H' ? x : y;
        let lnSeg = size / numSeg;
        for (let i = 1; i <= numSeg; i++) {
            d += type + cut(pos + lnSeg * i);
        }
        return d;
    }

    const buildAxlePath = (rc, type) => {
        // const rc = clientRect();
        return _getOrthoPath(
            rc.left,
            type === 'H' ? rc.bottom : rc.top,
            type === 'H' ? (rc.right - rc.left) : (rc.bottom - rc.top),
            options.countVLabels - 1, type // numHSeg
        );
    }

    // data = [num1 , num2 , num3 , ...]
    const buildSvgAniPath = (rc, min, max, data) => {
        // const rc = clientRect();
        let val = 0;
        // let lnSeg = (rc.right - rc.left) / (data.length - 1);
        let res = { do: 'M', to: 'M' };

        for (let i = 0; i < data.length; i++) {
            val = data[i];
            val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
            res.do += `${cut(rc.left + lnHSeg * i)} ${cut(rc.bottom)}`;
            res.to += `${cut(rc.left + lnHSeg * i)} ${cut(rc.bottom - val)}`;

            if (i < data.length - 1) {
                res.do += 'L';
                res.to += 'L';
            }
        }
        return res;
    }

    const renderPathAxis = (rc, axis) => {
        const out = [];
        for (const key in axis) {
            const el = axis[key];
            out.push(
                <Axle d={buildAxlePath(rc, el.type)} cls={el.cls} />
            );
        }
        return out;
    }

    const renderVTextAxis = (rc, dataFieldText, arrDataSets) => {
        let arrStrs = arrDataSets.length !== 0 ? arrDataSets[0][dataFieldText] : [];
        arrStrs = arrStrs.map((el) => { // el = 2021-01-04T15:00:00.034Z
            // console.log(el);
            let data = new Date(el);
            const dataStr = ('0' + data.getHours()).slice(-2) + '/' + ('0' + data.getDate()).slice(-2) + '/' + ('0' + (data.getMonth() + 1)).slice(-2) + '/' + data.getFullYear() % 100;
            return dataStr;
        });
        return <TextGroup x={rc.left + (options.fontH / 2)} y={rc.bottom + (options.fontH / 2)} orient={'V'} offsX={lnHSeg} offsY={0} texts={arrStrs} />;
    }

    const renderHTextAxle = (x, y, axle) => {
        const arrStrs = [];
        let delta = (Math.abs(axle.min) + axle.max) / (options.countVLabels - 1);
        arrStrs.push(axle.max);
        for (let i = 1; i <= options.countVLabels - 2; i++) {
            arrStrs.push(axle.max - i * delta);
        }
        arrStrs.push(axle.min);
        return <TextGroup x={x} y={y} orient={'H'} offsX={0} offsY={lnVSeg} texts={arrStrs} clr={axle.clrPath} />;
    }

    const renderHTextAxis = (rc) => {
        const res = [];
        let cntAxis = Object.keys(axis).length;
        let dy = options.fontH;
        let startPos = rc.top - (cntAxis * dy / 2);
        for (const key in axis) {
            res.push(renderHTextAxle(rc.left - (options.fontH / 2), startPos += dy, axis[key]));
        }
        return res;
    }

    // const resize = () => {
    //     let { width, height } = svgElm.current.parentElement.getBoundingClientRect();
    //     setW(width);
    //     setH(height);

    //     // rcClient = {
    //     //     left: options.padding.left,
    //     //     top: options.padding.top,
    //     //     right: width - options.padding.right,
    //     //     bottom: height - options.padding.bottom
    //     // };
    //     rcClient.left = this.options.padding.left;
    //     rcClient.top = options.padding.top;
    //     rcClient.right = width - options.padding.right;
    //     rcClient.bottom = height - options.padding.bottom;


    //     console.log('rcClient', rcClient);
    // }

    function resize() {
        let { width, height } = svgElm.current.parentElement.getBoundingClientRect();
        setW(width);
        setH(height);
        // rcClient = _clientRect();

        // console.log('rcClient', rcClient);
    }

    // ===========================
    // input
    // { 
    //      _id: ['2021-11-05', ...], 
    //      t:   [21.2, ...],
    //      p:   [36.9 ...],
    //      h:   [12.5 ...]
    // }
    const renderDataSet = (arr) => {
        const out = [];
        let min = 0, max = 0, cls = 'axis', clrPath = '#000';
        for (const key in arr) {
            const el = arr[key]; // [21.2, ...]
            // const propName1 = key;
            // let {min = 0, max = 0};           

            if (axis[key]) {
                ({ min, max, cls, clrPath } = axis[key]);
                // min = axis[key].min;
                // max = axis[key].max;
                // cls = axis[key].cls;
                // clrPath = axis[key].clrPath;
            }
            // const min = (axis[key] && axis[key].min) || 0;
            // const max = (axis[key] && axis[key].max) || 0;
            // const cls = (axis[key] && axis[key].cls) || 'axis';
            const res = { ...buildSvgAniPath(rcClient, min, max, el) };
            out.push(
                <>
                    <animate id="ani_p" begin="0s;indefinite" xlinkHref={`#data_${key}`} attributeName="d" dur="0.5" fill="freeze" to={res.to} />
                    <path id={`data_${key}`} className={'path-data'} style={{ stroke: clrPath }} d={res.do}></path>
                </>
            );
        }
        return out;
    }

    useEffect(() => {
        resize();
        window.addEventListener('resize', (e) => {
            resize();
        });
    }, []); // componentDidMount()

    return (
        <svg id="graph" ref={svgElm} width={w} height={h}>
            {console.log('draw SvgChart')}

            {/* TODO: add marker by color data */}
            {/* TODO: маркер не изменяет размер при изм размера его используещего */}
            <defs>
                <marker id="mrkVHAxis" className="mrk" markerWidth="10" markerHeight="10" refX="5" refY="5"
                    orient="auto">
                    {/* <line x1="0" y1="0" x2="0" y2="6" /> */}
                    {/* <line x2="0" y2="6" /> */}
                    <circle cx="5" cy="5" r="5" />
                </marker>
            </defs>

            {
                dataSets.map((itm, idx) => {
                    return renderDataSet(itm);
                })
            }

            {renderPathAxis(rcClient, axis)}

            {
                renderVTextAxis(rcClient, '_id', dataSets)

            }

            {renderHTextAxis(rcClient)}






        </svg>


    );
}

export default SvgChart;