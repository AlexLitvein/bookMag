// import { useDispatch } from "react-redux";


class ChartObject {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.axis = {};
        // this.dataSets = {};
        // this.markers = {};
        // this.style; // ?
        this.padding = { top: 15, right: 10, bottom: 60, left: 34 };
        //this.scaleX=100;

        this.cut = function (n) {
            return Math.floor(n) + 0.5;
        }

        this._resizeAxle = function (type) {
            const rc = this.clientRect();
            return this.getOrthoPath(rc.left, type === 'h' ? rc.bottom : rc.top, type === 'h' ? (rc.right - rc.left) : (rc.bottom - rc.top), 1, type);
        }

        this.addAxle('d', 'Дата', 0, 0, 'h', 'path-data');
        this.addAxle('t', 'Temperature', -50, 50, 'v', 'path-data');
        this.addAxle('p', 'Давление', 0, 1000, 'v', 'path-data');
        this.addAxle('h', 'Влажность', 0, 100, 'v', 'path-data');

    }

    getAxis() { return this.axis; }
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
        console.log('resize', { w, h });
        this.w = w;
        this.h = h;
        this.resizeAxis();
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
        let res = { do: 'M', to: 'M' };

        for (let i = 0; i < data.length; i++) {
            val = data[i];
            val = Math.round(((val - min) / (max - min)) * (rc.bottom - rc.top));
            res.do += `${this.cut(rc.left + lnSeg * i)} ${this.cut(rc.bottom)}`;
            res.to += `${this.cut(rc.left + lnSeg * i)} ${this.cut(rc.bottom - val)}`;

            if (i < data.length - 1) {
                res.do += 'L';
                res.to += 'L';
            }
        }
        // res.d[res.d.length - 1] = '';
        // res.to[res.to.length - 1] = '';
        // res.name = name;
        // res.cls = cls;

        return res;
    }


    // =============================================
    // входные данные массив объектов, например: 
    // [
    //      { _id: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
    //      { _id: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
    //      { _id: '2021-11-05', t: 21.2, p: 36.9, h: 12.5 },
    // ]
    // то
    // функция возвращает объект со свойствами массивами
    // { 
    //      d: ['2021-11-05', ...], 
    //      t: [21.2, ...],
    //      p: [36.9 ...],
    //      h: [12.5 ...]
    // }
    convertArrObjectsToArrProperties(arrObjects) {
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

    // =============================================
    // return
    // out = [
    //         { d: ['2021-11-05', ...], },
    //         { t: [21.2, ...], },
    //         { p: [36.9 ...], },
    //         { h: [12.5 ...], },
    //     ],
    // ]
    // convertArrObjectsToArrProperties(arrObjects) {
    //     const out = [];
    //     const tmp = {};
    //     if (arrObjects.length !== 0) {
    //         let o = arrObjects[0];
    //         for (const key in o) {
    //             tmp[key] = [];
    //         }
    //         // after^^^
    //         // tmp = { d: [],  t: [],  p: [], h: [], }

    //         arrObjects.forEach(el => {
    //             for (const key in el) {
    //                 tmp[key].push(el[key]);
    //             }
    //         });
    //         // after^^^
    //         // tmp = {
    //         //         d: ['2021-11-05', ...],
    //         //         t: [21.2, ...],
    //         //         p: [36.9 ...],
    //         //         h: [12.5 ...],
    //         //     },

    //         for (const k in tmp) {
    //             out.push({ [k]: tmp[k] });
    //         }
    //     }
    //     return out;


    // prepareSensData = (data) => {
    //     console.log('prepareSensData', data);

    //     const out = this.convertArrObjectsToArrProperties(data);
    //     out[0] = { pathD: '', pathTo: '' };
    //     out[1] = { ...this.buildSvgAniPath(-50, 50, out[1].t) };
    //     out[2] = { ...this.buildSvgAniPath(0, 1000, out[2].p) };
    //     out[3] = { ...this.buildSvgAniPath(0, 100, out[3].h) };
    //     return out;
    // }

    // =============================================
    // return
    //     {
    //         d: { rawData: ['2021-11-05', ...], pathD: '', pathTo: '' },
    //         t: { rawData: [21.2, ...], pathD: '', pathTo: '' },
    //         p: { rawData: [36.9 ...], pathD: '', pathTo: '' },
    //         h: { rawData: [12.5 ...], pathD: '', pathTo: '' },
    //     }

    // =============================================
    // return
    //     [
    //         { d: ['2021-11-05', ...], pathD: '', pathTo: '' },
    //         { t: [21.2, ...], pathD: '', pathTo: '' },
    //         { p: [36.9 ...], pathD: '', pathTo: '' },
    //         { h: [12.5 ...], pathD: '', pathTo: '' },
    //     ],
    prepareSensData = (data) => {
        // console.log('prepareSensData', data);
        const out = [];
        const obj = this.convertArrObjectsToArrProperties(data);
        out.push({ d: obj._id, do: '', to: '' });
        out.push({ t: obj.t, ...this.buildSvgAniPath(-50, 50, obj.t) });
        out.push({ p: obj.p, ...this.buildSvgAniPath(0, 1000, obj.p) });
        out.push({ h: obj.h, ...this.buildSvgAniPath(0, 100, obj.h) });

        return out;
    }

    // resizePaths = (arr) => {
    //     arr.forEach((el => {
    //         el = { ...this.buildSvgAniPath(-50, 50, el.t) }
    //     }));

    // }

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

    addAxle(id, name, min, max, type, cls) {
        this.axis[id] = {
            name, min, max, type, cls,
            path: this._resizeAxle(type) // , nSeg?
        };
    }

    resizeAxis() {
        for (const key in this.axis) {
            const el = this.axis[key];
            el.path = this._resizeAxle(el.type);
        }
    }

    resizePaths = (paths) => {
        // console.log('paths', paths);
        return paths.map((el) => {
            return this.resizePath(el);
        });
    }

    resizePath = (path) => {
        // console.log('path', path);
        const propName1 = Object.keys(path)[0];
        // console.log('propName1', propName1);
        const res = { ...path, ...this.buildSvgAniPath(this.axis[propName1].min, this.axis[propName1].max, path[propName1]) };

        // console.log('resizePath', res);
        return res;
    }

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