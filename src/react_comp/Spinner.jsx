import React, { useState, useEffect } from 'react'

const Spinner = ({status, bgnAniId, endAniId, options}) => {
    return (
        <g transform="translate(100,100)">
            <rect x="-10" y="-10" width="20" height="20" stroke="black" fill="none" className="spinner">
                <animateTransform id="spin" attributeName="transform" attributeType="XML" type="rotate" from="0" to="360" begin={`${bgnAniId}.begin`} dur="3s" repeatDur="indefinite" 
                end={`${bgnAniId}.begin`} 
                fill="freeze" />                
            </rect>
            <text>{status}</text>
            <animate attributeName="opacity" attributeType="CSS" from="0" to="1" begin={`${bgnAniId}.begin`} dur="300ms" fill="freeze"/>
            <animate attributeName="opacity" attributeType="CSS" from="1" to="0" dur="300ms" begin={`${endAniId}.begin`}  fill="freeze"/>
        </g>
    );
}

export default Spinner;