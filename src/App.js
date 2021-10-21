import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MyGraph from './classes/ChartObject';
import SvgChart from './react_comp/NewSvgChart';
import { getSensData, selAniPaths } from './svgDataRdcrs/paths';

const axis = {
  d: { name: 'Дата', min: 0, max: 0, type: 'h', cls: 'axis' },
  t: { name: 'Temperature', min: -50, max: 50, type: 'v', cls: 'axis' },
  p: { name: 'Давление', min: 0, max: 1000, type: 'v', cls: 'axis' },
  h: { name: 'Влажность', min: 0, max: 100, type: 'v', cls: 'axis' },
};

const options = {
  padding: { top: 15, right: 10, bottom: 60, left: 34 },
};

// TODO: перенести статус загрузки в pathRdcr
function App() {
  const dispatch = useDispatch();

  const aniPaths = useSelector(selAniPaths);

  useEffect(() => {

    dispatch(getSensData({ date: 0, count: 0, func: MyGraph.prepareSensData }));



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
        <SvgChart options={options} axis={axis} dataSets={aniPaths} />
      </div>

    </div>
  );
}

export default App;
