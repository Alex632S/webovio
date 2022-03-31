let intFrameWidth = window.innerWidth;

$('.menu-burger').on('click', function(e) {
    e.preventDefault();
    $('.menu-burger__burger').toggleClass('menu-burger__burger-off');
    $('.menu-burger__exit').toggleClass('menu-burger__exit-on');
    $('.header').toggleClass('.header-opacity');
    $('.menu-drop').toggleClass('menu-active');
       
});


function slide() {
    h = document.documentElement.clientHeight
    $(".header-size").css('height', h);
    $(".menu-drop").css('height', h);
};

$(window).resize(slide);
$(document).ready(slide);
  
  
$(document).bind('mousewheel DOMMouseScroll', function(event) {
    scroll(event);
});

if (intFrameWidth >= 1200) {
    let num = 1;
    let scrolling = false;
    
    function scroll(event) {
        event.preventDefault();
        if (!scrolling) {
            scrolling = true;
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                num--;
                num = num < 1 ? 1 : num;
            } else {
                num++;
                num = num > 10 ? 10 : num;
            }
           
            $('html, body').animate({
                scrollTop: $(".num" + num).offset().top
            }, 500, "linear", function() {
                scrolling = false;
            });
        }
    }
}

let animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                animItem.classList.remove('_active');
                $('.menu-burger__burger').removeClass('menu-burger__burger-off');
                $('.menu-burger__exit').removeClass('menu-burger__exit-on');
                $('.header').removeClass('.header-opacity');
                $('.menu-drop').removeClass('menu-active'); 
            }
        }
    }
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollBottom;
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

setTimeout(() => {
    animOnScroll();
}, 300);


$(function() {
    let btn = $('#button');  
    $(window).scroll(function() {     
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
        
    });
});



var block_show = null;
 
function scrollTracking(){
	var wt = $(window).scrollTop();
	var wh = $(window).height();
	var et = $('.content-header').offset().top;
	var eh = $('.content-header').outerHeight();
 
	if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)){
		if (block_show == null || block_show == false) {
            $('#button').css({
                'display': 'none'
            });
		}
		block_show = true;
	} else {
		if (block_show == null || block_show == true) {
			$('#button').css({
                'display': 'flex'
            });
		}
		block_show = false;
	}
}
 
$(window).scroll(function(){
	scrollTracking();
});
	
$(document).ready(function(){ 
	scrollTracking();
});
  