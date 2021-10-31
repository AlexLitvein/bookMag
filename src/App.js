import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import SvgChart from './react_comp/SvgChart';
import { getSensData, selDataSets } from './dataRdcrs/paths';

const axis = {
  _id: { name: 'Дата', min: 0, max: 0, type: 'H', cls: 'axis', clrPath: '#000ff00' },
  t: { name: 'Температура', min: -50, max: 50, type: 'V', cls: 'axis', clrPath: '#FF0000' },
  p: { name: 'Давление', min: 0, max: 1000, type: 'V', cls: 'axis', clrPath: '#4F4FD9' },
  h: { name: 'Влажность', min: 0, max: 100, type: 'V', cls: 'axis', clrPath: '#FFFA40' },
};

// const marker

const options = {
  padding: { top: 15, right: 10, bottom: 60, left: 30 },
  // fontH: 10, //?
  countVLabels: 3,
  axisTxtOffs: 8,
  // fontBBoxHeight: 0,
  // biggestDataStrBBoxWidth: 0,  
  // svgElm: null,
  // rcClient: null,
  // numHSeg: 0,
  // lnHSeg: 0,
  // lnVSeg: 0,
};

// TODO: перенести статус загрузки в pathRdcr
function App() {
  const dispatch = useDispatch();
  const dataSets = useSelector(selDataSets);


  // NOTE! входные данные массив объектов, например: 
  // [
  //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
  //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
  //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
  // ]
  // функция возвращает объект со свойствами массивами
  // { 
  //      _id: ['2021-11-05', ...], 
  //      t: [21.2, ...],
  //      p: [36.9 ...],
  //      h: [12.5 ...]
  // }
  const convertArrObjectsToObjectPropertyArrays = (arrObjects) => {
    const out = {};
    if (arrObjects.length !== 0) {
      let o = arrObjects[0];
      for (const key in o) {
        out[key] = [];
      }

      arrObjects.forEach(el => {
        for (const key in el) {
          out[key].push(el[key]);
        }
      });
    }
    return out;
  }

  useEffect(() => {
    dispatch(getSensData({ date: 0, count: 0, func: convertArrObjectsToObjectPropertyArrays }));

    document.getElementById('btnstart').addEventListener('click', (e) => {
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
        <SvgChart options={options} axis={axis} dataSets={dataSets} />
      </div>

    </div>
  );
}

export default App;
