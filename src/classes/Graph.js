class Graph {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.axis = [];
        this.dataSets = [];
        this.markers = [];
        // this.style; // ?
        this.padding = { top: 15, right: 10, bottom: 60, left: 34 };

        this.cut = function (n) {
            return Math.floor(n) + 0.5;
        }
    }

    width() { return this.w; }
    height() { return this.h; }

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
        let lnSeg = size / numSeg;
        lnSeg = type === 'h' ? lnSeg : -lnSeg;
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

        // const size = this.axle.graph.clientSize(); // !!!!
        // let rc = this.axle.size();
        let res = { d: 'M', to: 'M' };
        for (let i = 0; i < data.length; i++) {
            val = data[i]['t'];
            val = Math.round(((val - min) / (max - min)) * size.h);
            // res.d += `${pos.x + 0.5 + lnSeg * i} ${pos.y + 0.5}`;
            // res.to += `${pos.x + 0.5 + lnSeg * i} ${(pos.y + 0.5) - val}`;
            res.d += `${this.cut(pos.x + lnSeg * i)} ${this.cut(pos.y)}`;
            res.to += `${this.cut(pos.x + lnSeg * i)} ${this.cut(pos.y - val)}`;

            if (i < data.length - 1) {
                res.d += 'L';
                res.to += 'L';
            }
        }
        return res;
    }

    // origin = () => {
    //     return {
    //         x: this.padding.left,
    //         y: this.height - this.padding.bottom
    //     };
    // }

    // clientSize = () => {
    //     return {
    //         w: this.width - this.padding.left - this.padding.right,
    //         h: this.height - this.padding.bottom - this.padding.top
    //     };
    // }



    //addAxis(axle) {
    // const axis = new MyGraphAxis(id, type, this);
    // axle.graph = this;
    // axle.resize(); // after^^^
    // this.axis.push(axle);
    // if (axle.type === 'h') {
    //     this.axisX = axle;
    // }
    // if (axle.type === 'v') {
    //     this.axisY = axle;
    // }
    //}

    // addGraphData(graphData) {
    //     // const gd = new GraphData(id, idAnim, begin, this);
    //     graphData.graph = this;
    //     this.graphsData.push(graphData);
    //     // return gd;
    //     // this.axisX.resize(graphData.dataCount());
    // }


    // localToSVG(pos) {
    //     return { x: this.origin.x + pos.x, y: this.origin.y - pos.y }
    // }

    // _resize(w, h) {
    //     let rc = this.el.parentElement.getBoundingClientRect();
    //     this.width = w || rc.width;
    //     this.height = h || rc.height;
    //     this.setAttributes({ "width": this.width, "height": this.height });
    // }


}

// export class Graph {
//     constructor(w, h) {
//         this.width = w;
//         this.height = h;
//         this.axis = [];
//         this.dataSets = [];
//         this.markers = [];
//         this.style; // ?
//         this.padding = { top: 15, right: 10, bottom: 60, left: 34 };
//     }

//     clientRect = () => {
//         return {
//             x: this.padding.left,
//             y: this.height - this.padding.bottom,
//             w: this.width - this.padding.left - this.padding.right,
//             h: this.height - this.padding.bottom - this.padding.top
//         };
//     }



// }

// export let MyGraph = new Graph(320, 320);
export default new Graph(320, 320);