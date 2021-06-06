
var gposs = [];
function initMapPage() {
    gposs = loadFromStorage('myPos');
}
function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);

}

function showLocation(position) {

    initMap(position.coords.latitude, position.coords.longitude, 16, 'my pos');
}


function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}
function renderMyPos(map) {
    var positions = loadFromStorage('myPos');
    var strHtml = ''
    var markers = []
    var marker;
    positions.forEach(pos => {
        // strHtml += `<li onclick="initMap(${pos.lat},${pos.lng},16,'${pos.name}')">${pos.name}</li>`
        strHtml += `<div class="card col _card" onclick="initMap(${pos.lat},${pos.lng},16,'${pos.name}')">
        <div class="card-body">
        ${pos.name}
        </div>
      </div>`
        marker = new google.maps.Marker({
            position: { lat: pos.lat, lng: pos.lng },
            map,
            title: pos.name
        });
        markers.push(marker);
    });

    var elMain = document.querySelector('main');
    elMain.innerHTML = strHtml
}

function initMap(lat, lng, zoom, markerTitle) {

    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: zoom
    };

    var map = new google.maps.Map(
        elMap,
        options
    );
    renderMyPos(map)
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: markerTitle
    });
    map.setCenter(new google.maps.LatLng(lat, lng));
    google.maps.event.addListener(map, 'click', function (event) {
        mapZoom = map.zoom;
        startLocation = event.latLng;
        // map.setCenter(new google.maps.LatLng( startLocation.lat(), startLocation.lng()));
        var posName = prompt(' enter location name')
        var marker = new google.maps.Marker({
            position: { lat: startLocation.lat(), lng: startLocation.lng() },
            map,
            title: posName
        });
        gposs.push({ id: 123, lat: startLocation.lat(), lng: startLocation.lng(), name: posName });
        saveToStorage('myPos', gposs)
        renderMyPos(map)
        setTimeout(placeMarker, 600);
    });
}

function mapReady() {
    console.log('Map is ready');
}



function placeMarker() {
    if (mapZoom == map.zoom) {
        new google.maps.Marker({ position: location, map: map });
    }
}