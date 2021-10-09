import React, { useState, useEffect, useRef } from "react";

const SvgViewPort = () => {
    console.log("create");
    const domElm = useRef(null);
    const getParentSize = () => {
        return domElm.current.parentElement.getBoundingClientRect();
    }
    const [w, setW] = useState(0);
    const [h, setH] = useState(720);


    useEffect(() => {
        setW(getParentSize().width);
        setH(getParentSize().height);

        window.addEventListener('resize', (e) => {
            setW(getParentSize().width);
            setH(getParentSize().height);
        });
    }, []); // componentDidMount()

    return (
        <svg id="graph" ref={domElm} width={w} height={h}>
            <animate id="ani_p" begin="0s;indefinite" xlinkHref="#data_p" attributeName="d" dur="0.5" fill="freeze" to="M0 90L30 80L50 95L70 60" />
            <path id="data_p" class="path-data" d="M0 90L10 30L50 85L70 40"></path>




        </svg>


    );
}

export default SvgViewPort;