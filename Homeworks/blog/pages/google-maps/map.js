/*global google*/
/*global fetch*/
const weatherApiKey = "f0b34f06d8f8ac82";
const apiKey = "AIzaSyAbL1qgqI5jzxyVVcVi51zcbsbOBvLcZBk";
let start, end, startLat, startLng, endLat, endLng, startWeather, endWeather;

function handleErrors(response) {
           if(response.ok) {
               return response.json();
           }
           throw new Error(response.status);
        }

function initMap() {
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let directionsService = new google.maps.DirectionsService;
  
  let map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 9,
                  center: {lat: 44.439663, lng: 26.096306}
                });
  const startInput = document.getElementById("start-location");
  const endInput = document.getElementById("destination-location");

  let autocompleteStart = new google.maps.places.Autocomplete(startInput);
  let autocompleteEnd = new google.maps.places.Autocomplete(endInput);
  autocompleteStart.setComponentRestrictions({'country':["ro"]});
  autocompleteEnd.setComponentRestrictions({'country':["ro"]});
  
  
  const getRouteBtn = document.getElementById("get-route-btn");
  
  getRouteBtn.addEventListener("click", () => {
    onChangeHandler();
  });
  
  
  directionsDisplay.setMap(map);
  
  
  
    autocompleteStart.addListener("place_changed", () => {
      start = autocompleteStart.getPlace().formatted_address;
      startLat = autocompleteStart.getPlace().geometry.location.lat();
      startLng = autocompleteStart.getPlace().geometry.location.lng();
  });
  
  
    autocompleteEnd.addListener("place_changed", () => {
      end = autocompleteEnd.getPlace().formatted_address;
      endLat = autocompleteEnd.getPlace().geometry.location.lat();
      endLng = autocompleteEnd.getPlace().geometry.location.lng();
  });
  
  var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  
          directionsService.route({
          origin: start,
          destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            getWeatherStart();
            getWeatherEnd();
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      
function getWeatherStart() {
  let url = `https://api.wunderground.com/api/f0b34f06d8f8ac82/conditions/q/${startLat},${startLng}.json`
  
  fetch(url, {method:"GET"})
  .then(handleErrors)
  .then((response) => {
    startWeather = response;
    console.log(startWeather);
  })
}

function getWeatherEnd() {
  let url = `https://api.wunderground.com/api/f0b34f06d8f8ac82/conditions/q/${endLat},${endLng}.json`
  
  return fetch(url, {method:"GET"})
  .then(handleErrors)
  .then((response) => {
    endWeather = response;
    console.log(endWeather.current_observation.display_location.city);
    displayWeather(response);
  })
  
}



function displayWeather(obj) {
  let weatherContainer = document.getElementById("weather");
  let weatherTitle = document.createElement("h2");
  weatherTitle.innerHTML = `Temperatura in ${obj.current_observation.display_location.city} este ${obj.current_observation.dewpoint_c} celsius`;
  weatherContainer.appendChild(weatherTitle);
}