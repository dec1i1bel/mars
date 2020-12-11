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
    <script src="scripts.js"></script>
    <link rel="stylesheet" href="libs/bootstrap-4.5.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="libs/fancybox3/dist/jquery.fancybox.min.css">
    <link rel="stylesheet" href="styles.css">

</head>

<body>
    <div class="container">
       
        <h1 class="rover-name">Марсоход: <span class="value"></span></h1>
        <h3 class="rover-sol">Суток пребывания на планете: <span class="value"></span></h3>
        <h3 class="rover-photos-number">Итого снято фотографий: <span class="value"></span></h3>
        <p></p>
        <h2 class="rover-photos-title">Фото за <span class="value date"></span> (всего: <span class="value quantity_total"></span>, больших: <span class="value quantity_large"></span>)
        </h2>
        <p>
        <h4>Фильтры</h4>
        </p>
        <div id="filters" class="js-filters">
            <div class="js-only-large">
                <input type="checkbox" name="only-large">
                <label class="form-check-label" for="only-large-photos">Только большие фото</label>
            </div>
        </div>
        <div class="btns_next-prev-date row justify-content-center" current_date="">
            <button class="btn-prev-day btn btn-outline-success">Назад</button>
            <div class="mx-2 py-3">на 1 день</div>
            <button class="btn-next-day btn btn-outline-success">Вперёд</button>
        </div>
<!--        <div id="photos__page" class="row row-cols-2 row-cols-md-3 row-cols-lg-4 justify-content-center"></div>-->
        <div id="photos__page"></div>
        <div class="btns_next-prev-date row justify-content-center">
            <button class="btn-prev-day btn btn-outline-success">Назад</button>
            <div class="mx-2 py-3">на 1 день</div>
            <button class="btn-next-day btn btn-outline-success">Вперёд</button>
        </div>
    </div>
</body>

</html>