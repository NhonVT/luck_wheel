// Detect Mobile
var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	ua
);

var presentResult = {};

var videoId = '';
var video = null;

fsPlay = true;

// var arrPriceAll = [];
var arrWin = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// for (var i = 0; i < 60; i++) {
// 	arrWin.push(2);
// 	arrWin.push(3);
// 	arrWin.push(5);
// }
// for (var i = 0; i < 30; i++) {
// 	arrPriceAll.push(0);
// 	arrWin.push(0);
// }
var fs_prices = [
	{
		gilf: true,
		nameInText: 'Xe đạp',
	},
	{
		gilf: true,
		nameInText: 'Card 10K',
	},
	{
		gilf: true,
		nameInText: 'Áo khoác',
	},
	{
		gilf: true,
		nameInText: 'RTD 180ml (hộp)',
	},
	{
		gilf: true,
		nameInText: 'Bút 86 màu',
	},
	{
		gilf: true,
		nameInText: 'Card 20K',
	},
	{
		gilf: true,
		nameInText: 'Bút màu',
	},
	{
		gilf: true,
		nameInText: 'RTD 115ml (hộp)',
	},
	{
		gilf: true,
		nameInText: 'Balo con gà',
	},
	{
		gilf: true,
		nameInText: 'Card 50K',
	},
];

function ActionAfterRouleteComplete(price) {
	if (price.gilf) { //Win
		setTimeout(function () {
			$('.modal').addClass('open-modal');
			$('.modal-inr .small-title').text(price.nameInText)
		}, 500)
	}
}

function inputHolder() {
	$(document).on('focus', '.fs-group input[type="text"], .fs-group input[type="password"], .fs-group textarea', function () {
		$(this).parent().parent().removeClass('fs-show-error');
	});
	$(document).on('click', '.fs-select', function () {
		$(this).parents().removeClass('fs-show-error');
	});
	$(document).on("change", "input[type=checkbox], input[type=radio]", function () {
		$(this).parent().parent().removeClass('fs-show-error');
	});
}

// Events Common
function fsEvent() {

	// Open menu
	$('.nav-but').on('click', function () {
		$('body').addClass('open-menu');
	});

	// Close menu
	$('.close-menu, .overlay').on('click', function () {
		$('body').removeClass('open-menu');
	})

	// Open Popup
	$('.open-popup').on('click', function () {
		$('body').addClass('fs-no-scroll');
		$('.open-popup').addClass('active');
	});

	// Close PopUp
	$('.popup-overlay').on('click', '.js-close-popup', function () {
		$('.popup-overlay').fadeOut(0, function () {
			$('body').removeClass('fs-no-scroll');
		});
	});


	// Open select
	$(document).on('click', '.fs-select-header', function (e) {
		console.log('clicked');
		var box = $(this).parent();
		box.parent().removeClass('fs-show-error');
		if (box.hasClass('fs-open-select')) {
			box.removeClass('fs-open-select');
		} else {
			$('.fs-select').removeClass('fs-open-select');
			box.addClass('fs-open-select');
		}
	});

	// Chose selected item
	$(document).on('click', '.fs-select-box li', function (e) {
		var that = $(this);
		var box = $(this).parent().parent().parent();
		var target = $(this).attr('data-target');
		if (target == '0') {
			box.removeClass('not-default');
		} else {
			box.addClass('not-default');
		}
		if (!that.hasClass('selected')) {
			box.find('li').removeClass('selected');
			that.addClass('selected');
			box.removeClass('fs-open-select');
			box.find('.fs-select-header span').html(that.text());
		}
	});

	//Close any Tooltip when click out
	$(document).on('click touchstart', function (event) {
		//Close select
		if ($(".fs-select").has(event.target).length == 0 && !$(".fs-select").is(event.target)) {
			$(".fs-select").removeClass("fs-open-select");
		}
	});

	// Close popup
	$(document).on('click', '.close-popup', function () {
		$('body').removeClass('fs-no-scroll');
		$('.popup-overlay').fadeOut(150);
	});

	// Go top
	$('.go-top').on('click', function () {
		$("html, body").stop().animate({ scrollTop: 0 }, 500);
	});

	inputHolder();

	// Game
	var $fs_roulete = $('.circle__gift_img').fortune(fs_prices);

	$('.js-pin').on('click', function () {
		if (fsPlay) {
			fsPlay = false;
			$fs_roulete.spin().done(function (price) {
				presentResult = price;
				// console.log(presentResult);
				ActionAfterRouleteComplete(price);
			});
		}
	});

	$('.but-pin').on('click', function () {
		$('.box__form').removeClass('active');
		$('.box__game').addClass('active');
	});

	$('.js-close-popup-gift').on('click', function () {
		window.location.reload();
	});

	// recruit trigger click recuit upload video
	$(document).on('click', '.js-upload-video', function () {
		$('#uploadVideoImage').trigger('click');
	});

	// recuit upload video
	$('#uploadVideoImage').on('change', function () {
		var allFile = "";
		for (var i = 0; i < $(this)[0].files.length; i++) {
			var fileName = $(this)[0].files[i].name;
			allFile += '<p>' + 'Upload thành công hình hóa đơn: ' + fileName + '</p>'
		}
		$('.fs-name-file').append(allFile);
		$('.area-upload').addClass('done');
	});
}

