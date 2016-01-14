var app = angular.module("location")

app.service("GeoLocation", function () {

    window.navigator = window.navigator || {};
    window.navigator.geolocation = window.navigator.geolocation ||
        undefined;
    if (navigator.geolocation === undefined) {
        document.getElementById('g-unsupported').classList.remove('hidden');
            ['button-get-position'].forEach(function (elementId) {
            document.getElementById(elementId).setAttribute('disabled', 'disabled');
        });
    } else {
        var log = document.getElementById('log');
        var watchId = null;
        var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10 * 1000, // 10 seconds
            maximumAge: 30 * 1000 // 30 seconds
        };

        function success(position) {
            document.getElementById('latitude').innerHTML = position.coords.latitude;
            document.getElementById('longitude').innerHTML = position.coords.longitude;
            document.getElementById('position-accuracy').innerHTML = position.coords.accuracy;

            document.getElementById('altitude').innerHTML = position.coords.altitude ? position.coords.altitude : '';
            document.getElementById('altitude-accuracy').innerHTML = position.coords.altitudeAccuracy ?
                position.coords.altitudeAccuracy : '';

        }

        function error(positionError) {
            console.log(positionError)
        }

        document.getElementById('button-get-position').addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(success, error, positionOptions);
        });

    }


});