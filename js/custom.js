AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});

$(function(){

	'use strict';

	$(".loader").delay(200).fadeOut("slow");
  $("#overlayer").delay(200).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').addClass('active');
			}
		}) 

		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
					$('body').find('.js-menu-toggle').removeClass('active');
				}
	    }
		});
	}; 
	siteMenuClone();

	var owlPlugin = function() {

		if ( $('.owl-4-slider').length > 0 ) {
			var owl4 = $('.owl-4-slider').owlCarousel({
		    loop: true,
		    autoHeight: true,
		    margin: 0,
		    autoplay: true,
		    smartSpeed: 1200,
		    items: 4,
		    nav: false,
		    navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
		    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:4
	        }
	    	}
			});

			$('.js-custom-next-v2').click(function(e) {
				e.preventDefault();
				owl4.trigger('next.owl.carousel');
			})
			$('.js-custom-prev-v2').click(function(e) {
				e.preventDefault();
				owl4.trigger('prev.owl.carousel');
			})
		}

		if ( $('.owl-single-text').length > 0 ) {
			var owlText = $('.owl-single-text').owlCarousel({
		    loop: true,
		    autoHeight: true,
		    margin: 0,
		    autoplay: true,
		    smartSpeed: 1200,
		    items: 1,
		    nav: false,
		    navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>']
			});
		}
		if ( $('.owl-single').length > 0 ) {
			var owl = $('.owl-single').owlCarousel({
		    loop: true,
		    autoHeight: true,
		    margin: 0,
		    autoplay: true,
		    smartSpeed: 800,
		    items: 1,
		    nav: false,
		    navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
		    onInitialized: counter
			});

			function counter(event) {
				$('.owl-total').text(event.item.count);
			}
			
			$('.js-custom-owl-next').click(function(e) {
				e.preventDefault();
				owl.trigger('next.owl.carousel');
				owlText.trigger('next.owl.carousel');
			})
			$('.js-custom-owl-prev').click(function(e) {
				e.preventDefault();
				owl.trigger('prev.owl.carousel');
				owlText.trigger('prev.owl.carousel');
			})

			$('.owl-dots .owl-dot').each(function(i) {
				$(this).attr('data-index', i - 3);
			});

			owl.on('changed.owl.carousel', function(event) {
				var i = event.item.index;
				if ( i === 1 ) {
					i = event.item.count;
				} else {
					i = i - 1;
				}
				$('.owl-current').text(i);
				$('.owl-total').text(event.item.count);
			})
		}

	}
	owlPlugin();

	var counter = function() {
		
		$('.count-numbers').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ut-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.counter > span').each(function(){
					var $this = $(this),
						num = $this.data('number');
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


})




function initializeOwlCarousel() {
    $('#testimonials-carousel').owlCarousel({
        loop: true,
        autoHeight: true,
        margin: 0,
        autoplay: true,
        smartSpeed: 1200,
        items: 1,
        nav: false,
        navText: ['<span class="icon-keyboard_backspace"></span>', '<span class="icon-keyboard_backspace"></span>']
    });
}

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const bestsellersSection = document.getElementById('bestsellers-section');

            const heading = document.createElement('div');
            heading.className = 'col-12 mb-2';
            heading.setAttribute('data-aos', 'fade-up');
            heading.setAttribute('data-aos-delay', '0');
            heading.innerHTML = '<h2 class="heading-2">Бестселлеры</h2>';
            bestsellersSection.appendChild(heading);
            
            data.bestSellers.forEach((product, index) => {
                const productDiv = document.createElement('div');
                productDiv.className = `col-6 col-sm-6 col-md-6 col-lg-3 ${index % 2 !== 0 ? 'mt-lg-5' : ''}`;
                productDiv.setAttribute('data-aos', 'fade-up');
                productDiv.setAttribute('data-aos-delay', (index + 1) * 100);
                
                productDiv.innerHTML = `
                    <div class="media-1">
                        <img src="${product.image}" alt="Image" class="img-fluid mb-4">
                        <div class="px-4">
                            <a href="${product.link}" class="media-title mb-3 d-block">${product.name}</a>
                            <p>${product.description}</p>
                            <p><strong>Купили:</strong> ${product.purchased} человек</p>
                            <p><strong>Просмотрели:</strong> ${product.viewed} человек</p>
                        </div>
                    </div>
                `;
                
                bestsellersSection.appendChild(productDiv);
            });

            const testimonialsCarousel = document.getElementById('testimonials-carousel');
            testimonialsCarousel.innerHTML = ''; 

            data.testimonials.forEach(testimonial => {
                const testimonialDiv = document.createElement('div');
                testimonialDiv.className = 'testimonial mx-auto';

                testimonialDiv.innerHTML = `
                    <figure class="img-wrap">
                        <img src="${testimonial.image}" alt="Image" class="img-fluid">
                    </figure>
                    <h3 class="name">${testimonial.name}</h3>
                    <blockquote>
                        <p>&ldquo;${testimonial.text}&rdquo;</p>
                    </blockquote>
                `;

                testimonialsCarousel.appendChild(testimonialDiv);
            });

            initializeOwlCarousel();
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    loadData();
});
let currentShortIndex = 0;
let shortsData = [];

function openShorts() {
    document.getElementById('shortsModal').style.display = "block";
    document.body.style.overflow = 'hidden';

    // Загружаем шорты из JSON файла
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            shortsData = data.shorts;
            currentShortIndex = 0; // Начинаем с первого видео
            displayShort(currentShortIndex);
        })
        .catch(error => console.error('Ошибка загрузки видео:', error));
}

function closeShorts() {
    document.getElementById('shortsModal').style.display = "none";
    document.body.style.overflow = 'auto';
}

function displayShort(index) {
    const shortsContainer = document.getElementById('shorts-scroll-container');
    shortsContainer.innerHTML = ''; // Очистка контейнера перед добавлением нового видео

    const shortDiv = document.createElement('div');
    shortDiv.className = 'short';
    shortDiv.innerHTML = `
        <video src="${shortsData[index].video}" autoplay muted loop></video>
        <div class="short-details">
            <div class="likes">
                <span class="like-icon">❤️</span>
                <span class="like-count">${shortsData[index].likes}</span>
            </div>
            <div class="views">
                <span class="view-icon">👁️</span>
                <span class="view-count">${shortsData[index].views}</span>
            </div>
        </div>
    `;
    shortsContainer.appendChild(shortDiv);
}

function nextShort() {
    if (currentShortIndex < shortsData.length - 1) {
        currentShortIndex++;
        displayShort(currentShortIndex);
    }
}

function prevShort() {
    if (currentShortIndex > 0) {
        currentShortIndex--;
        displayShort(currentShortIndex);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('a[href="javascript:void(0);"]').addEventListener('click', openShorts);
});
