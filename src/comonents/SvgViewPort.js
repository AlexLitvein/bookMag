import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selSensData } from "../rdcrs/weatherData/sels";
import HAxis from './HAxis';

const SvgViewPort = () => {
    console.log("create SvgViewPort");
    // let strPath = "";
    // let d, to;
    const domElm = useRef(null);
    const getParentSize = () => {
        return domElm.current.parentElement.getBoundingClientRect();
    }

    const fillPath = (pos, size, lnSeg, data) => {
        console.log('fillPath');
        let val = 0;
        const min = 0;
        const max = 50;
        const padding = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };

        // const size = this.axle.graph.clientSize(); // !!!!
        // let rc = this.axle.size();
        let res = { d: 'M', to: 'M' };
        for (let i = 0; i < data.length; i++) {
            val = data[i]['t'];
            val = Math.round(((val - min) / (max - min)) * size.h);
            res.d += `${pos.x + 0.5 + lnSeg * i} ${pos.y + 0.5}`;
            res.to += `${pos.x + 0.5 + lnSeg * i} ${(pos.y + 0.5) - val}`;

            if (i < data.length - 1) {
                res.d += 'L';
                res.to += 'L';
            }
        }
        return res;
    }

    const sd = useSelector(selSensData);


    const [w, setW] = useState(0);
    const [h, setH] = useState(720);
    const [strPath, setStrPath] = useState(fillPath({ x: 0, y: 70 }, { w: 200, h: 200 }, 50, sd[0]));

    useEffect(() => {
        setW(getParentSize().width);
        setH(getParentSize().height);

        // strPath = fillPath({ x: 0, y: 70 }, { w: 200, h: 200 }, 20, sd[0]);
        // ({ d, to } = strPath);

        // console.log(d);
        // console.log(to);

        window.addEventListener('resize', (e) => {
            setW(getParentSize().width);
            setH(getParentSize().height);
        });
    }, []); // componentDidMount()

    return (
        <svg id="graph" ref={domElm} width={w} height={h}>
            <animate id="ani_p" begin="0s;indefinite" xlinkHref="#data_p" attributeName="d" dur="0.5" fill="freeze" to={strPath.to} />
            <path id="data_p" class="path-data" d={strPath.d}></path>


             <HAxis x={21} y={21} w={200} h={6} />

        </svg>


    );
}

export default SvgViewPort;