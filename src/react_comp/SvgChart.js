import React, { useState, useEffect, useRef } from "react";
import { TextSvg, Axle } from "./SvgComps";

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

    // data = [num1 , num2 , num3 , ...]
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
        for (const key in arr) {
            const el = arr[key]; // [21.2, ...]
            const propName1 = key;
            const res = { ...buildSvgAniPath(axis[propName1].min, axis[propName1].max, el) };
            out.push(
                <>
                    <animate id="ani_p" begin="0s;indefinite" xlinkHref={`#data_${key}`} attributeName="d" dur="0.5" fill="freeze" to={res.to} />
                    <path id={`data_${key}`} className="path-data" d={res.do}></path>
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

            <defs>
                <marker id="mrkVHAxis" className="mrk" markerWidth="1" markerHeight="6" refX="0.5" refY="6"
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