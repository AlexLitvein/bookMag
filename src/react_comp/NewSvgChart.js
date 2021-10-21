import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import MyGraph from "../classes/ChartObject";
// import { getSensData } from "../rdcrs/weatherData/acts";
// import { selSensData } from "../rdcrs/weatherData/sels";
import { getSensData, selAniPaths, selStaticPaths, selText, setResizePaths, setText } from "../svgDataRdcrs/paths";
import { TextSvg, Axle } from "./Axis";
// import { Axis, Marker } from './Axis';

// набор данных: 
// [
//     [
//         { d: ['2021-11-05', ...], do: '', to: '' },
//         { t: [21.2, ...], do: '', to: '' },
//         { p: [36.9 ...], do: '', to: '' },
//         { h: [12.5 ...], do: '', to: '' },
//     ],
//      ...,
// ]
const SvgChart = ({ options, axis, dataSets }) => {
    const [w, setW] = useState(320);
    const [h, setH] = useState(320);
    const svgElm = useRef(null);
    const cut = (n) => Math.floor(n) + 0.5;

    const clientRect = () => {
        return {
            left: options.padding.left,
            top: options.padding.top,
            right: w - options.padding.right,
            bottom: h - options.padding.bottom
        };
    }

    const getOrthoPath = (x, y, size, numSeg, type) => {
        let d = `M${cut(x)} ${cut(y)}`;
        let lnSeg = cut(size / numSeg);
        for (let i = 0; i < numSeg; i++) {
            d += (type + lnSeg);
        }
        return d;
    }

    const resizeAxle = (type) => {
        const rc = clientRect();
        return getOrthoPath(rc.left, type === 'h' ? rc.bottom : rc.top, type === 'h' ? (rc.right - rc.left) : (rc.bottom - rc.top), 1, type);
    }


    const buildSvgAniPath = (min, max, data) => {
        const rc = clientRect();
        let val = 0;
        let lnSeg = (rc.right - rc.left) / data.length;
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
                <Axle d={resizeAxle(el.type)} cls={el.cls} />
            );

        }

        return out;
    }

    const resize = () => {
        let { width, height } = svgElm.current.parentElement.getBoundingClientRect();
        setW(width);
        setH(height);
    }

    const renderDataSet = (arr) => {
        return arr.map((itm, idx) => { // { t: [21.2, ...], do: '', to: '' },
            const propName1 = Object.keys(itm)[0];
            const res = { ...itm, ...buildSvgAniPath(axis[propName1].min, axis[propName1].max, itm[propName1]) };
            return (
                <>
                    <animate id="ani_p" begin="0s;indefinite" xlinkHref={`#data_${idx}`} attributeName="d" dur="0.5" fill="freeze" to={res.to} />
                    <path id={`data_${idx}`} class="path-data" d={res.do}></path>
                </>
            )
        });
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

            <defs>
                <marker id="mrkVHAxis" class="mrk" markerWidth="1" markerHeight="6" refX="0.5" refY="6"
                    orient="auto">
                    <line x1="0" y1="0" x2="0" y2="6" />
                </marker>
            </defs>

            {renderAxis(axis)}

            {
                dataSets.map((itm, idx) => {
                    return renderDataSet(itm);
                })
            }


        </svg>


    );
}

export default SvgChart;