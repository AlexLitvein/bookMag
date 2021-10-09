import React from "react";

const SvgViewPort = () => {
    return (
        <div className="wrpSvg">
            <svg xmlns="http://www.w3.org/2000/svg" id="graph" width="720" height="720">
                <animate id="ani_p" begin="0s;indefinite" xlinkHref="#data_p" attributeName="d" dur="0.5" fill="freeze" to="M0 90L30 80L50 95L70 60" />
                <path id="data_p" class="path-data" d="M0 90L10 30L50 85L70 40"></path>




            </svg>
        </div>


    );
}

export default SvgViewPort;