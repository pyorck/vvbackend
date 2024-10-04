document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const options = dropdown.querySelector('.dropdown-options');
    const selectedItem = button.querySelector('.selected-item');
    const placeholder = button.querySelector('.dropdown-placeholder');

    // Toggle dropdown open/close
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from propagating and closing immediately
        const isOpen = options.style.display === 'block';
        closeAllDropdowns(); // Close any other open dropdowns
        if (!isOpen) {
            options.style.display = 'block';
        }
    });

    // Handle selecting an item
    options.addEventListener('click', (event) => {
        const selectedOption = event.target.closest('.dropdown-item');
        if (selectedOption) {
            const value = selectedOption.dataset.value;

            // Prepare the displayed selected item
            let selectedContent = selectedOption.innerHTML; // Use the HTML of the selected option directly

            // Update the displayed selected item
            selectedItem.innerHTML = selectedContent;
            selectedItem.style.display = 'inline'; // Ensure selected item is visible
            placeholder.style.display = 'inline'; // Hide placeholder after selection

            // Close the dropdown
            options.style.display = 'none';

            // Optionally do something with the selected value, like store it
            console.log('Selected value:', value);
        }
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    closeAllDropdowns();
});

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-options').forEach(option => {
        option.style.display = 'none';
    });
}



// API TO GET AIRPORT

const geonamesUsername = 'pyorck'; // Replace with your Geonames username

// Listen for input changes in the city input field
document.getElementById('city-input').addEventListener('input', function () {
    const cityName = this.value.trim();

    if (cityName.length > 2) {
        console.log('Fetching coordinates for:', cityName);
        fetchCityCoordinates(cityName);
    } else {
        document.getElementById('suggestions').style.display = 'none';
    }
});

// Fetch city coordinates from Geonames API
function fetchCityCoordinates(cityName) {
    const geonamesUrl = `https://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geonamesUsername}`;

    fetch(geonamesUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log('Geonames response:', data); // Log the entire response
            if (data.geonames && data.geonames.length > 0) {
                const { lat, lng } = data.geonames[0];
                console.log(`Coordinates for ${cityName}:`, lat, lng);
                fetchNearbyAirports(lat, lng);
            } else {
                alert('No results found for the city');
            }
        })
        .catch(err => {
            console.error('Error fetching city coordinates:', err);
            alert('City not found or API request failed');
        });
}

// Fetch nearby airports using Geonames API
function fetchNearbyAirports(lat, lon) {
    const nearbyAirportsUrl = `https://api.geonames.org/findNearbyAirportsJSON?lat=${lat}&lng=${lon}&username=${geonamesUsername}`;

    fetch(nearbyAirportsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching airports');
            }
            return response.json();
        })
        .then(data => {
            console.log('Nearby airports response:', data); // Log the entire response
            const suggestionsContainer = document.getElementById('suggestions');
            suggestionsContainer.innerHTML = ''; // Clear previous suggestions

            // Loop through airports and display suggestions
            if (data.airports && data.airports.length > 0) {
                data.airports.forEach(airport => {
                    const airportItem = document.createElement('div');
                    airportItem.classList.add('dropdown-item');
                    airportItem.innerHTML = `<strong>${airport.iata}</strong> ${airport.name}`;
                    suggestionsContainer.appendChild(airportItem);
                });

                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none'; // Hide if no airports found
                alert('No nearby airports found');
            }
        })
        .catch(err => {
            console.error('Error fetching nearby airports:', err);
            alert('Error fetching airports or no nearby airports found');
        });
}

// Handle clicking on a suggestion
document.getElementById('suggestions').addEventListener('click', function (event) {
    if (event.target.classList.contains('dropdown-item')) {
        const selectedAirport = event.target.textContent.trim();
        document.getElementById('city-input').value = selectedAirport; // Update input with selected airport
        document.getElementById('suggestions').style.display = 'none'; // Hide suggestions
    }
});