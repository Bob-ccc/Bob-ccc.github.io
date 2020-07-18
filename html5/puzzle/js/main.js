var score = 0;
var open = true;


// 函数方法部分-------------------------
// 核心
function begin(size) {
    var size = size || 3;
    var step = 0;
    var second = 0;
    $(".content").html("")
    $(".select .begin span").eq(1).html(step)
    for (var i = 0; i < size * size; i++) {
        var node = $("<li></li>")
        node.css({
            "background-image":$(".select .tabs .smalls li.active").css("background-image"),
            backgroundPosition: -i % size * 100 + "% " + -Math.floor(i / size) * 100 + "%",
            left: (i % size / size * 100 + "%"),
            top: (Math.floor(i / size) / size * 100 + "%"),
            width: 100 / size + "%",
            height: 100 / size + "%",
            backgroundSize: size * 100 + "% auto"
        })
        node[0].draggable = "true";
        node[0].id = "card" + i;
        $(".content").append(node)
    }

    var x;
    $(".content li").each(function (index, element) {
        // console.log(element)
        element.ondragstart = function (e) {
            // console.log(x);

            e.dataTransfer.setData("Text", e.target.id);
            if (x == size * size) {
                alert("您已经成功了,请重新开始")

            }

        }
        element.ondragover = function (e) {
            e.preventDefault();
        }
        element.ondrop = function (e) {
            if (open) {
                alert("请点击开始按钮开始游戏");
                return
            }
            step++
            e.preventDefault();
            // 获取拖拽目标的id
            var e2 = "#" + e.dataTransfer.getData("Text");
            // 保存放置目标的位置值
            var eCss = {
                top: $(this)[0].style.top,
                left: $(this)[0].style.left
            }
            // console.log($(e2),$(this), $(e2).css("top"),$(this).css("top"))
            // 交换拖拽目标与放置位置目标的方位
            $(this).css({
                top: $(e2)[0].style.top,
                left: $(e2)[0].style.left
            })
            $(e2).css({
                top: eCss.top,
                left: eCss.left
            })
            $(".select .begin span").eq(1).html(step)


            x = 0;
            $(".content li").each(function (ind, ele) {
                if (parseInt(ele.style.top) == parseInt(Math.floor(ind / size) * (100 / size) + "%")
                    && parseInt(ele.style.left) == parseInt((ind % size) * (100 / size) + "%")
                ) {
                    x++
                } else {
                    x--
                }
            })
            // console.log(x)

            // 拼图完成时
            if (x == size * size) {
                score += 100 * size - step;
                console.log("成功了", "步数:" + step)
                $(".step").html(step)
                $(".score").html(score)
                $(".select .size span").eq(1).html(score)
                $(".mask .img").css("background-image",$(".content li").css("background-image"))
                $(".mask").show()
                step = 0
                // $(".content li").prop("draggable",false)

                var listArr = JSON.parse(localStorage.getItem("userlist"));
                var result = listArr.find(function (element, index) {
                    return name == element.name
                })
                console.log(listArr)
                $(listArr).each(function (index, element) {
                    if (element.name == name) {
                        element.score = score
                        console.log(element.score)
                    }
                })

                listArr.sort(function (a, b) {
                    return b.score - a.score
                })
                localStorage.setItem("userlist", JSON.stringify(listArr));
                change()
            }
        }
    });
}
// 排行榜更新
function change() {
    var listArr = JSON.parse(localStorage.getItem("userlist"));
    if (listArr) {
        if (listArr.length > 10) {
            listArr.splice(10,)
        }
    }
    $("#list tbody").html("")
    $(listArr).each(function (index, element) {
        var trnode = document.createElement("tr");
        trnode.innerHTML =
            "<td>" +
            (index+1) +
            "</td><td>" +
            element.name +
            "</td><td>" +
            element.score +
            "</td>";
        $("#list tbody").append($(trnode));
    });
}
// 打乱拼图
function shuffle(size) {
    var arr = [];
    for (var i = 0; i < size * size; i++) {
        arr.push(i);
    }
    // console.log(arr);
    var tmp = [];
    for (var i = 0; i < size * size; i++) {
        tmp.push(
            arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
        );
    }
    console.log(tmp);
    $(".content li").each(function (index, element) {
        // console.log(element)
        $(element).css({
            left: (tmp[index] % size) * (100 / size) + "%",
            top: Math.floor(tmp[index] / size) * (100 / size) + "%"
        })
    });
}



// 按钮部分-------------------------

// 拼图完成提示框关闭按钮事件
$(".close").click(function () {
    $(".mask").hide()
})

// 开始按钮点击事件
$(".begin button").click(function () {
    open = false
    // 重绘拼图
    begin($("select").val())
    // 打乱拼图
    shuffle($("select").val())
})

var name
// 加载网页完成时用户名输入框确定按钮点击事件
$("#submit").click(function () {
    name = $("#name").val()
    console.log(name)
    if (name) {
        if(name.length>5){
            alert("用户名长度不能超过5，请重新输入");
            $("#name").val("").prop("placeholder", "请重新输入用户名");
            return;
        }
        var listArr = JSON.parse(localStorage.getItem("userlist"));
        if (!listArr) {
            listArr = [];
        }
        var result = listArr.find(function (element, index) {
            return name == element.name
        })
        if (result) {
            alert("已有该用户名，请重新输入")
            $("#name").val("").prop("placeholder", "请重新输入用户名")
            return;
        }
        var nameObj = { name: name, score: score }
        listArr.push(nameObj)
        localStorage.setItem("userlist", JSON.stringify(listArr));
        $(".userName").hide(300)
    } else {
        alert("请输入用户名")
    }
})




// 初始化部分---------------------
change();
// 拼图完成提示框初始隐藏
$(".mask").hide()
// 初始拼图显示
begin(3)
// 设置下拉框初始值
$("select").val("3")
var imgArr = ["./img/timg1.jpg","./img/timg2.jpg","./img/timg3.jpg","./img/timg4.jpg","./img/timg5.jpg","./img/timg6.jpg"]
$(".select .tabs .smalls li").each(function(index,element){
    console.log(element)
    $(element).css("background-image","url("+imgArr[index]+")").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".select .tabs .big").css("background-image",$(".select .tabs .smalls li.active").css("background-image"))
    })
})



