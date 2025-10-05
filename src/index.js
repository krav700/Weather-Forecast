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
    nameOfCity.textContent = localStorage.getItem("cityInfo");
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

    changeFollowingDays(dataJSON)
}

function getNamedDay(date) {
    const newDate = new Date(date);

    const dayIndex = newDate.getDay();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dayIndex];

    return dayName;
}

function changeFollowingDays(dataJSON) {
    nextDay1.textContent = getNamedDay(dataJSON.days[1].datetime);
    nextDayTemp1.textContent = `${dataJSON.days[1].temp} ${temperatureZone}`;
    nextDayCondition1.textContent = dataJSON.days[1].conditions;

    nextDay2.textContent = getNamedDay(dataJSON.days[2].datetime);
    nextDayTemp2.textContent = `${dataJSON.days[2].temp} ${temperatureZone}`;
    nextDayCondition2.textContent = dataJSON.days[2].conditions;

    nextDay3.textContent = getNamedDay(dataJSON.days[3].datetime);
    nextDayTemp3.textContent = `${dataJSON.days[3].temp} ${temperatureZone}`;
    nextDayCondition3.textContent = dataJSON.days[3].conditions;

    nextDay4.textContent = getNamedDay(dataJSON.days[4].datetime);
    nextDayTemp4.textContent = `${dataJSON.days[4].temp} ${temperatureZone}`;
    nextDayCondition4.textContent = dataJSON.days[4].conditions;

    nextDay5.textContent = getNamedDay(dataJSON.days[5].datetime);
    nextDayTemp5.textContent = `${dataJSON.days[5].temp} ${temperatureZone}`;
    nextDayCondition5.textContent = dataJSON.days[5].conditions;
}

let temperatureZone = '°C';
const nameOfCity = document.querySelector('#name-of-city');
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
    localStorage.setItem("cityInfo", searchBar.value);
});

const nextDay1 = document.querySelector('#next-day1');
const nextDay2 = document.querySelector('#next-day2');
const nextDay3 = document.querySelector('#next-day3');
const nextDay4 = document.querySelector('#next-day4');
const nextDay5 = document.querySelector('#next-day5');

const nextDayTemp1 = document.querySelector('#next-day-degrees1');
const nextDayTemp2 = document.querySelector('#next-day-degrees2');
const nextDayTemp3 = document.querySelector('#next-day-degrees3');
const nextDayTemp4 = document.querySelector('#next-day-degrees4');
const nextDayTemp5 = document.querySelector('#next-day-degrees5');

const nextDayCondition1 = document.querySelector('#next-day-condition1');
const nextDayCondition2 = document.querySelector('#next-day-condition2');
const nextDayCondition3 = document.querySelector('#next-day-condition3');
const nextDayCondition4 = document.querySelector('#next-day-condition4');
const nextDayCondition5 = document.querySelector('#next-day-condition5');

// getWeatherData(New York);

if (localStorage.getItem("cityInfo")) {
    getWeatherData(localStorage.getItem("cityInfo"));
}