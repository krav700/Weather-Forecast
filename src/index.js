import "./styles.css";

async function getWeatherData(city) {
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=L5S7C5P48ERSWGVPQ5B838GE7`);
    console.log(data);
    getJSONData(data);
}

async function getJSONData(data) {
    const jsonData = await data.json();
    console.log(jsonData);
    console.log(jsonData.days[0].tempmax);
    changeTodayWeather(jsonData);
}

function changeTodayWeather(dataJSON) {
    todayDegrees.textContent = `${dataJSON.days[0].temp} ${temperatureZone}`;
    todayWeather.textContent = dataJSON.days[0].conditions;
    todaySentence.textContent = dataJSON.description;

    fetch(`https://api.giphy.com/v1/gifs/random?api_key=KEUGhzQUXgkembqdcvT9ISW6HHRvlCPU&tag=${dataJSON.days[0].conditions}`)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then(function(response) {
                console.log(response);
                console.log(gifImage);
                gifImage.src = response.data.images.original.url;
            })
            .catch(function(error) {
                console.log(error);
                gifImage.style.display = 'none';
            });

// fetch('https://api.giphy.com/v1/gifs/random?api_key=KEUGhzQUXgkembqdcvT9ISW6HHRvlCPU&tag=cats')
}

let temperatureZone = '°C';
const searchBar = document.querySelector('#search-city');
const searchButton = document.querySelector('#search-button');
const todayDegrees = document.querySelector('#today-degrees');
const todayWeather = document.querySelector('#todays-weather');
const todaySentence = document.querySelector('#today-sentence');
const gifImage = document.querySelector('img');

searchBar.addEventListener("blur", () => {
    console.log(searchBar.value);
});

searchButton.addEventListener("click", () => {
    getWeatherData(searchBar.value);
});
