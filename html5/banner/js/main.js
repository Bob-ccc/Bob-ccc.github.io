function change() {
    let liLen = $(".content ul>li").length;
    let liWidth = $(".content ul>li").width();
    let centerLiLen = parseInt(liLen / 2)
    if (liLen % 2 == 0) {
        $(".content ul>li").each(function (index, element) {
            // console.log(index)
            if (index < centerLiLen) {
                console.log("左")
                $(element).css({
                    transform: `translateZ(${-(centerLiLen - index) * liWidth}px) translateX(${(centerLiLen - index) * liWidth / 2}px)`,
                    opacity: 0.6
                })
            } else if (index == centerLiLen) {
                $(element).css({
                    transform: `translateZ(0px) translateX(${-liWidth / 48}px)`,
                    opacity: 1
                })
                console.log("中")
            } else if (index > centerLiLen) {
                console.log("右", -(index - centerLiLen) * liWidth / 2)
                $(element).css({
                    transform: `translateZ(${-(index - centerLiLen) * liWidth}px) translateX(${-(index - centerLiLen) * liWidth / 2}px)`,
                    opacity: 0.6
                })
            }
        })
    } else {
        $(".content ul>li").each(function (index, element) {
            // console.log(index)
            if (index < centerLiLen) {
                $(element).css({
                    transform: `translateZ(${-(centerLiLen - index) * liWidth}px) translateX(${(centerLiLen - index) * liWidth / 2}px)`,
                    opacity: 0.6
                })
            } else if (index == centerLiLen) {
                $(element).css({
                    transform: `translateZ(0px) translateX(0px)`,
                    opacity: 1
                })
                // console.log("中")
            } else if (index > centerLiLen) {
                // console.log("右",-(index - centerLiLen) * liWidth/2)
                $(element).css({
                    transform: `translateZ(${-(index - centerLiLen) * liWidth}px) translateX(${-(index - centerLiLen) * liWidth / 2}px)`,
                    opacity: 0.6

                })
            }
        })
    }
}
function liClick() {
    let liLen = $(".content ul>li").length;
    let centerLiLen = parseInt(liLen / 2)
    $(".content ul>li").click(function () {
        console.log($(this).index())
        if (centerLiLen == $(this).index()) {
            console.log("==")
        } else if (centerLiLen < $(this).index()) {
            for (let i = 0; i < $(this).index() - centerLiLen; i++) {
                console.log($(".content ul>li")[0])
                $(".content ul").append($(".content ul>li")[0])
            }
        } else {
            for (let i = 0; i < centerLiLen - $(this).index(); i++) {
                console.log($(".content ul>li")[($(".content ul>li").length - 1)])
                $(".content ul").prepend($(".content ul>li")[($(".content ul>li").length - 1)])
            }
        }
        change();

    });
}
// 定时器轮播方法
function interval() {
    let liLen = $(".content ul>li").length;
    let centerLiLen = parseInt(liLen / 2)
    let time = setInterval(function () {
        $(".content ul>li").eq(centerLiLen - 1).click()
    }, 1000);

    // onban判断解决当鼠标在轮播图上时刷新后鼠标离开定时器叠加的问题
    let onban = true
    $(".content ul").hover(function () {
        // over
        if (onban) {
            clearInterval(time)
        }
        onban = false
    }, function () {
        // out
        if (!onban) {
            time = setInterval(function () {
                $(".content ul>li").eq(centerLiLen - 1).click()
            }, 1000)
        }
        onban = true
    });
}
// 初始化
change();
// 点击
liClick()
// 定时器
interval()