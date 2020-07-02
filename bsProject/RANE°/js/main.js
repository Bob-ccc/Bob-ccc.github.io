
$(document).scroll(function () {
    // console.log($(window).scrollTop())
    // console.log($(".main-container .hero").position().top)
    if ($(window).scrollTop() + window.innerHeight > $(".main-container .temps").position().top) {
        $(".main-container .temps .row .wow").eq(0).animate({ opacity: 1 }, 1000)
        $(".main-container .temps .row .wow").eq(1).animate({ opacity: 1 }, 2000)
        $(".main-container .temps .row .wow").eq(2).animate({ opacity: 1 }, 3000)
    }
    if ($(window).scrollTop() + window.innerHeight > $(".main-container .views").position().top) {
        $(".main-container .views .row .wow img").eq(0).animate({ "left": 0 }, 2000)
        $(".main-container .views .row .wow img").eq(1).animate({ "left": 0 }, 2000)
    }
    if ($(window).scrollTop() + window.innerHeight > $(".main-container .download .row").position().top) {
        $(".main-container .download .row .fadeIn").animate({ opacity: 1 }, 1000, function () {
            $(".main-container .download .row .fadeInUp").animate({ opacity: 1,top: 0 }, 1500)
        })
    }
});
$(".main-container .hero .row .right").animate({ opacity: 1 }, 1500, function () {
    $(".main-container .hero .row .left .rane").animate({ opacity: 1 }, 500, function () {
        $(".main-container .hero .row .left .weather").animate({ opacity: 1 }, 500, function () {
            $(".main-container .hero .row .left .download").animate({ opacity: 1,top: 0 }, 1500)
        })
    })
})

$(".main-container .views .row .wow img").eq(0).css("left", -$(this).width())

$(".main-container .views .row .wow img").eq(1).css("left", $(this).width())
