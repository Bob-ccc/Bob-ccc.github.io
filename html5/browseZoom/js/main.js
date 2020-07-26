document.body.onmousemove = function(e){
    let x = e.clientX-parseInt(window.getComputedStyle(this).width)/2;
    let y = e.clientY-parseInt(window.getComputedStyle(this).height)/2;
    let X = x/(parseInt(window.getComputedStyle(this).width)/2)*10;
    let Y = y/(parseInt(window.getComputedStyle(this).height)/2)*10;
    this.style.perspectiveOrigin = `${50+X}% ${50+Y}%`
    // console.log(e.clientX,e.clientY,window.getComputedStyle(this).width)
    // console.log(x,y,X,Y)
}
let z = 0
document.body.onwheel = function(e){
    let content = document.querySelector(".content")
    console.log(e.wheelDelta,z)
    e.wheelDelta>0?z+=30:z-=30
    content.style.transform = `translateZ(${z}px)`
}