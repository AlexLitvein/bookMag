import React, { useRef, useCallback, useEffect } from 'react';
import SvgViewPort from './react_comp/SvgViewPort';
import './App.css';


function App() {
  useEffect(() => {
    document.getElementById('btnstart').addEventListener('click', (e) => {
      document.getElementById('ani_p').beginElement();
    });

  }, []); // componentDidMount()

  return (

    <div className="App">
      <div id="controls">
        <button id="btnstart" type="button">Start</button>
        <button id="btn_inc" type="button">+H</button>
        <button id="btn_dec" type="button">-H</button>
      </div>
      <div className="wrpSvg">
        <SvgViewPort >



        </SvgViewPort>
      </div>

    </div>
  );
}

export default App;