// Variables for Scroll
var isCroll = false,
	scrollPos = 0,
	threshold = 50;

// LazyLoad
function ImgLazyLoad() {

	lazyImages = window.innerWidth > 414 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyBgs = window.innerWidth > 414 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyImages).forEach(function (elm) {
		if (Math.abs(elm.getBoundingClientRect().top) <= window.innerHeight + threshold) {
			elm.setAttribute('src', elm.getAttribute('data-src'));
			elm.classList.remove('fs-lazy');
		}
	});

	// Lazy background
	[].slice.call(lazyBgs).forEach(function (elm) {
		if (Math.abs(elm.getBoundingClientRect().top) <= window.innerHeight + threshold) {
			elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
			elm.classList.remove('fs-lazy');
		}
	});

}

function ImgLazyAll() {

	lazyAllImages = window.innerWidth > 414 ? document.querySelectorAll('.cmPic.fs-lazy, .pcPic.fs-lazy') : document.querySelectorAll('.cmPic.fs-lazy, .spPic.fs-lazy');
	lazyAllBgs = window.innerWidth > 414 ? document.querySelectorAll('.cmBg.fs-lazy, .pcBg.fs-lazy') : document.querySelectorAll('.cmBg.fs-lazy, .spBg.fs-lazy');

	// Lazy images
	[].slice.call(lazyAllImages).forEach(function (elm) {
		elm.setAttribute('src', elm.getAttribute('data-src'));
		elm.classList.remove('fs-lazy');
	});
	// Lazy background
	[].slice.call(lazyAllBgs).forEach(function (elm) {
		elm.style.backgroundImage = 'url(' + elm.getAttribute('data-src') + ')';
		elm.classList.remove('fs-lazy');
	});
}

// Func Scroll
var scrollPos = 0,
	counting = true;

function onScroll() {

	scrollPos = $(window).scrollTop();
	var windowH = window.innerHeight;

	setTimeout(function () {
		ImgLazyLoad();

		[].slice.call(document.querySelectorAll('.item-prize')).forEach(function (elm) {
			if (Math.abs(elm.getBoundingClientRect().top) <= windowH - threshold) {
				elm.classList.add('fs-ani');
			}
		});

	}, 0);  // Process for Input Delay

}

// Func Resize
function Resize() {

	// Need detect not mobile when resize because in mobile scrolling call resize
	if (!isMobile) {
		ImgLazyLoad();
	}

}

// Func Rotate
function Rotate() {
	ImgLazyLoad();
}

// Set Scroll for Page
$(window).on('scroll', onScroll);

// Page Rezize
$(window).on('resize', Resize);

// Page Rotate
$(window).on('orientationchange', Rotate);

//  Page load
$(window).on('load', function () {
	onScroll();
	setTimeout(function () {
		fsEvent();
	}, 50);
});

// Page Ready
(function () {
	ImgLazyLoad(); // must be call here fisrt
	onScroll();
})();



