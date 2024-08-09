<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>@yield('title')</title>
    <link rel="icon" href="img/core-img/favicon.ico">
    <link rel="stylesheet" href="{{ asset('style.css') }}">
</head>

<body>
    <div className="preloader" id="preloader">
        <div className="spinner-grow text-secondary" role="status">
            <div className="sr-only">Loading...</div>
        </div>
    </div>


    @yield('content')

    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/popper.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/waypoints.min.js') }}"></script>
    <script src="{{ asset('js/jquery.easing.min.js') }}"></script>
    <script src="{{ asset('js/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('js/jquery.animatedheadline.min.js') }}"></script>
    <script src="{{ asset('js/jquery.counterup.min.js') }}"></script>
    <script src="{{ asset('js/wow.min.js') }}"></script>
    <script src="{{ asset('js/date-clock.js') }}"></script>
    <script src="{{ asset('js/dark-mode-switch.js') }}"></script>
    <script src="{{ asset('js/active.js') }}"></script>
</body>

</html>
