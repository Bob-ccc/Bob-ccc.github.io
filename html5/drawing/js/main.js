let canvas = document.querySelector("canvas");
// 获取元素绘图上下文 api
let context = canvas.getContext("2d");
let color = "black";
let lineWidth = 3;
let canvasWidth = 1200;
let canvasHeight = 600;
// 保存历史记录
let canvasHistory = [];
let step = -1;
// 当前是画图状态
let drawing = true;

let utils = {
    // 清屏方法
    circle(x, y, r) {
        context.beginPath();

        context.arc(
            x,
            y,
            r,
            (Math.PI / 180) * 0,
            (Math.PI / 180) * 360
        );
        context.fill();
        context.closePath();
    },
    // 画线方法
    onMove(event) {
        let ecolor
        let elineWidth
        if(drawing){

        }else{
            ecolor = window.getComputedStyle(canvas).backgroundColor
            elineWidth = 10
        }
        context.lineTo(event.offsetX, event.offsetY);
        context.lineWidth = elineWidth||lineWidth;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.miterLimit = 1;
        context.strokeStyle = ecolor|| color;
        context.stroke();
    },

    // 绘制更新历史
    canvasDraw() {
        step++;
        if (step < canvasHistory.length) {
            canvasHistory.length = step; // 截断数组
        }
        // 执行绘制的相关操作（如绘制图片、线条等）
        canvasHistory.push(canvas.toDataURL());
        // 添加新的绘制到历史记录
    },
    // 撤销方法
    canvasUndo() {
        if (step >= 0) {
            step--;
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            let canvasPic = new Image();
            canvasPic.src = canvasHistory[step];
            canvasPic.addEventListener('load', () => {
                context.drawImage(canvasPic, 0, 0);
            });
        } else {
            console.log('不能再继续撤销了');
        }
    },
    // 反撤销方法
    canvasRedo() {
        if (step < canvasHistory.length - 1) {
            step++;
            let canvasPic = new Image();
            canvasPic.src = canvasHistory[step];
            canvasPic.addEventListener('load', () => {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(canvasPic, 0, 0);
            });
        } else {
            console.log('已经是最新的记录了');
        }
    }

}


canvas.addEventListener("mousedown", function (e) {
    utils.canvasDraw();
    context.beginPath();

    context.moveTo(e.offsetX, e.offsetY);
    canvas.addEventListener("mousemove", utils.onMove);
});
canvas.addEventListener("mouseup", function (e) {
    canvas.removeEventListener("mousemove", utils.onMove);
    context.closePath();
});

document.querySelector(".color").onchange = function () {
    color = this.value;
    console.log(color)
};

document.querySelector(".clear").onclick = function () {
    context.clearRect(0, 0, 1200, 600);
};

document.querySelector("input[type=range]").onchange = function () {
    lineWidth = this.value
}

document.querySelector(".pre").onclick = function(){
    utils.canvasUndo()
}

document.querySelector(".next").onclick = function(){
    utils.canvasRedo()
}


document.querySelector(".line").onclick = function(){
    drawing = true
}

document.querySelector(".eraser").onclick = function(){
    drawing = false
}
