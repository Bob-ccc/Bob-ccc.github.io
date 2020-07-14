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
    {
        id: 1382985712,
        name: "根本你不懂得爱我（女生版）",
        artists: "梁爽凉爽",
        picUrl:
            "https://p2.music.126.net/TDUNUdyiRpZ7plXm1aca0w==/109951164276645213.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 1426649237,
        name: "海底",
        artists: "一只榴莲",
        picUrl:
            "https://p1.music.126.net/swcW0FE-__ihfjnJqU22Qg==/109951164696345792.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 1336856449,
        name: "告白",
        artists: "沈以诚",
        picUrl:
            "https://p1.music.126.net/4xF8d6QNMy-TKYMy2AUwCQ==/109951163803974764.jpg",
        playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
    },
    {
        id: 1390469916,
        name: "鲸落",
        artists: "刘思鉴",
        picUrl:
            "https://p2.music.126.net/MMQ-4yhc_4jAsK6sm26p-A==/109951164358504964.jpg",
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
    document.querySelectorAll(".player_list li")[0].className = "active";
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
        // console.log(element)
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
function twoDigit(x) {
    return String(x).length == 1 ? "0" + x : x
}
function audioTime(time) {
    var m = parseInt(parseInt(time) / 60);
    var s = parseInt(time) % 60;
    return [twoDigit(m), twoDigit(s)]
}

// 音频加载完成再执行
audio.addEventListener("canplay", function () {
    // 显示歌曲总时长
    $(".card_control .audio_second span").eq(1).html(audioTime(audio.duration)[0] + ":" + audioTime(audio.duration)[1]);
    // 进度条的进度随时间改变
    audio.addEventListener("timeupdate", function () {
        // 显示歌曲当前播放时长
        $(".card_control .audio_second span").eq(0).html(audioTime(audio.currentTime)[0] + ":" + audioTime(audio.currentTime)[1]);
        // console.log(audioTime(audio.currentTime))
        // var time = parseInt(audio.currentTime)
        // console.log(time,audio.duration);

        range_play_slider.style.width = audio.currentTime / audio.duration * 100 + "%";
    })

});

// 拖动条控制音乐和进度条的进度
range_play_input.addEventListener("input", function () {
    range_play_slider.style.width = (this.value / this.max) * 100 + "%";
    audio.currentTime = this.value;
    // 解决进度拖到最后又往前拖动时停止播放的问题
    // if (this.value < this.max) {
    //     audio.play()
    // }
})
// 当拖动条鼠标按下时停止播放
range_play_input.addEventListener("mousedown", function () {
    audio.pause()
})
// 当拖动条鼠标松开时停止播放
range_play_input.addEventListener("mouseout", function () {
    audio.play()
})
// 进度条拖动时的播放状态设置
// audio.onseeked = function() 
// {
//     audio.pause()
// };

// 暂停按钮点击切换样式
document.querySelector(".btn_toggle").onclick = function () {
    this.classList.toggle("active");
}
// 播放按钮点击事件
document.querySelector(".fa-play").onclick = function () {
    audio.play()
}
// 暂停按钮点击事件
document.querySelector(".fa-pause").onclick = function () {
    audio.pause()
}

// 模式按钮点击切换样式
document.querySelector(".btn_mode").onclick = function () {
    this.classList.toggle("active");
}
var mode_word = document.querySelector(".btn_mode .mode_word")
// 单曲循环按钮点击事件
document.querySelector(".fa-refresh").onclick = function () {
    audio.loop = false;
    mode_word.innerText = "随机播放";

    //音频播放结束时
    audio.addEventListener('ended', function () {
        $(".player_list li")[Math.floor(Math.random()*length)].onclick();
        
    }, false);
}
// 随机播放按钮点击事件
document.querySelector(".fa-random").onclick = function () {
    audio.loop = true;
    mode_word.innerText = "单曲循环"
}

// 音量按钮点击切换样式
document.querySelector(".btn_sound").onclick = function () {
    this.classList.toggle("active");
}
// 音量按钮点击事件
document.querySelector(".fa-volume-up").onclick = function () {
    audio.muted = true;
    audio.volume = 0;
    sound_range_play_slider.style.width = audio.volume * 100 + "%"

}
// 静音按钮点击事件
document.querySelector(".fa-volume-off").onclick = function () {
    audio.muted = false;
    audio.volume = 0.5;
    sound_range_play_slider.style.width = audio.volume * 100 + "%"
}


audio.volume = 0.5;
var sound_range_play_input = document.querySelector(".sound_range_play_input");
var sound_range_play_slider = document.querySelector(".sound_range_play_slider");
// 音量拖动条控制音量
sound_range_play_input.addEventListener("input", function () {

    sound_range_play_slider.style.width = (this.value / this.max) * 100 + "%";
    audio.volume = this.value;
    if (audio.volume == 0) {
        audio.muted = true;
        document.querySelector(".btn_sound").classList.add("active")
    } else {
        audio.muted = false;
        document.querySelector(".btn_sound").classList.remove("active")
    }
})


var card_clice = document.querySelector(".card_clice");
// 音乐播放状态
audio.addEventListener("play", function () {
    card_clice.classList.add("playing");
    document.querySelector(".btn_toggle").classList.add("active");
});
// 音乐暂停状态
audio.addEventListener("pause", function () {
    card_clice.classList.remove("playing");
    document.querySelector(".btn_toggle").classList.remove("active");

});

// 获取当前播放音乐在音乐列表中的下标
var index = $(".player_list li.active").index();
// 音乐列表长度
var length = $(".player_list li").length;
// 上一曲按钮点击事件
$(".btn_prev").click(function () {
    index--;
    if (index < 0) index = length - 1;
    $(".player_list li")[index].onclick();
})
// 下一曲按钮点击事件
$(".btn_next").click(function () {
    index++
    if (index > length - 1) index = 0;
    $(".player_list li")[index].onclick();
})
