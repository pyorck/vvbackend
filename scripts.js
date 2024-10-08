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



// API TO GET AIRPORT INPUT BOX // // API TO GET AIRPORT INPUT BOX //
// API TO GET AIRPORT INPUT BOX // // API TO GET AIRPORT INPUT BOX //
// API TO GET AIRPORT INPUT BOX // // API TO GET AIRPORT INPUT BOX //

const geonamesUsername = 'pyorck'; // Replace with your Geonames username
let typingTimer; // Timer identifier

// Listen for input changes in the city input field
document.getElementById('city-input').addEventListener('input', function () {
    const cityName = this.value.trim();

    // Clear the previous timer
    clearTimeout(typingTimer);

    // Set a new timer
    typingTimer = setTimeout(() => {
        if (cityName.length > 1) {
            console.log('Fetching coordinates for:', cityName);
            fetchCityCoordinates(cityName);
        } else {
            document.getElementById('suggestions').style.display = 'none';
        }
    }, 350); // Wait for 0.5 seconds after user stops typing
});

// Fetch city coordinates from Geonames API
function fetchCityCoordinates(cityName) {
    const geonamesUrl = `https://secure.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geonamesUsername}`;

    fetch(geonamesUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log('Geonames response:', data);
            if (data.geonames && data.geonames.length > 0) {
                const { lat, lng } = data.geonames[0];
                console.log(`Coordinates for ${cityName}:`, lat, lng);
                fetchNearbyAirports(lat, lng);
            } else {
            }
        });
}

// Call this function at the start of your script to load the IATA codes before making any API calls
loadIataCodes();

// Global variable to store the IATA code list
let iataList = [];

// Function to load the IATA codes from a JSON file (replace 'path/to/your/iataList.json' with the actual file path)
function loadIataCodes() {
    fetch('backend/european_iatas_df.csv') // Replace with the actual path to your CSV file
        .then(response => response.text()) // Get the response as text
        .then(data => {
            // Split the CSV data into lines
            const rows = data.split('\n');

            // Iterate over each row and trim whitespace
            rows.forEach(row => {
                const trimmedCode = row.trim(); // Trim any whitespace
                if (trimmedCode) { // Check if the row is not empty
                    iataList.push(trimmedCode); // Add the trimmed IATA code to the list
                }
            });
        })
        .catch(error => console.error('Error loading IATA list:', error));
}

// Fetch nearby airports with Geonames API
function fetchNearbyAirports(lat, lon) {
    const nearbyAirportsUrl = `https://secure.geonames.org/findNearbyJSON?lat=${lat}&lng=${lon}&radius=100&username=${geonamesUsername}&featureCode=AIRP&style=FULL&maxRows=100`;

    fetch(nearbyAirportsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching airports');
            }
            return response.json();
        })
        .then(data => {
            console.log('Geonames response for airports:', data);

            const suggestionsContainer = document.getElementById('suggestions');
            suggestionsContainer.innerHTML = ''; // Clear previous suggestions

            if (data.geonames && data.geonames.length > 0) {
                data.geonames.forEach(airport => {
                    // Check if airport has an IATA code in alternateNames
                    if (airport.alternateNames && airport.alternateNames.some(name => name.lang === 'iata')) {
                        // Find the IATA code
                        const iataCode = airport.alternateNames.find(name => name.lang === 'iata').name;

                        // Only add airport if the IATA code is in the iataList
                        if (iataList.includes(iataCode)) {
                            const airportItem = document.createElement('div');
                            airportItem.classList.add('dropdown-item');
                            airportItem.innerHTML = `${airport.name} (${iataCode})`;
                            suggestionsContainer.appendChild(airportItem);
                        }
                    }
                });

                if (suggestionsContainer.childElementCount > 0) {
                    suggestionsContainer.style.display = 'block'; // Show suggestions
                } else {
                    suggestionsContainer.style.display = 'none'; // Hide if no valid airports found
                }
            } else {
                suggestionsContainer.style.display = 'none'; // Hide if no airports found
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('suggestions').addEventListener('click', function (event) {
    if (event.target.classList.contains('dropdown-item')) {
        const selectedAirport = event.target.textContent.trim();
        document.getElementById('city-input').value = selectedAirport; // Update input with selected airport
        
        // Clear selected class from all items
        const allItems = document.querySelectorAll('.dropdown-item');
        allItems.forEach(item => item.classList.remove('selected'));

        // Add selected class to the clicked item
        event.target.classList.add('selected');

        document.getElementById('suggestions').style.display = 'none'; // Hide suggestions
    }
});

