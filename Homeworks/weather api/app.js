/*global axios*/
/*global places*/
/* global localStorage */
/* global DOMException */
window.addEventListener("load", function(e){
    
    var cityName = "";
    var url = "";
    var placesAutocomplete = places({
            container: document.querySelector('#city'),
            language: "ro",
            countries:["ro"],
            type: "city",
             aroundLatLngViaIP: false,
            /* templates: {
                value: function(suggestion) {
                return suggestion.name;
                    }
                 }*/
             });
    
    var titleP = document.getElementById("city-name");
    var weatherImg = document.getElementById("weather-img");
    var closeBtn = document.querySelector(".ap-icon-clear");
    
  
    
    document.onkeydown = function(evt) {
            
            if (evt.keyCode == 27) {
            titleP.innerHTML = "";
            weatherImg.setAttribute("src", "");
    }
};
        
    closeBtn.addEventListener("click", function() {
            titleP.innerHTML = "";
            weatherImg.setAttribute("src", "");
    });
    function getWeather() {
                axios.get(url)
                .then(function (response) {
                if(!response.data.response.results) {
                    console.log(response);
                    var city = response.data.current_observation.display_location.city;
                    var state = response.data.current_observation.display_location.state
                    var temperaturaC = response.data.current_observation.feelslike_c;
                    var temperaturaF = response.data.current_observation.feelslike_f;
                    var imgUrl = response.data.current_observation.icon_url;
                    console.log(imgUrl);
                   
                    
                    titleP.innerHTML = `Temperatura in ${city} judetul ${state} este de ${temperaturaC} &#8451;`
                    weatherImg.setAttribute("src", imgUrl);
                    
                    
                    
                } else {
                    console.log("mai multe orase cu acelasi nume");
                    
                    response.data.response.results.forEach(function(city){
                        console.log(city);
                        titleP.innerHTML = "Cautarea a rezultat mai multe orase si inca nu mere :)!"
                    })
                }
                 
                
                    
             })
                .catch(function (error) {
                console.log(error);
                });
        }
    

     
   
        
        

        placesAutocomplete.on("change", function(obj) {
            cityName = obj.suggestion.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
            url = `https://api.wunderground.com/api/f0b34f06d8f8ac82/conditions/q/ro/${cityName}.json`;
            console.log(cityName);
            getWeather();
        });
    
        
});

