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

document.addEventListener("DOMContentLoaded", function() {
    const departureInput = document.querySelector('#departure'); // Departure date input
    const returnInput = document.querySelector('#return'); // Return date input
    const cityInput = document.querySelector('#city-input'); // City input
    const dropdownButton = document.querySelector('.dropdown-button'); // Budget dropdown button
    const dropdownItems = document.querySelectorAll('.dropdown-item'); // Budget dropdown items
    const buttonContainer = document.querySelector('.button-container2'); // The button container with the plane

    let citySelected = false;
    let budgetSelected = false;
    let departureSelected = false;
    let returnSelected = false;

    // Initially hide the button container
    buttonContainer.style.display = 'none';

    // Function to check if all required fields are selected
    const checkSelections = function() {
        if (departureSelected && returnSelected && citySelected && budgetSelected) {
            buttonContainer.style.display = 'block'; // Show the button container
            const planeImage = buttonContainer.querySelector('.plane-img');
            if (planeImage) {
                planeImage.style.display = 'inline-block'; // Make the image visible
            } else {
                console.error("Dev: Plane image element not found.");
            }
        } else {
            buttonContainer.style.display = 'none'; // Hide the button container if any field is missing
        }
    };

    // Handle departure date selection
    departureInput.addEventListener('change', function() {
        departureSelected = departureInput.value !== ""; // Check if departure date is selected
        checkSelections();
    });

    // Handle return date selection
    returnInput.addEventListener('change', function() {
        returnSelected = returnInput.value !== ""; // Check if return date is selected
        checkSelections();
    });

    // Handle city input (autocomplete) selection
    cityInput.addEventListener("input", function () {
        citySelected = cityInput.value.trim() !== ""; // Check if city input is not empty
        checkSelections();
    });

    // Handle budget dropdown selection
    dropdownItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedValue = this.textContent.trim();
            dropdownButton.querySelector(".selected-item").textContent = selectedValue;
            budgetSelected = true; // Mark budget as selected
            checkSelections();
        });
    });
});


// API TO GET AIRPORT INPUT BOX // // API TO GET AIRPORT INPUT BOX //
// API TO GET AIRPORT INPUT BOX // // API TO GET AIRPORT INPUT BOX //
// API TO GET AIRPORT INPUT BOX // // API TO GET AIRPORT INPUT BOX //


// Initialize Departure Date Picker
flatpickr("#departure", {
    disableMobile: true,  // Disable mobile-friendly version of flatpickr
    touch: true,          // Enable touch for mobile (though we are disabling the mobile version)
    dateFormat: "d/m/Y",  // Use dd/mm/yyyy format
    minDate: new Date().fp_incr(1),  // Minimum date is tomorrow, disallow today
    maxDate: new Date().fp_incr(12 * 30),  // Limit to 8 months from today (approx. 240 days)
    locale: {
        firstDayOfWeek: 1,  // Set Monday as the first day of the week
    },
    onOpen: function() {
        // Show the overlay when the calendar is opened
        document.querySelector('.overlay').style.display = 'block';
    },
    onClose: function() {
        // Hide the overlay when the calendar is closed
        document.querySelector('.overlay').style.display = 'none';
    },
    onChange: function(selectedDates, dateStr) {
        // Set the minimum date of the return picker to be the day after the departure date
        returnPicker.set('minDate', new Date(selectedDates[0]).fp_incr(1));

        // Disable the departure date in the return picker
        returnPicker.set('disable', [
            function(date) {
                return dateStr === flatpickr.formatDate(date, "d/m/Y");  // Disable the departure date
            }
        ]);

        // Automatically open the return picker when departure date is selected
        returnPicker.open();
    }
});

// Initialize Return Date Picker
var returnPicker = flatpickr("#return", {
    disableMobile: true,  // Disable mobile-friendly version of flatpickr
    touch: true,          // Enable touch for mobile (though we are disabling the mobile version)
    dateFormat: "d/m/Y",  // Use dd/mm/yyyy format
    minDate: new Date().fp_incr(1),  // Minimum date is tomorrow
    maxDate: new Date().fp_incr(8 * 30),  // Limit to 8 months from today (approx. 240 days)
    locale: {
        firstDayOfWeek: 1,  // Set Monday as the first day of the week
    },
    onOpen: function() {
        // Show the overlay when the return calendar is opened
        document.querySelector('.overlay').style.display = 'block';
    },
    onClose: function() {
        // Hide the overlay when the return calendar is closed
        document.querySelector('.overlay').style.display = 'none';
    },
    onChange: function(selectedDates, dateStr) {
        // Optionally handle any behavior when the return date is chosen
    }
});
