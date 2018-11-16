$(function() {
// ---------------------------------------------------Настройки гамбургера, бинды
	var $menu = $("#my-menu").mmenu({
   extensions: ['theme-black', 'fx-menu-slide', 'pagedim-black', 'position-right'],
		navbar: {
			title: '<img src="img/logo-1.svg" alt="Салон красоты Смитлер">'
		},
});
var $icon = $("#my-icon");
var API = $menu.data( "mmenu" );

$icon.on( "click", function() {
   API.open();
});

API.bind( "open:finish", function() {
   setTimeout(function() {
      $icon.addClass( "is-active" );
   }, 100);
});
API.bind( "close:finish", function() {
   setTimeout(function() {
      $icon.removeClass( "is-active" );
   }, 100);
});//---------------------------------------------------------Настройки гамбургера
	$('.carousel-services').on('initialized.owl.carousel', function(){  //Функция для фикса карусели, заставляет вычислять высоту img только после инициализации карусели
		setTimeout(function(){
			carouselServise()
		}, 150);
	});
	$('.carousel-services').owlCarousel({  // Настройки карусели
		loop: true, //Бесконечная прокрутка
		nav: true,  //Кнопки навигации
		smartSpeed: 800,  //Скорость прокручивания
		navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],  //Иконки кнопок навигации
		responsiveClass: true,  //Адаптивность карусели
		dots: false,  //Отключили доты 
		responsive: {
			0: {  //Минимальное разрешение
				items: 1  //Количество айтемов
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		},

	});

	function carouselServise() {  //Функция для задачи высоты изображению
		$('.carousel-services-item').each(function() {
			var ths 	= $(this),
					thsh	= ths.find('.carousel-services-content').outerHeight();
					ths.find('.carousel-services-img').css('min-height', thsh); 
		});
	}carouselServise();

	$('.carousel-services-composition .h3').each(function(){ //оборачиваем слово в спан
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
	});

	$('section .h2').each(function(){ //оборачиваем слово в спан
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
	});

	//$('select').selectize();  //Подключаем селектайз

	//E-mail Ajax Send Cкрипт UniMail
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				// Done Functions
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

	function onResize() {    //Функции, выполняемые при изменении размера окна
		$('.carousel-services-content').equalHeights();
	}onResize();
	window.onresize = function(){
		onResize();
		carouselServise();
	};

});