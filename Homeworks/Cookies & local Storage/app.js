/* global localStorage */
/* global DOMException */
/*global fetch*/
window.onload = function() {
    // setting a cookie
    // document.cookie = "language=ro-RO";
    
    // reading cookies
    const cookies = getCookies();
    const localStorageAvailable = storageAvailable('localStorage');
    const radios = document.getElementsByName('language');
    const preferredLanguage = localStorageAvailable ? localStorage.getItem("language") : cookies.language;
    const textResult = document.getElementById("result");
    class Weather{
    constructor() {
    this.url = 'https://api.wunderground.com/api/f0b34f06d8f8ac82/conditions/q/CA/San_Francisco.json';
    }
    
    handleErrors (response)  {
           if(response.ok) {
               return response.json();
           }
           throw new Error(response.status);
        };
        
    getWeather(id) {
        return fetch(`${this.url}`, {method:"GET"})
        .then(this.handleErrors)
        .then((response) => {
            
            this.celsius = response.current_observation.feelslike_c;
            this.fahrenheit = response.current_observation.feelslike_f;
        })
        .catch(function(error) {
            console.log("Big error",error);
        });
    }
    
    
}
    
    const weather = new Weather();
    const getWeather = weather.getWeather();
    
    getWeather.then((response) => {
        console.log(weather);
        radios.forEach(function(radio) {
            if (radio.value == preferredLanguage) {
                radio.checked = "checked";
            }
            localStorage.getItem("language") === 'en-US'?
                        textResult.innerHTML=`Temperatura este de ${weather.fahrenheit}F`
                    :
                        textResult.innerHTML=`Temperatura este de ${weather.celsius}C`;
                    
            
            radio.addEventListener('click', function() {
                if (localStorageAvailable) {
                    localStorage.setItem("language", radio.value);
                    if(localStorage.getItem("language") === 'en-US'){
                        textResult.innerHTML=`Temperatura este de ${weather.fahrenheit}F`;
                    }else{
                        textResult.innerHTML=`Temperatura este de ${weather.celsius}C`;
                    }
                }
                else {
                    document.cookie = "language=" + radio.value;
                }
            });
        });
    });
    
    
};



function getCookies() {
    let cookiesString = document.cookie;
    console.log('cookies', cookiesString);
    
    const cookiesArray = cookiesString.split("; ");
    
    let cookies = {};
    cookiesArray.forEach(function(c) {
       let cookie = c.split("=");
       //console.log(cookie);
       // console.log('value', cookie[1]);
       cookies[cookie[0]] = cookie[1];
    });
    return cookies;
}

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

