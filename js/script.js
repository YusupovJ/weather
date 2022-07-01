const API = "67ba5cea50e1ced8703a07d3af05eba2";

const weather = document.querySelector("#weather");
const input = document.querySelector(".weather__input");
const body = document.querySelector(".weather__body");
const button = document.querySelector(".weather__button");

window.onload = (e) => {
	let inputValue = "";

	input.addEventListener("input", (e) => {
		inputValue = e.target.value;
	});

	async function getWeather(city = "USA") {
		let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API}`;

		const request = await fetch(url);
		const response = await request.json();

		let { main, name, weather } = response;
		let weatherInfo = {
			temp: Math.round(main.temp),
			feelsLike: Math.round(main.feels_like),
			name,
			weather: weather[0].description,
			weatherIcon: weather[0].icon,
		};

		return weatherInfo;
	}

	function buildTemplate(city) {
		let info = getWeather(inputValue || city);

		info.then((weatherInfo) => {
			let template = `
                    <h1 class="weather__tilte">${weatherInfo?.name}</h1>
                    <p class="weather__subtitle">${weatherInfo?.temp}<sup>o</sup>C</p>
                    <h2 class="weather__tilte">${weatherInfo?.weather}</h2>
                    <p class="weather__subtitle">
                        Feels like: ${weatherInfo?.feelsLike}<sup>o</sup>C
                    </p>
                    <img
                        class="weather__icon"
                        src="https://openweathermap.org/img/w/${weatherInfo?.weatherIcon}.png"
                        alt="${weatherInfo?.weather}"
                    />
                    `;

			body.innerHTML = template;
		});
	}

	button.addEventListener("click", buildTemplate);

	buildTemplate("Urgench");
};
