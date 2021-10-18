import React, { useEffect } from 'react';
import './App.css';
import SvgChart from './react_comp/SvgChart';

// TODO: перенести статус загрузки в pathRdcr
function App() {
  useEffect(() => {
    document.getElementById('btnstart').addEventListener('click', (e) => {
      // document.getElementById('ani_p').beginElement();
      const els = document.getElementsByTagName('animate'); // 
      for (let i = 0; i < els.length; i++) {
        els[i].beginElement();
      }
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
        <SvgChart />
      </div>

    </div>
  );
}

export default App;
