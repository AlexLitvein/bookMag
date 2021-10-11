export class Graph {
    constructor(w, h) {        
        this.width = w;
        this.height = h;
        // this.axis = [];
        this.padding = { top: 15, right: 10, bottom: 60, left: 34 };
    }

    origin = () => {
        return {
            x: this.padding.left,
            y: this.height - this.padding.bottom
        };
    }

    clientSize = () => {
        return {
            w: this.width - this.padding.left - this.padding.right,
            h: this.height - this.padding.bottom - this.padding.top
        };
    }


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

    // resize(w, h) {
    //     this._resize(w, h)
    //     // this.axisX.resize();
    //     // this.axisY.resize();
    //     this.axis.forEach((el) => {
    //         el.resize();
    //     });
    //     // this.graphsData.forEach((el) => {
    //     //     el.resize();
    //     // });
    // }
}