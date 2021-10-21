import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import MyGraph from "../classes/ChartObject";
// import { getSensData } from "../rdcrs/weatherData/acts";
// import { selSensData } from "../rdcrs/weatherData/sels";
import { getSensData, selAniPaths, selStaticPaths, selText, setResizePaths, setText } from "../svgDataRdcrs/paths";
import { TextSvg } from "./Axis";
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

    const renderDataSet = (arr) => {
        return arr.map((itm, idx) => (
            <>
                <animate id="ani_p" begin="0s;indefinite" xlinkHref={`#data_${idx}`} attributeName="d" dur="0.5" fill="freeze" to={itm.to} />
                <path id={`data_${idx}`} class="path-data" d={itm.do}></path>
            </>
        ));
    }

    const txt = useSelector(selText);
    const aniPaths = useSelector(selAniPaths);

    const axis = MyGraph.getAxis();

    useEffect(() => {
        console.log('Chart useEffect');
        // setTimeout(() => {
        //     dispatch(setText({ t2: 'newText2' }));
        // }, 2000);

        resize();
        dispatch(getSensData({ date: 0, count: 0, func: MyGraph.prepareSensData })); // after^^^

        window.addEventListener('resize', (e) => {
            resize();
            dispatch(setResizePaths());
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

            <path class="axis" d={axis.d.path}></path>
            <path class="axis" d={axis.t.path}></path>

            {
                aniPaths.map((itm, idx) => {
                    return renderDataSet(itm);
                })
            }

            {
                function () {
                    let arr = [];
                    let posy = 0;
                    for (const k in txt) {
                        // arr.push(<TextSvg key={k} text={txt[k]} y={posy += 20} />)
                        arr.push(<TextSvg key={k} opt={{ text: txt[k], y: posy += 20, msgFunc: (msg) => { console.log(msg) } }} />)
                    }
                    return arr;
                }()

            }

            {/* <TextSvg text={txt.t1} y={20} />
            <TextSvg text={txt.t2} y={40} /> */}
        </svg>


    );
}

export default SvgChart;