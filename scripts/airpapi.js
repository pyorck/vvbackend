// API TO GET AIRPORT INPUT BOX - TO BOOK AND TO GIFT //

const geonamesUsername = 'pyorck'; // Replace with your Geonames username
let typingTimer; // Timer identifier

// Call this function at the start of your script to load the IATA codes before making any API calls
loadIataCodes();

// Global variable to store the IATA code list
let iataList = [];

// Function to load the IATA codes from a CSV file
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

// General function to handle input for both "TO BOOK" and "TO GIFT"
function handleCityInput(inputId, suggestionsId) {
    const inputElement = document.getElementById(inputId);
    const suggestionsContainer = document.getElementById(suggestionsId);
    
    inputElement.addEventListener('input', function () {
        const cityName = this.value.trim();
    
        // Clear the previous timer
        clearTimeout(typingTimer);
    
        // Set a new timer
        typingTimer = setTimeout(() => {
            if (cityName.length > 1) {
                console.log('Fetching coordinates for:', cityName);
                fetchCityCoordinates(cityName, suggestionsContainer);
            } else {
                suggestionsContainer.style.display = 'none';
            }
        }, 350); // Wait for 0.35 seconds after user stops typing
    });
}

// Initialize listeners for both forms
handleCityInput('city-input', 'suggestions'); // For "TO BOOK"
handleCityInput('city-input1', 'suggestions1'); // For "TO GIFT"

// Fetch city coordinates from Geonames API
function fetchCityCoordinates(cityName, suggestionsContainer) {
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
                fetchNearbyAirports(lat, lng, suggestionsContainer);
            } else {
                suggestionsContainer.style.display = 'none'; // Hide suggestions if no city found
            }
        });
}

// Fetch nearby airports with Geonames API
function fetchNearbyAirports(lat, lon, suggestionsContainer) {
    const nearbyAirportsUrl = `https://secure.geonames.org/findNearbyJSON?lat=${lat}&lng=${lon}&radius=200&username=${geonamesUsername}&featureCode=AIRP&style=FULL&maxRows=100`;

    fetch(nearbyAirportsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching airports');
            }
            return response.json();
        })
        .then(data => {
            console.log('Geonames response for airports:', data);

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

// Event listener for selecting airport suggestions
function handleSuggestionsClick(suggestionsId, inputId) {
    document.getElementById(suggestionsId).addEventListener('click', function (event) {
        if (event.target.classList.contains('dropdown-item')) {
            const selectedAirport = event.target.textContent.trim();
            document.getElementById(inputId).value = selectedAirport; // Update input with selected airport
            
            // Clear selected class from all items
            const allItems = document.querySelectorAll(`#${suggestionsId} .dropdown-item`);
            allItems.forEach(item => item.classList.remove('selected'));

            // Add selected class to the clicked item
            event.target.classList.add('selected');

            document.getElementById(suggestionsId).style.display = 'none'; // Hide suggestions
        }
    });
}

// Attach listeners for "TO BOOK" and "TO GIFT"
handleSuggestionsClick('suggestions', 'city-input'); // For "TO BOOK"
handleSuggestionsClick('suggestions1', 'city-input1'); // For "TO GIFT"
