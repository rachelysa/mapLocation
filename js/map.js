
var gPoss = [];
var gMap;
var gNextId = 101;
var gMyLocationMarker;
function initMapPage() {
    gPoss = loadFromStorage('myPos') || [];
}
function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    // var isFound = gPoss.some(poss => (poss.lat === lat && poss.lng === lng))

    gMap.setCenter({ lat, lng })
    gMyLocationMarker.setMap(null)
    gMyLocationMarker=new google.maps.Marker({
        position: { lat, lng },
        map: gMap
    });
    // gMyLocationMarker
    // gPoss.push({ id: gNextId++, lat, lng, name: 'My Location' });
    // initMap(position.coords.latitude, position.coords.longitude, 16, 'my pos');
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
    var positions = loadFromStorage('myPos') || [];
    var strHtml = ''
    var markers = []
    var marker;
    positions.forEach(pos => {
        // strHtml += `<li onclick="initMap(${pos.lat},${pos.lng},16,'${pos.name}')">${pos.name}</li>`
        strHtml += `<div class="card col _card" onclick="goTo(${pos.lat},${pos.lng},12)">
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

function goTo(lat, lng, zoom) {
    gMap.setCenter({ lat, lng })
    gMap.setZoom(zoom)
}

function initMap() {
    var lat = 29.551242185257177
    var lng = 34.9431130396543
    var elMap = document.getElementById('map');
    var options = {
        center: { lat, lng },
        zoom: 12
    };

    gMap = new google.maps.Map(
        elMap,
        options
    );
    console.log('gMap:', gMap)
    renderMyPos(gMap)
    new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: 'Eilat'
    });
    gMap.setCenter(new google.maps.LatLng(lat, lng));
    gMap.addListener('click', addPlace)
}

function addPlace(event) {
    console.log('event:', event)
    mapZoom = gMap.zoom;
    startLocation = event.latLng;
    // map.setCenter(new google.maps.LatLng( startLocation.lat(), startLocation.lng()));
    var posName = prompt(' enter location name')
    var marker = new google.maps.Marker({
        position: { lat: startLocation.lat(), lng: startLocation.lng() },
        map: gMap,
        title: posName
    });
    gPoss.push({ id: gNextId++, lat: startLocation.lat(), lng: startLocation.lng(), name: posName });
    saveToStorage('myPos', gPoss)
    renderMyPos(gMap)
    // setTimeout(placeMarker, 600);
}

// function mapReady() {
//     console.log('Map is ready');
// }



// function placeMarker() {
//     if (mapZoom == map.zoom) {
//         new google.maps.Marker({ position: location, map: map });
//     }
// }