// import { useDispatch } from "react-redux";


class ChartObject {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        // this.axis = {};
        // this.dataSets = {};
        // this.markers = {};
        // this.style; // ?
        this.padding = { top: 15, right: 10, bottom: 60, left: 34 };
        //this.scaleX=100;

        this.cut = function (n) {
            return Math.floor(n) + 0.5;
        }
    }

    // width() { return this.w; }
    // height() { return this.h; }

    clientRect() {
        return {
            left: this.padding.left,
            top: this.padding.top,
            right: this.w - this.padding.right,
            bottom: this.h - this.padding.bottom
        };
    }

    clientSize() {
        return {
            w: this.w - this.padding.left - this.padding.right,
            h: this.h - this.padding.top - this.padding.bottom
        };
    }

    clientWidth() {
        return this.w - this.padding.left - this.padding.right;
    }

    clientHeight() {
        return this.h - this.padding.top - this.padding.bottom;
    }

    resize(w, h) {
        this.w = w;
        this.h = h;
    }

    getOrthoPath(x, y, size, numSeg, type) {
        let d = `M${this.cut(x)} ${this.cut(y)}`;
        let lnSeg = this.cut(size / numSeg);
        // lnSeg = type === 'h' ? lnSeg : -lnSeg;
        for (let i = 0; i < numSeg; i++) {
            d += (type + lnSeg);
        }
        return d;
    }

    // data = [num1 , num2 , num3 , ...]
    buildSvgAniPath(min, max, data) {
        // console.log('buildPathObj', data);
        // const { w, h } = this.clientSize();
        const rc = this.clientRect();
        let val = 0;
        let lnSeg = (rc.right - rc.left) / data.length;
        let res = { d: 'M', to: 'M' };

        for (let i = 0; i < data.length; i++) {
            val = data[i];
            val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
            res.d += `${this.cut(rc.left + lnSeg * i)} ${this.cut(rc.bottom)}`;
            res.to += `${this.cut(rc.left + lnSeg * i)} ${this.cut(rc.bottom - val)}`;

            if (i < data.length - 1) {
                res.d += 'L';
                res.to += 'L';
            }
        }
        // res.d[res.d.length - 1] = '';
        // res.to[res.to.length - 1] = '';
        // res.name = name;
        // res.cls = cls;

        return res;
    }



    // входные данные массив объектов, например: 
    // [
    //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
    //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
    //      { d: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
    // ]
    // то
    // функция возвращает объект со свойствами массивами
    // { 
    //      d: ['2021-11-05', ...], 
    //      t: [21.2, ...],
    //      p: [36.9 ...],
    //      h: [12.5 ...]
    // }
    // convertArrObjectsToArrProperties(arrObjects) {
    //     const out = {};
    //     if (arrObjects.length !== 0) {
    //         let o = arrObjects[0];
    //         for (const key in o) {
    //             out[key] = [];
    //         }

    //         arrObjects.forEach(el => {
    //             for (const key in el) {
    //                 out[key].push(el[key]);
    //             }
    //         });
    //     }
    //     return out;
    // }

    // =============================================
    // return
    //     {
    //         d: { rawData: ['2021-11-05', ...] },
    //         t: { rawData: [21.2, ...] },
    //         p: { rawData: [36.9 ...] },
    //         h: { rawData: [12.5 ...] },
    //     },
    convertArrObjectsToArrProperties(arrObjects) {
        const out = {};
        if (arrObjects.length !== 0) {
            let o = arrObjects[0];
            for (const key in o) {
                out[key] = { rawData: [] };
            }

            arrObjects.forEach(el => {
                for (const key in el) {
                    out[key].rawData.push(el[key]);
                }
            });
        }
        return out;
    }
    
    // =============================================
    // return
    //     {
    //         d: { rawData: ['2021-11-05', ...], pathD: '', pathTo: '' },
    //         t: { rawData: [21.2, ...], pathD: '', pathTo: '' },
    //         p: { rawData: [36.9 ...], pathD: '', pathTo: '' },
    //         h: { rawData: [12.5 ...], pathD: '', pathTo: '' },
    //     }
    prepareSensData = (data) => {
        console.log('prepareSensData', data);

        const out = this.convertArrObjectsToArrProperties(data);
        out.t = { ...this.buildSvgAniPath(-50, 50, out.t.rawData) };
        out.p = { ...this.buildSvgAniPath(0, 1000, out.p.rawData) };
        out.h = { ...this.buildSvgAniPath(0, 100, out.h.rawData) };
        return out;
    }

    // prepareSensData = (data) => {
    //     console.log('prepareSensData', data);

    //     const out = [];
    //     const d1 = this.convertArrObjectsToArrProperties(data);
    //     out.push(this.buildSvgAniPath(-50, 50, d1.t));
    //     out.push(this.buildSvgAniPath(0, 1000, d1.p));
    //     out.push(this.buildSvgAniPath(0, 100, d1.h));
    //     return out;
    // }

    // buildPath(pos, size, lnSeg, data) {
    //     // console.log('fillPath');

    //     let val = 0;
    //     const min = 0;
    //     const max = 50;

    //     let res = { d: 'M', to: 'M' };
    //     for (let i = 0; i < data.length; i++) {
    //         val = data[i]['t'];
    //         val = Math.round(((val - min) / (max - min)) * size.h);
    //         res.d += `${this.cut(pos.x + lnSeg * i)} ${this.cut(pos.y)}`;
    //         res.to += `${this.cut(pos.x + lnSeg * i)} ${this.cut(pos.y - val)}`;

    //         if (i < data.length - 1) {
    //             res.d += 'L';
    //             res.to += 'L';
    //         }
    //     }
    //     return res;
    // }

    // addMarker(id, w, h, refX, refY, cls) {
    //     this.markers[id] = { w, h, refX, refY, cls };
    // }

    // addAxle(id, name, type, cls) {
    //     const rc = this.clientRect();
    //     let p;
    //     if (type === 'h') {
    //         p = this.getOrthoPath(rc.left, rc.bottom, rc.right - rc.left, 1, type);
    //     } else {
    //         p = this.getOrthoPath(rc.left, rc.top, rc.bottom - rc.top, 1, type);
    //     }
    //     this.axis[id] = { name, type, cls, d: p };
    // }

    // addDataSet(id, name, url, count, min, max) {
    //     this.dataSets[id] = { name, url, count, min, max };
    // }

    addAxleUnitMeasure() {
    }

    fetchSensData() {
        // const dispatch = useDispatch();
        // dispatch(delChat(id));
    }





}

export default new ChartObject(320, 320);