var playList = [
    {
        id: 169185,
        name: "认真的雪",
        artists: "薛之谦",
        picUrl:
            "https://p2.music.126.net/yWtj0UXRJBCT9YI7csmAcw==/109951164190741294.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 5253734,
        name: "恋爱达人",
        artists: "罗志祥",
        picUrl:
            "https://p1.music.126.net/n4YTVSO7QK1VRQMCEeOPqA==/80264348845281.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 277302,
        name: "爱",
        artists: "莫文蔚",
        picUrl:
            "https://p1.music.126.net/hcY73QYZt36DeGf91euboQ==/18921495602636668.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
];

var player_list = document.querySelector(".player_list");
var audio = document.querySelector("audio");

playList.forEach(function (element, index) {
    var node = document.createElement("li")
    node.dataset.id = element.id;
    node.innerText = element.name;
    player_list.appendChild(node);

    // 歌曲前的播放图标
    var fa_volume = document.createElement("span")
    fa_volume.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
    // 默认第一首
    document.querySelectorAll(".player_list li")[0].className="active";
    node.appendChild(fa_volume);
    node.onclick = function () {
        // console.log(this);
        // 点击效果
        var player_list_li = document.querySelectorAll(".player_list li");
        player_list_li.forEach(function (element) {
            element.className = ""
        })
        this.className = "active"

        // 重绘音乐，背景，图片，文字
        var songId = this.dataset.id;
        audio.src = "https://music.163.com/song/media/outer/url?id=" + songId + ".mp3";
        console.log(element)
        document.querySelector(".player_card .mask").style.backgroundImage = "url(" + element.picUrl + ")";
        document.querySelector(".player_card .card_clice>img").src = element.picUrl;
        document.querySelector(".player_card .card_control h3").innerText = element.name;
        document.querySelector(".player_card .card_control p").innerText = element.artists;
    }
})

var range_play_input = document.querySelector(".range_play_input");
var range_play_slider = document.querySelector(".range_play_slider");

// 拖动条的最大值=音乐的最大值
audio.addEventListener("durationchange", function () {
    range_play_input.max = audio.duration;
})

// 进度条的进度随时间改变
audio.addEventListener("timeupdate", function () {
    range_play_slider.style.width = audio.currentTime / audio.duration * 100 + "%";
})

// 拖动条控制音乐和进度条的进度
range_play_input.addEventListener("input", function () {
    range_play_slider.style.width = (this.value / this.max) * 100 + "%";
    audio.currentTime = this.value;
    // 解决进度拖到最后又往前拖动时停止播放的问题
    if (this.value < this.max) {
        audio.play()
    }
})

document.querySelector(".btn_toggle").onclick = function(){
    this.classList.toggle("active");
}
document.querySelector(".fa-play").onclick = function(){
    audio.play()
}
document.querySelector(".fa-pause").onclick = function(){
    audio.pause()
}
document.querySelector(".btn_mode").onclick = function(){
    this.classList.toggle("active");
}

var card_clice = document.querySelector(".card_clice");
audio.addEventListener("play", function () {
    card_clice.classList.add("playing");
    document.querySelector(".btn_toggle").classList.add("active");
});
audio.addEventListener("pause", function () {
    card_clice.classList.remove("playing");
});

var index = $(".player_list li.active").index();
var length = $(".player_list li").length;
$(".btn_prev").click(function(){
    index--;
    if(index<0)index=length-1;
    $(".player_list li")[index].onclick();
})
$(".btn_next").click(function(){
    index++
    if(index>length-1)index=0;
    $(".player_list li")[index].onclick();
})
