function getTimezone() {
    var apiKey = 'ZJK274JCTVA6'; // Replace with your TimezoneDB API key
    var location = document.getElementById("addressInput").value;

    var url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${location}`;

    fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    var timezoneOffset = data.gmtOffset / 60; // Convert offset from seconds to minutes
                    var localTime = new Date();
                    var adjustedTime = new Date(localTime.getTime() + timezoneOffset + 43200 * 60000); // Adjust time using offset

                    var timeOptions = {hour: "numeric", minute: "numeric", hour12: true};
                    var formattedTime = adjustedTime.toLocaleTimeString("en-US", timeOptions);

                    document.getElementById("result").textContent = "Current Time: " + formattedTime;
                } else {
                    document.getElementById("result").textContent = "Error fetching timezone.";
                    console.error('Error fetching timezone:', data.message);
                }
            })
            .catch(error => {
                document.getElementById("result").textContent = "Error fetching timezone.";
                console.error('Error fetching timezone:', error);
            });
}

        function getTimezone1() {
    var address = document.getElementById('addressInput').value;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            var location = results[0].geometry.location;
            var latitude = location.lat();
            var longitude = location.lng();

            // Use the latitude and longitude to fetch the timezone
            fetchTimezone(latitude, longitude);
        }
    });
}

function fetchTimezone(latitude, longitude) {
    var apiKey = 'ZJK274JCTVA6';
    var apiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var timezoneOffset = data.gmtOffset; // Get the timezone offset in seconds
            var currentTime = new Date(); // Get the current time

            // Apply the timezone offset to get the local time
            currentTime.setSeconds(currentTime.getSeconds() + timezoneOffset);

            // Use the local current time as needed
            console.log('Current Time:', currentTime);
            document.getElementById("result").textContent = "Current Time: " + currentTime;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
