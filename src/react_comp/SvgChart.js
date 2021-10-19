import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import MyGraph from "../classes/ChartObject";
// import { getSensData } from "../rdcrs/weatherData/acts";
// import { selSensData } from "../rdcrs/weatherData/sels";
import { getSensData, selAniPaths, selStaticPaths } from "../svgDataRdcrs/paths";
// import { Axis, Marker } from './Axis';

const SvgChart = () => {
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const svgElm = useRef(null);
    const dispatch = useDispatch();

    const getParentSize = () => {
        return svgElm.current.parentElement.getBoundingClientRect();
    }

    const resize = () => {
        let { width, height } = getParentSize();
        setW(width);
        setH(height);
        MyGraph.resize(width, height);


    }

    const aniPaths = useSelector(selAniPaths);

    useEffect(() => {
        console.log('Chart useEffect');

        resize();
        dispatch(getSensData({ date: 0, count: 0, func: MyGraph.prepareSensData })); // after^^^

        window.addEventListener('resize', (e) => {
            resize();
        });
    }, []); // componentDidMount()

    return (
        <svg id="graph" ref={svgElm} width={w} height={h}>
            {console.log('draw SvgChart')}

            {
                aniPaths.map((itm, idx) => (
                    <>
                        {/* <animate id="ani_p" begin="0s;indefinite" xlinkHref="#data_p" attributeName="d" dur="0.5" fill="freeze" to={itm.to} />
                        <path id="data_p" class="path-data" d={itm.d}></path> */}

                        <animate id="ani_p" begin="0s;indefinite" xlinkHref={`#data_${idx}`} attributeName="d" dur="0.5" fill="freeze" to={itm.to} />
                        <path id={`data_${idx}`} class="path-data" d={itm.d}></path>
                    </>
                ))
            }


        </svg>


    );
}

export default SvgChart;