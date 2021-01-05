$(document).ready(function() {
    let rovers = ['curiosity', 'opportunity', 'spirit'],
        rover = rovers[0],
        roverName = rover[0].toUpperCase() + rover.substring(1);
    let next_prev = '.btns_next-prev-date',
        cl_ph_num = '.rover-photos-number > .value',
        curdate = '.rover-photos-title > .date',
        launch_date = '.rover-launch_date > .value',
        landing_date = '.rover-landing_date > .value',
        attr_curdate = 'current_date';
    var max_date,
        api_key = 'tHmV7JS4rx9Jm4uXHtMs9rEbCvQOCLSfnjPus886';

    var canvas_config = new Map([
        ['width', '600'],
        ['height', '600']
    ]);

    var deferredPrompt;
    var addBtn = document.querySelector('.add-button');
    addBtn.style.display = 'none';

    $('.rover-name > .value').text(roverName);

    $('.send-date').each(function() {
        $(this).click(function() {
            let date = $(this).parents('.choose-date').find('input[type=text]').val();
            renderCustomDatePhotos(date);
        })
    })

    $('.btn-prev-day').each(function() {
        $(this).click(function() {
            renderNearestDayPhotos($(this));
        })
    });
    $('.btn-next-day').each(function() {
        $(this).click(function() {
            renderNearestDayPhotos($(this));
        })
    });

    $('.js-only-large').click(function() {
        if ($(this).find('input[name="only-large"]').is(':checked')) {
            showOnlyLargePhotos = true;
        } else {
            showOnlyLargePhotos = false;
        }
    })

    $('.js-only-large').find('input[name="only-large"]').click(function() {
        requestCurrentPhotos();
    })

    $('.js-drawing-mode').click(function() {
        if ($(this).find('input[name="drawing-mode"]').is(':checked')) {
            drawingMode = true;
            $('.js-only-large').hide();
        } else {
            drawingMode = false;
            $('.js-only-large').show();
            $('.js-only-large').find('input[name="only-large"]').prop('checked', false);
        }
    })

    $('.js-drawing-mode').find('input[name="drawing-mode"]').click(function() {
        requestCurrentPhotos();
    })

    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover + '?api_key=' + api_key,
        success: function(data) {
            console.log(data.photo_manifest);
            max_date = data.photo_manifest.max_date;

            $(launch_date).text(data.photo_manifest.launch_date);
            $(landing_date).text(data.photo_manifest.landing_date);
            $('.rover-sol > .value').text(data.photo_manifest.max_sol);
            $(cl_ph_num).text(data.photo_manifest.total_photos);
            $(curdate).text(max_date);
            $(next_prev).attr(attr_curdate, max_date)

            $.ajax({
                url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + max_date + '&api_key=' + api_key,
                success: function(data_latest) {
                    console.log(data_latest.photos);
                    renderAjaxImg(data_latest, max_date);
                }
            });
        }
    });

    function requestCurrentPhotos() {
        let activeDateTmpst = moment($(next_prev).attr(attr_curdate));
        let activeDate = activeDateTmpst.format('YYYY-MM-DD');
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + activeDate + '&api_key=' + api_key,
            success: function(data_near) {
                renderAjaxImg(data_near, activeDate);
            }
        })
    }

    function renderAjaxImg(data, date = '') {
        $('#photos_page').html('');
        if (data.photos.length) {

            let ph = data.photos;

            $(curdate).text(date);
            $(next_prev).attr(attr_curdate, date);
            $(next_prev).last().show();

            for (i = 0; i < ph.length ; i++) {
                if (ph[i].camera.name == 'NAVCAM') {
                    renderPhoto(ph[i].img_src);
                }
            }
            $('.btn-show-drawing').each(function() {
                $(this).click(function() {
                    $(this).parents('.image-container').find('.card-popup').show();
                    $(this).parents('.image-container').find('.popup-img-canvas').addClass('active_canvas');
                    $(this).parents('.image-container').find('.btn-close-popup').addClass('close-active-canvas');

                    $('.active_canvas').append('<canvas class="img_canvas" width="' + canvas_config.get('width') + '" height="' + canvas_config.get('height') + '"></canvas>');

                    let img_canvas = new Image();
                    img_canvas.src = $(this).parents('.image-container').find('img.photo').attr('src');

                    let canvas = $('.img_canvas').last()[0],
                        context = canvas.getContext('2d');

                    img_canvas.onload = function() {
                        context.drawImage(img_canvas, 0, 0, parseInt(canvas_config.get('width')), parseInt(canvas_config.get('height')));
                    };

                    $('.active_canvas .img_canvas').mousemove(function(e) {
                        if (e.target) {
                            let x = e.offsetX,
                                y = e.offsetY;
                            let canvas = $(this)[0],
                                context = canvas.getContext('2d');
                            context.fillStyle = "rgba(213,186,131,0.025)";
                            context.fillRect(x - 50, y - 50, 100, 100);
                        }
                    })
                })
            })
            $('.btn-close-popup').each(function() {
                $(this).click(function() {
                    if ($(this).hasClass('close-active-canvas')) {
                        $(this).parents('.image-container').find('.popup-img-canvas').removeClass('active_canvas');
                        $(this).parents('.image-container').find('.img_canvas').remove();
                        $(this).removeClass('close-active-canvas');
                        $(this).parents('.image-container').find('.card-popup').hide();
                    }
                })
            })
        } else {
            $(curdate).text(date);
            $('.quantity_total').text('нет');
            $(next_prev).attr(attr_curdate, date);
            $('#photos_page').html('');
            $(next_prev).last().hide();
        }
        let currentDate = $(next_prev).attr(attr_curdate);
        if (max_date == currentDate) {
            $('.hide-btn').show();
        } else {
            $('.hide-btn').hide();
        }
    }

    function renderPhoto(img) {
        $('#photos_page').append('<div class="image-container card-deck"><div class="card position-relative"><button type="button" class="btn-show-drawing btn btn-light position-absolute m-0"><i class="fas fa-paint-brush"></i></button><a data-fancybox="gallery" href="' + img + '"><img src="' + img + '" class="photo d-block w-100" alt="..."></a></div><div class="card-popup w-100 h-100 overflow-hidden fixed-top bg-secondary bg-gradient" style="display:none"><div class="card-popup-content rounded-3 shadow-lg bg-white"><div class="btn-close-popup bg-secondary bg-gradient">&#10008;</div><div class="popup-img-canvas"></div></div></div>');
    }

    function renderNearestDayPhotos($btn) {
        let currentDate = moment($(next_prev).attr(attr_curdate));
        let numday;
        $btn.hasClass('btn-prev-day') ? numday = -1 : numday = 1
        let nearDate = currentDate.add(numday, 'day').format('YYYY-MM-DD');
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + nearDate + '&api_key=' + api_key,
            success: function(data_near) {
                renderAjaxImg(data_near, nearDate);
            }
        })
    }

    function renderCustomDatePhotos(date) {
        date = moment(date);
        let date_formatted = date.format('YYYY-MM-DD');

        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + date_formatted + '&api_key=' + api_key,
            success: function(data) {
                renderAjaxImg(data, date_formatted);
            }
        })
    }

    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd"
    });

    // установка на домашний экран пк / телефона

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        addBtn.style.display = 'block';
    
        addBtn.addEventListener('click', (e) => {
            addBtn.style.display = 'none';
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
            });
        });
    });
});
