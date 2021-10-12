import React, { useState, useEffect } from "react";
import MyGraph from "../classes/Graph";

const HAxis = ({ x, y, w, h }) => {
    // console.log("create HAxis");
    //MyGraph
    // let d = "";
    console.log(`create HAxis ${x} ${y}`);
    // const build = (x, y, szSeg, nSeg) => {
    //     let d = `M${x} ${y + 0.5}`;
    //     for (let i = 0; i < nSeg; i++) {
    //         d += ('h' + szSeg);
    //     }
    //     return d;
    // }


    // const [d, setD] = useState(MyGraph.getOrthoPath(x, y, w, 5, 'h'));
    const [d, setD] = useState(undefined);

    useEffect(() => {
        setD(MyGraph.getOrthoPath(x, y, w, 5, 'h'));
        // d = MyGraph.getOrthoPath(x, y, w, 5, 'h');
    }); // componentDidUpdate()

    return (
        <>
            <defs>
                <marker id="mrkVHAxis" class="mrk" markerWidth="1" markerHeight={h} refX="0" refY={h}
                    orient="auto">
                    <line x1="0" y1="0" x2="0" y2={h} />
                </marker>
            </defs>
            <path id="x_axis" d={d} class="axis" ></path>
        </>
    );
}

const Path = ({ id, cls }) => {
    console.log("create Path");
    const [d, setD] = useState("");
    return (
        <path id={id} d={d} class={cls} ></path>
    );
}

export { HAxis, Path };
