class Graph {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.axis = {};
        this.dataSets = {};
        this.markers = {};
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

    fillPath(pos, size, lnSeg, data) {
        // console.log('fillPath');
        let val = 0;
        const min = 0;
        const max = 50;

        let res = { d: 'M', to: 'M' };
        for (let i = 0; i < data.length; i++) {
            val = data[i]['t'];
            val = Math.round(((val - min) / (max - min)) * size.h);
            res.d += `${this.cut(pos.x + lnSeg * i)} ${this.cut(pos.y)}`;
            res.to += `${this.cut(pos.x + lnSeg * i)} ${this.cut(pos.y - val)}`;

            if (i < data.length - 1) {
                res.d += 'L';
                res.to += 'L';
            }
        }
        return res;
    }
    
    addMarker(id, w, h, refX, refY, cls) {        
        this.markers[id] = { w, h, refX, refY, cls };
    }

    addAxle(id, name, type, cls) {
        const rc = this.clientRect();
        let p;
        if (type === 'h') {
            p = this.getOrthoPath(rc.left, rc.bottom, rc.right-rc.left, 1, type);
        } else {
            p = this.getOrthoPath(rc.left, rc.top, rc.bottom-rc.top, 1, type);
        }
        this.axis[id] = { name, type, cls, d: p };
    }

    addDataSet(id, name, url, count, min, max){
        this.dataSets[id] = { name, url, count, min, max };
    }

    addAxleUnitMeasure(){

    }

}

export default new Graph(320, 320);