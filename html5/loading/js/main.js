var canvas1 = document.querySelector(".canvas1")
var context1 = canvas1.getContext('2d');

function crice(obj,x) {
    obj.beginPath();
    obj.arc(x, 100, 6, Math.PI / 180 * 0, Math.PI / 180 * 360);
    obj.fillStyle = 'rgba(255,255,255,.9)';
    obj.fill();
    obj.closePath();
}
function pacman(obj,x1,x2) {
    obj.beginPath();
    obj.moveTo(60,100);
    obj.arc(60, 100, 30, Math.PI / 180 * -x1, Math.PI / 180 * x2,true);
    obj.fillStyle = 'white';
    obj.fill();
    obj.closePath();
}
var x = 60
var n = 0;
var d = 0;
var u = 0;
var open = true;
setInterval(function () {
    
    context1.clearRect(0, 0, 200, 200);
    if(n<40){
        n++
    }else{
        n=1
    }
    
    if(open){
        if(d<=45){
            d++
        }else{
            open=false
        }
    }else{
        if(d>5){
            d-=5
        }else{
            open=true
        }
    }
    if(d==0){
        u=360
    }else{
        u=d
    }
    pacman(context1,d,u)
    // crice(x-10)
    crice(context1,x+30-n)
    crice(context1,x+70-n)
    crice(context1,x+110-n)

    
}, 10);
    // pacman(60)
    // crice(170)
    // crice(130)
    // crice(90)
    // crice(50)

var canvas2 = document.querySelector(".canvas2")
var context2 = canvas2.getContext('2d');
function semiCircle(obj,x){
    obj.beginPath();
    obj.arc(100, 100, 20, Math.PI / 180 * (x-110), Math.PI / 180 * x);
    obj.fillStyle = 'white';
    obj.fill();
    obj.closePath();
}
var context2d = 0
setInterval(function(){
    context2.clearRect(0, 0, 200, 200);
    context2d+=5
    semiCircle(context2,context2d)
}, 20);

var canvas3 = document.querySelector(".canvas3")
var context3 = canvas3.getContext('2d');

function ballScale(obj,x){
    obj.beginPath();
    obj.arc(100, 100, x, Math.PI / 180 * 0, Math.PI / 180 * 360);
    obj.strokeStyle='white';
    obj.stroke();
    obj.closePath();
}
var context3d=5;
setInterval(function(){
    context3.clearRect(0, 0, 200, 200);
    if(context3d<30){
        context3d++
    }else{
        context3d=5
    }
    ballScale(context3,context3d)
}, 40);