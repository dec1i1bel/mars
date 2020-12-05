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
        isLargeImg = true,
        ph_num_all = 0,
        ph_num_large = 0,
        api_key = 'tHmV7JS4rx9Jm4uXHtMs9rEbCvQOCLSfnjPus886'
    ;
	
	setTestCanvas();
	
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover + '?api_key='+api_key,
        success: function (data) {
            console.log(data.photo_manifest);
            let max_date = data.photo_manifest.max_date;

            // шапка - общая статистика
            $('.rover-sol > .value').text(data.photo_manifest.max_sol);
            $(cl_ph_num).text(data.photo_manifest.total_photos);
            $(curdate).text(max_date);
            $(next_prev).attr(attr_curdate, max_date)

            //последний день, за который есть фотографии
            $.ajax({
                url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + max_date + '&api_key='+api_key,
                success: function (data_latest) {
                    renderAjaxImg(data_latest, max_date);
                }
            });
        }
    });

    // клик по кнопке предыдущего / следующего дня
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

    $('.js-only-large').find('input[name="only-large"]').click(function() {
        let activeDateTmpst = moment($(next_prev).attr(attr_curdate));
        let activeDate = activeDateTmpst.format('YYYY-MM-DD');
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + activeDate + '&api_key='+api_key,
            success: function (data_near) {
                renderAjaxImg(data_near, activeDate);
            }
        })
    })

    $('.rover-name > .value').text(roverName);

    $('.js-only-large').click(function () {
        if ($(this).find('input[name="only-large"]').is(':checked')) {
            showOnlyLargePhotos = true;
        } else {
            showOnlyLargePhotos = false;
        }
    })

    function renderAjaxImg(data, date = '') {
        $('#photos__page').html('');
        if (data.photos.length) {

            let ph = data.photos;
            ph_num_all = 0;
            ph_num_large = 0;

            $(curdate).text(date);
            $(next_prev).attr(attr_curdate, date);
            $(next_prev).last().show();

            console.log('showOnlyLargePhotos');
            console.log(showOnlyLargePhotos);

            for (let i = 0; i < ph.length; i++) {

                img = new Image();
                img.src = ph[i].img_src;
                img.onload = function () {
                    if (this.width < 1000) {
                        isLargeImg = false;
                    } else {
                        console.log('isLargeImg = true');
                        isLargeImg = true;
                        if(showOnlyLargePhotos) {
                            appendPhoto(i, ph[i].img_src);
                        }
                        ph_num_large++;
                    }
                        $('.quantity_large').text(ph_num_large);
                }
                if (!showOnlyLargePhotos) {
                    appendPhoto(i, ph[i].img_src);
                }

                ph_num_all++;
            }
            $('.quantity_total').text(ph_num_all);
        } else {
            $(curdate).text(date);
            $('.quantity_total').text('нет');
            $('.quantity_large').text('нет');
            $(next_prev).attr(attr_curdate, date);
            $('#photos__page').html('');
            $(next_prev).last().hide();
        }
    }

    function appendPhoto(i,img) {
        $('#photos__page').append('<div class="card-deck"><div class="card"><a data-fancybox="gallery" href="' + img + '"><img src="' + img + '" class="photo d-block w-100" alt="..."></a><!--<div class="card-body"><select name="photo_' + i + '" class="form-control form-control-sm"><option value="novalue">---</option><option value="landscape">ландшафт</option><option value="rover">марсоход</option></select></div>--></div></div>');
    }
    

    function renderNearestDayPhotos($btn) {
        let currentDate = moment($(next_prev).attr(attr_curdate));
        let numday;
        $btn.hasClass('btn-prev-day') ? numday = -1 : numday = 1
        let nearDate = currentDate.add(numday, 'day').format('YYYY-MM-DD');
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?earth_date=' + nearDate + '&api_key='+api_key,
            success: function (data_near) {
                renderAjaxImg(data_near, nearDate);
            }
        })
    }
	
	var canvas, context;
	
	$('#test-canvas').mousemove(function(e) {
		paintCanvas(e);
	})
	
	$('#test-canvas').click(function(e) {
		pickTestColor(e);
	});
	
	function paintCanvas(e) {
		let x = e.offsetX,
			y = e.offsetY
		;
		context.fillRect(x,y,5,5);
	}
	
	function setTestCanvas() {
		let img = new Image();
		img.src = 'img/test.jpg';
		canvas = $('#test-canvas')[0];
		context = canvas.getContext('2d');
		img.onload = function() {
			context.drawImage(img,0,0);
		};
	}
	
	function pickTestColor(e) {
		let x = e.offsetX,
			y = e.offsetY
		;
		let pixel = context.getImageData(x,y,1,1),
			data = pixel.data
		;
		console.log(data);
	}
});