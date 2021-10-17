import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import MyGraph from "../classes/Graph";
import { getSensData } from "../rdcrs/weatherData/acts";
import { selSensData } from "../rdcrs/weatherData/sels";
import { Axis, Marker } from './Axis';

const SvgViewPort = () => {
    const rc = MyGraph.clientRect();
    MyGraph.addAxle('x_axis', 'Дата', 'h', 'axis');
    MyGraph.addAxle('y_axis', 'Measure', 'v', 'axis');
    MyGraph.addMarker('mrkVHAxis', 1, 6, 0, 6, 'mrk');

    console.log(`create SvgViewPort ${rc.left} ${rc.bottom}`);

    const domElm = useRef(null);
    const getParentSize = () => {
        return domElm.current.parentElement.getBoundingClientRect();
    }



    const sd = useSelector(selSensData);
    console.log(sd);


    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    // const [strPath, setStrPath] = useState(MyGraph.fillPath({ x: 0, y: 70 }, { w: 200, h: 200 }, 50, sd[0]));

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('SvgViewPort useEffect');
        // setW(getParentSize().width);
        // setH(getParentSize().height);

        let { width, height } = getParentSize();
        setW(width);
        setH(height);
        MyGraph.resize(width, height);

        dispatch(getSensData(0, 0));
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
            {
                sd.map((itm, idx) => (
                    <>
                        {/* <animate id="ani_p" begin="0s;indefinite" xlinkHref="#data_p" attributeName="d" dur="0.5" fill="freeze" to={itm.to} />
                        <path id="data_p" class="path-data" d={itm.d}></path> */}

                        <animate id="ani_p" begin="0s;indefinite" xlinkHref={`#data_${idx}`} attributeName="d" dur="0.5" fill="freeze" to={itm.to} />
                        <path id={`data_${idx}`} class="path-data" d={itm.d}></path>
                    </>
                ))
            }

            <Marker id='mrkVHAxis' />
            <Axis id='x_axis' />
            <Axis id='y_axis' />

        </svg>


    );
}

export default SvgViewPort;