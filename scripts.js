$(document).ready(function () {
    let rovers = ['curiosity', 'oportunity', 'spirit'],
        rover = rovers[0],
        roverName = rover[0].toUpperCase() + rover.substring(1)
        ;
    let next_prev = '.btns_next-prev-date',
        cl_ph_num = '.rover-photos-number > .value',
        curdate = '.rover-photos-title > .date',
        attr_curdate = 'current_date'
        ;
    var showOnlyLargePhotos = false,
        drawingMode = false,
        ph_num_all = 0,
        ph_num_large = 0,
        api_key = 'tHmV7JS4rx9Jm4uXHtMs9rEbCvQOCLSfnjPus886'
        ;

    var canvas_config = new Map([
        ['width', '600'],
        ['height', '600']
    ])

    $('.rover-name > .value').text(roverName);

    $('.btn-prev-day').each(function () {
        $(this).click(function () {
            renderNearestDayPhotos($(this));
        })
    });
    $('.btn-next-day').each(function () {
        $(this).click(function () {
            renderNearestDayPhotos($(this));
        })
    });

    $('.js-only-large').click(function () {
        if ($(this).find('input[name="only-large"]').is(':checked')) {
            showOnlyLargePhotos = true;
        } else {
            showOnlyLargePhotos = false;
        }
    })

    $('.js-only-large').find('input[name="only-large"]').click(function () {
        requestCurrentPhotos();
    })

    $('.js-drawing-mode').click(function () {
        if ($(this).find('input[name="drawing-mode"]').is(':checked')) {
            drawingMode = true;
            $('.js-only-large').hide();
        } else {
            drawingMode = false;
            $('.js-only-large').show();
            $('.js-only-large').find('input[name="only-large"]').prop('checked', false);
        }
    })

    $('.js-drawing-mode').find('input[name="drawing-mode"]').click(function () {
        requestCurrentPhotos();
    })

    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover + '?api_key=' + api_key,
        success: function (data) {
            console.log(data.photo_manifest);
            let max_date = data.photo_manifest.max_date;

            $('.rover-sol > .value').text(data.photo_manifest.max_sol);
            $(cl_ph_num).text(data.photo_manifest.total_photos);
            $(curdate).text(max_date);
            $(next_prev).attr(attr_curdate, max_date)

            $.ajax({
                url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + max_date + '&api_key=' + api_key,
                success: function (data_latest) {
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
            success: function (data_near) {
                renderAjaxImg(data_near, activeDate);
            }
        })
    }

    function renderAjaxImg(data, date = '') {
        $('#photos_page').html('');
        ph_num_navcam = 0;
        if (data.photos.length) {

            let ph = data.photos;
            ph_num_all = 0;
            ph_num_large = 0;

            $(curdate).text(date);
            $(next_prev).attr(attr_curdate, date);
            $(next_prev).last().show();

            for (i = 0; i < ph.length; i++) {
                let img = new Image();
                img.src = ph[i].img_src;

                if (drawingMode) {
                    $('#photos_page').append('<canvas class="img_canvas" width="' + canvas_config.get('width') + '" height="' + canvas_config.get('height') + '"></canvas>');
                    let canvas = $('.img_canvas').last()[0],
                        context = canvas.getContext('2d');
                    img.onload = function () {
                        context.drawImage(img, 0, 0, parseInt(canvas_config.get('width')), parseInt(canvas_config.get('height')));
                    };
                } else {
                    img.onload = function () {
                        if (this.width < 1000) {
                            isLargeImg = false;
                        } else {
                            isLargeImg = true;
                            if (showOnlyLargePhotos) {
                                renderPhoto(this.src);
                            }
                            ph_num_large++;
                        }
                        $('.quantity_large').text(ph_num_large);
                    }
                    if (!showOnlyLargePhotos) {
                        renderPhoto(ph[i].img_src);
                    }
                }
                ph_num_all++;
            }
            $('.btn-show-drawing').each(function () {
                $(this).click(function () {
                    $(this).parents('.image-container').find('.card-popup').show();
                })
            })
            $('.btn-close-popup').each(function () {
                $(this).click(function () {
                    $(this).parents('.image-container').find('.card-popup').hide();
                    
                })
            })
            if (drawingMode) {
                $('.img_canvas').each(function () {
                    $(this).mousemove(function (e) {
                        console.log(e);
                        if (e.target) {
                            let x = e.offsetX,
                                y = e.offsetY
                                ;
                            let canvas = $(this)[0],
                                context = canvas.getContext('2d')
                                ;
                            context.fillStyle = "rgba(213,186,131,0.025)";
                            context.fillRect(x + 100, y + 100, 100, 100);
                        }
                    })
                })
            }

            $('.quantity_total').text(ph_num_all);
            $('.quantity_navcam').text(ph_num_navcam);

        } else {
            $(curdate).text(date);
            $('.quantity_total').text('нет');
            $('.quantity_large').text('нет');
            $(next_prev).attr(attr_curdate, date);
            $('#photos_page').html('');
            $(next_prev).last().hide();
        }
    }

    function renderPhoto(img) {
        $('#photos_page').append('<div class="image-container card-deck"><div class="card position-relative"><button type="button" class="btn-show-drawing btn btn-light position-absolute m-0">красить</button><a data-fancybox="gallery" href="' + img + '"><img src="' + img + '" class="photo d-block w-100" alt="..."></a></div><div class="card-popup w-100 h-100 overflow-hidden fixed-top bg-secondary bg-gradient" style="display:none"><div class="card-popup-content rounded-3 shadow-lg bg-white"><div class="btn-close-popup bg-secondary bg-gradient">&#10008;</div><img class="w-100" src="' + img + '" class="photo d-block w-100" alt="..."></div></div>');
    }

    function renderNearestDayPhotos($btn) {
        let currentDate = moment($(next_prev).attr(attr_curdate));
        let numday;
        $btn.hasClass('btn-prev-day') ? numday = -1 : numday = 1
        let nearDate = currentDate.add(numday, 'day').format('YYYY-MM-DD');
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + nearDate + '&api_key=' + api_key,
            success: function (data_near) {
                renderAjaxImg(data_near, nearDate);
            }
        })
    }
});