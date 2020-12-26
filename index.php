<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mars</title>
    <script src="libs/jquery-3.5.1.min.js"></script>
    <script src="libs/bootstrap-4.5.3-dist/js/bootstrap.bundle.min.js"></script>
    <script src="libs/fancybox3/dist/jquery.fancybox.min.js"></script>
    <script src="libs/moment.min.js"></script>
    <script src="libs/jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="https://kit.fontawesome.com/689a977d1f.js" crossorigin="anonymous"></script>
    <script src="scripts.js?v=4545"></script>
    <link rel="stylesheet" href="libs/bootstrap-4.5.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="libs/fancybox3/dist/jquery.fancybox.min.css">
    <link rel="stylesheet" href="libs/jquery-ui-1.12.1/jquery-ui.css">
    <link rel="stylesheet" href="styles.css?v=787">
</head>

<body>
   
    <div class="container">
        <h1 class="rover-name">Марсоход: <span class="value"></span></h1>
        <h3 class="rover-launch_date">Дата отправки с Земли: <span class="value"></span></h3>
        <h3 class="rover-landing_date">Дата приземления на Марсе: <span class="value"></span></h3>
        <h3 class="rover-sol">Марсианских суток пребывания на планете: <span class="value"></span></h3>
        <h3 class="rover-photos-number">Итого снято фотографий: <span class="value"></span></h3>
        <p></p>
        <h2 class="rover-photos-title"> Фото за <span class="value date"></span>
        </h2>
        <div class="choose-date">Выбрать дату: <input type="text" id="datepicker"></span> <button type="button" class="send-date btn btn-success btn-sm">показать</button>
        <div class="btns_next-prev-date row justify-content-center" current_date="">
            <button class="btn-prev-day btn btn-outline-success">Назад</button>
            <div class="mx-2 py-3">на 1 день</div>
            <button class="btn-next-day btn btn-outline-success">Вперёд</button>
            <div class="hide-btn" style="display: none;"></div>
        </div>
        <div id="photos_page" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 justify-content-center">
        </div>
        <div class="btns_next-prev-date row justify-content-center">
            <button class="btn-prev-day btn btn-outline-success">Назад</button>
            <div class="mx-2 py-3">на 1 день</div>
            <button class="btn-next-day btn btn-outline-success">Вперёд</button>
            <div class="hide-btn" style="display: none;"></div>
        </div>
    </div>
</body>

</html>