<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mars</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
    <link rel="stylesheet" href="libs/jquery-ui-1.12.1/jquery-ui.css">
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
    <script src="libs/moment.min.js"></script>
    <script src="libs/jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="https://kit.fontawesome.com/689a977d1f.js" crossorigin="anonymous"></script>
    <script src="scripts.js"></script>
</head>

<body>
    <div class="container">
        <h1 class="rover-name">Марсоход: <span class="value"></span></h1>
        <h3 class="rover-sol">Суток пребывания на планете: <span class="value"></span></h3>
        <h3 class="rover-photos-number">Итого снято фотографий: <span class="value"></span></h3>
        <p></p>
        <h2 class="rover-photos-title"> Фото за <span class="value date"></span>
        </h2>
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