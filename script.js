$(document).ready(function () {

    $('.hamburger-menu').on('click', function () {
        $(this).toggleClass('active');
        $('.header-right').toggleClass('mobile-menu-active');
    });

    var $scrollTopBtn = $('#scrollTopBtn');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $scrollTopBtn.addClass('show');
        } else {
            $scrollTopBtn.removeClass('show');
        }
    });

    $scrollTopBtn.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });

    var $window = $(window);

    function checkAnimations() {
        var windowHeight = $window.height();
        var windowTopPosition = $window.scrollTop();
        var windowBottomPosition = (windowTopPosition + windowHeight);

        $('.animate-init').each(function () {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = (elementTopPosition + elementHeight);

            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                $element.removeClass('animate-init');
            }
        });
    }

    checkAnimations();
    $window.on('scroll resize', checkAnimations);

    var $dropdown = $('.footer-contact-dropdown');
    var $toggleBtn = $('#contactToggleBtn');
    var $contactForm = $('#contactForm');
    var animationSpeed = 500;

    $dropdown.on('mouseenter', function () {
        if (!$contactForm.is(':visible')) {
            $contactForm.slideDown(animationSpeed);
        }
        $toggleBtn.addClass('hover-active');
    });

    $dropdown.on('mouseleave', function () {
        if (!$toggleBtn.hasClass('active')) {
            $contactForm.slideUp(animationSpeed);
            $toggleBtn.removeClass('hover-active');
        }
    });

    $toggleBtn.on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $contactForm.slideDown(animationSpeed);
            $(this).addClass('hover-active');
        } else {
            $contactForm.slideUp(animationSpeed);
            $(this).removeClass('hover-active');
        }
    });

    $contactForm.on('focusin', 'input, textarea', function () {
        if (!$toggleBtn.hasClass('active')) {
            $toggleBtn.addClass('active');
            $toggleBtn.addClass('hover-active');
        }
    });

    if ($('#artistSearchInput').length > 0) {

        var $allArtists = $('.artist-card');
        var $noResultsMsg = $('#noResultsMessage');
        var $searchInput = $('#artistSearchInput');

        function filterArtists() {
            var searchTerm = $searchInput.val().toLowerCase().trim();
            var artistsFound = 0;

            $allArtists.each(function () {
                var $card = $(this);
                var artistName = $card.data('artist-name').toLowerCase();

                if (artistName.includes(searchTerm)) {
                    $card.removeClass('no-match').addClass('highlight');
                    artistsFound++;
                } else {
                    $card.addClass('no-match').removeClass('highlight');
                }
            });

            if (searchTerm === "") {
                $allArtists.removeClass('no-match highlight');
                artistsFound = $allArtists.length;
            }

            if (artistsFound > 0) {
                $noResultsMsg.slideUp(200);
            } else {
                $noResultsMsg.slideDown(200);
            }

            return artistsFound;
        }

        $searchInput.on('keyup input', filterArtists);

        $('.artist-search-form').on('submit', function (e) {
            e.preventDefault();
            var artistsFound = filterArtists();

            if (artistsFound > 0 && $searchInput.val().trim() !== "") {
                var $firstMatch = $('.artist-card.highlight').first();

                if ($firstMatch.length > 0) {
                    var headerHeight = $('.main-header').outerHeight() || 100;
                    var scrollToPosition = $firstMatch.offset().top - headerHeight - 20;

                    $('html, body').animate({
                        scrollTop: scrollToPosition
                    }, 500);
                }
            }
        });

        $(document).on('click', function (e) {
            if ($searchInput.val().trim() === "") {
                return;
            }

            if ($(e.target).closest('.artist-search-form').length > 0) {
                return;
            }

            if ($(e.target).closest('.artist-card.highlight').length > 0) {
                return;
            }

            $searchInput.val('');
            filterArtists();
        });
    }

    $('body').append(
        '<div id="custom-alert-overlay"></div>' +
        '<div id="custom-alert-box">' +
        '  <p id="custom-alert-message"></p>' +
        '  <button id="custom-alert-close" class="btn btn-primary">OK</button>' +
        '</div>'
    );

    var alertStyles = `
        #custom-alert-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 2000;
        }
        #custom-alert-box {
            display: none;
            position: fixed;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-light, #0a0a0a);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 30px 40px;
            z-index: 2001;
            text-align: center;
            box-shadow: 0 0 30px rgba(255, 0, 60, 0.5); 
        }
        #custom-alert-message {
            font-size: 1.2rem;
            color: var(--text-primary, #fff);
            margin-bottom: 25px;
            line-height: 1.6;
        }
        #custom-alert-close {
            background-image: var(--gradient-neon);
            padding: 10px 30px;
        }
    `;
    $('head').append('<style>' + alertStyles + '</style>');

    var $alertOverlay = $('#custom-alert-overlay');
    var $alertBox = $('#custom-alert-box');

    function showCustomAlert(message) {
        $('#custom-alert-message').text(message);
        $alertOverlay.fadeIn(300);
        $alertBox.fadeIn(300);
    }

    function closeCustomAlert() {
        $alertOverlay.fadeOut(300);
        $alertBox.fadeOut(300);
    }

    $('#custom-alert-close').on('click', closeCustomAlert);
    $alertOverlay.on('click', closeCustomAlert);

    $('.signup-form').on('submit', function (e) {
        e.preventDefault();
        showCustomAlert('Your request has been submitted!');
        $(this).trigger('reset');
    });

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        showCustomAlert('Your request has been submitted!');
        $(this).trigger('reset');
    });

});