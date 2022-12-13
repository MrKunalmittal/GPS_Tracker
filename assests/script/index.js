/*--------------------------------------------------------------------------------
    
    Map-Provider
    Kunal Mittal

-----------------------------------------------------------------------------------*/
'use strict';
function select (selector, parent = document){
    return parent.querySelector(selector);

}
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Listening to the resize event
window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const overlay = select('.overlay');
const loading = select('.loading');

mapboxgl.accessToken = 'pk.eyJ1Ijoia3VuYWxtaXR0YWwiLCJhIjoiY2xiZ3J2bzEzMGEzejNwbW1idHVrYmt2ayJ9.1JMJDm081dXamlqHXNMYWg';

const map = new mapboxgl.Map({
    container: 'map',
    style:'mapbox://styles/mapbox/streets-v11',
    center: [0,0],
    
    pitch : 40,
    zoom: 16
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.touchZoomRotate.disable();
map.doubleClickZoom.disable();


const marker = new mapboxgl.Marker({
    color:'#3898ff'

});

function getLocation(position) {
    const { altitude, latitude, longitude } = position.coords;

    if(longitude && latitude) {
        map.setCenter([longitude,latitude]);
        marker.setLngLat([longitude,latitude]).addTo(map);
        setTimeout(() => {overlay.style.display = 'none'} ,750);
    }
}

function errorHandler(event) {
    loading.style.animationPlayState = 'paused';
    console.log(event.message);
}

const options = {
    enableHighAccuracy: true,
    maximumAge:0
};
/*
    watchPosition() method is used to register a handler function 
    that will be controlled automatically ech time the position 
    of the device changes
*/

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        getLocation,
        errorHandler,
        options);
} else {
    console.log('Geolocation is not supported by your browser');
}