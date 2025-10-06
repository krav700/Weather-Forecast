import "./styles.css";
import searchPNG from "./images/search.svg";

const newImg = document.createElement('img');
newImg.src = searchPNG;
newImg.classList.add('searchImg');

async function getWeatherData(city) {
    document.body.style.cursor = 'wait';
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=L5S7C5P48ERSWGVPQ5B838GE7`);
    getJSONData(data);
}

async function getJSONData(data) {
    const jsonData = await data.json();
    changeTodayWeather(jsonData);
}

function changeTodayWeather(dataJSON) {
    if (localStorage.getItem("cityInfo")) {
        nameOfCity.textContent = localStorage.getItem("cityInfo");
    }
    todayDegrees.textContent = `${dataJSON.days[0].temp} ${temperatureZone} ${getConditionEmoji(dataJSON.days[0].conditions)}`;
    todayWeather.textContent = dataJSON.days[0].conditions;
    todaySentence.textContent = dataJSON.days[0].description;
    todayDate.textContent = dataJSON.days[0].datetime;

    fetch(`https://api.giphy.com/v1/gifs/random?api_key=KEUGhzQUXgkembqdcvT9ISW6HHRvlCPU&tag=${dataJSON.days[0].conditions}`)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then(function(response) {
                gifImage.src = response.data.images.original.url;
                document.body.style.cursor = 'default';
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

function getConditionEmoji(condition) {
    if (condition.includes('Sunny') || condition.includes('Clear') || condition == 'Partially cloudy') {
        return '☀️';
    } else if (condition.includes('cloudy') || condition.includes('Clear') || condition == 'Cloudy' || condition == 'Overcast') {
        return '🌤️';
    } else if (condition.includes('Rain') || condition.includes('rain') || condition == 'Cloudy' || condition == 'Showers' || condition == 'Drizzle') {
        return '🌧️';
    } else if (condition.includes('Thunderstorm')) {
        return '⛈️';
    } else if (condition.includes('Snow') || condition.includes('snow') || condition == 'Freezing' || condition == 'Sleet' || condition == 'Ice') {
        return '🌨️';
    } else if (condition.includes('Fog') || condition == 'Mist' || condition == 'Haze' || condition == 'Windy' || condition == 'Blowing snow' || condition == 'Blustery') {
        return '💨';
    } else if (condition == 'Rain and snow' || condition == 'Snow and fog' || condition == 'Light rain and snow' || condition == 'Drizzle and fog') {
        return '🌪️';
    }
}

function changeFollowingDays(dataJSON) {
    nextDay1.textContent = getNamedDay(dataJSON.days[1].datetime);
    nextDayTemp1.textContent = `${dataJSON.days[1].temp} ${temperatureZone} ${getConditionEmoji(dataJSON.days[1].conditions)}`;
    nextDayCondition1.textContent = dataJSON.days[1].conditions;
    nextDate1.textContent = dataJSON.days[1].datetime;

    nextDay2.textContent = getNamedDay(dataJSON.days[2].datetime);
    nextDayTemp2.textContent = `${dataJSON.days[2].temp} ${temperatureZone} ${getConditionEmoji(dataJSON.days[2].conditions)}`;
    nextDayCondition2.textContent = dataJSON.days[2].conditions;
    nextDate2.textContent = dataJSON.days[2].datetime;

    nextDay3.textContent = getNamedDay(dataJSON.days[3].datetime);
    nextDayTemp3.textContent = `${dataJSON.days[3].temp} ${temperatureZone} ${getConditionEmoji(dataJSON.days[3].conditions)}`;
    nextDayCondition3.textContent = dataJSON.days[3].conditions;
    nextDate3.textContent = dataJSON.days[3].datetime;

    nextDay4.textContent = getNamedDay(dataJSON.days[4].datetime);
    nextDayTemp4.textContent = `${dataJSON.days[4].temp} ${temperatureZone} ${getConditionEmoji(dataJSON.days[4].conditions)}`;
    nextDayCondition4.textContent = dataJSON.days[4].conditions;
    nextDate4.textContent = dataJSON.days[4].datetime;

    nextDay5.textContent = getNamedDay(dataJSON.days[5].datetime);
    nextDayTemp5.textContent = `${dataJSON.days[5].temp} ${temperatureZone} ${getConditionEmoji(dataJSON.days[5].conditions)}`;
    nextDayCondition5.textContent = dataJSON.days[5].conditions;
    nextDate5.textContent = dataJSON.days[5].datetime;
}

let temperatureZone = '°C';
const nameOfCity = document.querySelector('#name-of-city');
const searchBar = document.querySelector('#search-city');
const searchButton = document.querySelector('#search-button');
const todayDegrees = document.querySelector('#today-degrees');
const todayWeather = document.querySelector('#todays-weather');
const todaySentence = document.querySelector('#today-sentence');
const gifImage = document.querySelector('img');

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

const todayDate = document.querySelector('#todays-date');
const nextDate1 = document.querySelector('#nextday-date1');
const nextDate2 = document.querySelector('#nextday-date2');
const nextDate3 = document.querySelector('#nextday-date3');
const nextDate4 = document.querySelector('#nextday-date4');
const nextDate5 = document.querySelector('#nextday-date5');

searchButton.appendChild(newImg);

searchButton.addEventListener("click", () => {
    getWeatherData(searchBar.value);
    localStorage.setItem("cityInfo", searchBar.value);
});

getWeatherData('New York');

if (localStorage.getItem("cityInfo")) {
    getWeatherData(localStorage.getItem("cityInfo"));
}