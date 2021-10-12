import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import MyGraph from "../classes/Graph";
import { selSensData } from "../rdcrs/weatherData/sels";
import { HAxis } from './HAxis';

const SvgViewPort = () => {
    const rc = MyGraph.clientRect();
    console.log(`create SvgViewPort ${rc.left} ${rc.bottom}`);

    const domElm = useRef(null);
    const getParentSize = () => {
        return domElm.current.parentElement.getBoundingClientRect();
    }



    const sd = useSelector(selSensData);


    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const [strPath, setStrPath] = useState(MyGraph.fillPath({ x: 0, y: 70 }, { w: 200, h: 200 }, 50, sd[0]));

    useEffect(() => {
        // setW(getParentSize().width);
        // setH(getParentSize().height);

        let { width, height } = getParentSize();
        setW(width);
        setH(height);
        MyGraph.resize(width, height);
        //strPath = fillPath({ x: 0, y: 70 }, { w: 200, h: 200 }, 20, sd[0]);
        // ({ d, to } = strPath);

        // console.log(d);
        // console.log(to);

        window.addEventListener('resize', (e) => {
            let { width, height } = getParentSize();
            setW(width);
            setH(height);
            MyGraph.resize(width, height);
        });
    }, []); // componentDidMount()

    return (
        <svg id="graph" ref={domElm} width={w} height={h}>
            <animate id="ani_p" begin="0s;indefinite" xlinkHref="#data_p" attributeName="d" dur="0.5" fill="freeze" to={strPath.to} />
            <path id="data_p" class="path-data" d={strPath.d}></path>


            <HAxis x={rc.left} y={rc.bottom} w={200} h={6} />

        </svg>


    );
}

export default SvgViewPort;