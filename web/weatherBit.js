/* global fetch */

function fetchWeatherForecast() {
    const API_KEY = '6420831266ff4f2a8b59a134920251d7';
    const address = document.getElementById("addressInput").value; // Replace with your address input field ID
    const days = 7;

    // Fetch geolocation data using the Google Maps Geocoding API
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCdTWLRnEqSanEynmJ5aPujswtCXOpTQbc`)
            .then(response => response.json())
            .then(data => {
                // Extract latitude and longitude from the geolocation data
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;

                // Fetch weather forecast using the Weatherbit API based on latitude and longitude
                fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${API_KEY}&days=${days}`)
                        .then(response => response.json())
                        .then(data => {
                            const forecastBody = document.getElementById('weatherForecast');
                            forecastBody.innerHTML = '';

                            const dateRow = document.createElement('tr');
                            const temperatureRow = document.createElement('tr');
                            const weatherRow = document.createElement('tr');
                            
                            // ...

                            data.data.forEach(day => {
                                const date = new Date(day.datetime).toLocaleDateString();
                                const temperature = day.temp;
                                const weatherDescription = day.weather.description;
                                
                                const dateElement = document.createElement('td');
                                dateElement.textContent = date;
                                
                                const temperatureElement = document.createElement('td');
                                temperatureElement.textContent = `${temperature}°C`;
                                
                                const weatherElement = document.createElement('td');
                                weatherElement.textContent = `${weatherDescription}`;
                                
                                dateRow.appendChild(dateElement);
                                temperatureRow.appendChild(temperatureElement);
                                weatherRow.appendChild(weatherElement);
                            });
                            forecastBody.appendChild(dateRow);
                            forecastBody.appendChild(temperatureRow);
                            forecastBody.appendChild(weatherRow);
                        })
                        .catch(error => {
                            console.error(error);
                        });
            })
            .catch(error => {
                console.error(error);
            });
}
