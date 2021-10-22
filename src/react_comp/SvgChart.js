import React, { useState, useEffect, useRef } from "react";
import { Axle } from "./SvgComps";
import { TextGroup } from "./SvgTextGroup";

const SvgChart = ({ options, axis, dataSets = [] }) => {
    const [w, setW] = useState(320);
    const [h, setH] = useState(320);
    let numSeg = dataSets.length !== 0 ? dataSets[0]._id.length - 1 : 1;
    const svgElm = useRef(null);
    const cut = (n) => Math.trunc(n) + 0.5; // trunc

    const clientRect = () => {
        return {
            left: options.padding.left,
            top: options.padding.top,
            right: w - options.padding.right,
            bottom: h - options.padding.bottom
        };
    }

    // const getOrthoPath = (x, y, size, numSeg, type) => {
    //     let d = `M${cut(x)} ${cut(y)}`;
    //     let lnSeg = cut(size / numSeg);
    //     for (let i = 0; i < numSeg; i++) {
    //         d += (type + lnSeg);
    //     }
    //     return d;
    // }

    const getOrthoPath = (x, y, size, numSeg, type) => {
        let d = `M${cut(x)} ${cut(y)}`;
        let pos = type === 'H' ? x : y;
        let lnSeg = size / numSeg;
        for (let i = 1; i <= numSeg; i++) {
            d += type + cut(pos + lnSeg * i);
        }
        return d;
    }

    const buildAxlePath = (type) => {
        const rc = clientRect();
        return getOrthoPath(
            rc.left,
            type === 'H' ? rc.bottom : rc.top,
            type === 'H' ? (rc.right - rc.left) : (rc.bottom - rc.top),
            numSeg, type
        );
    }

    // data = [num1 , num2 , num3 , ...]
    const buildSvgAniPath = (min, max, data) => {
        const rc = clientRect();
        let val = 0;
        let lnSeg = (rc.right - rc.left) / (data.length - 1);
        let res = { do: 'M', to: 'M' };

        for (let i = 0; i < data.length; i++) {
            val = data[i];
            val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
            res.do += `${cut(rc.left + lnSeg * i)} ${cut(rc.bottom)}`;
            res.to += `${cut(rc.left + lnSeg * i)} ${cut(rc.bottom - val)}`;

            if (i < data.length - 1) {
                res.do += 'L';
                res.to += 'L';
            }
        }
        return res;
    }

    const renderAxis = (axis) => {
        const out = [];
        for (const key in axis) {
            const el = axis[key];
            out.push(
                <Axle d={buildAxlePath(el.type)} cls={el.cls} />
            );
        }
        return out;
    }

    const renderTextAxis = (axis, arrDataSets) => {
        // console.log('renderTextAxis', arrDataSets);
        const rc = clientRect();
        const arrStrs = arrDataSets.length !== 0 ? arrDataSets[0]._id : [];
        return <TextGroup x={rc.left} y={rc.bottom} orient={'V'} offsX={30} offsY={0} texts={arrStrs} />;
    }

    const resize = () => {
        let { width, height } = svgElm.current.parentElement.getBoundingClientRect();
        setW(width);
        setH(height);
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
            const res = { ...buildSvgAniPath(min, max, el) };
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
            <defs>
                <marker id="mrkVHAxis" className="mrk" markerWidth="1" markerHeight="6" refX="0.5" refY="6"
                    orient="auto">
                    <line x1="0" y1="0" x2="0" y2="6" />
                </marker>
            </defs>

            {renderAxis(axis)}

            {
                renderTextAxis(0, dataSets)
            }

            {
                dataSets.map((itm, idx) => {
                    return renderDataSet(itm);
                })
            }




        </svg>


    );
}

export default SvgChart;