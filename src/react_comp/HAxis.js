import React, { useState, useEffect} from "react";

const HAxis = ({ x, y, w, h }) => {
    console.log("create HAxis");

    const build = (x, y, szSeg, nSeg) => {
        let d = `M${x} ${y + 0.5}`;
        for (let i = 0; i < nSeg; i++) {
            d += ('h' + szSeg);
        }
        return d;
    }


    const [d, setD] = useState(build(x, y, w, 5));

    // useEffect(() => {
    //     build(x,y,w,5);
    // }, []); // componentDidMount()

    return (
        <>
            <defs>
                <marker id="mrkVHAxis" class="mrk" markerWidth="1" markerHeight={h} refX="0.5" refY={h}
                    orient="auto">
                    <line x1="0" y1="0" x2="0" y2={h} />
                </marker>
            </defs>
            <path id="x_axis" d={d} class="axis" ></path>
        </>
    );
}

export default HAxis;
