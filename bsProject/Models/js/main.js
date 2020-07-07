$(".mytop .mynav .toggle").click(function(){
    $(this).addClass("active").siblings(".menu").toggle();
})
$(".section_gallery .row img").click(function(){
    var src = $(this).prop("src")
    $(this).parents(".row").siblings(".popup").css("visibility","initial").find("img").prop("src",src);
})

$(".section_gallery .popup .close").click(function(){
    $(this).parents(".popup").css("visibility","hidden")
})