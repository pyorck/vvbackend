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


// VALIDATOR TO SET-UP
document.addEventListener("DOMContentLoaded", function() {
    const cityInput = document.querySelector('#city-input'); // City input
    const budgetButton = document.querySelector('.dropdown-button'); // Budget dropdown button
    const budgetItems = document.querySelectorAll('.dropdown-item'); // Budget items
    const dateInput = document.querySelector('#litepicker'); // Date input button
    const selectedDatesPlaceholder = document.querySelector('.selected-dates'); // Placeholder for selected dates
    const buttonContainer = document.querySelector('.button-container2'); // Button container with the plane

    let citySelected = false;
    let budgetSelected = false;
    let dateSelected = false;

    // Initially hide the button container
    buttonContainer.style.display = 'none';

    // Function to check if all selections are made
    const checkSelections = function() {
        buttonContainer.style.display = (citySelected && budgetSelected && dateSelected) ? 'block' : 'none'; // Show or hide plane image
    };

    // City input handling
    cityInput.addEventListener('input', function() {
        citySelected = cityInput.value.trim() !== ""; // Check if city input is not empty
        checkSelections();
    });

    // Budget selection handling
    budgetItems.forEach(item => {
        item.addEventListener('click', function() {
            const selectedValue = this.textContent.trim();
            budgetButton.querySelector(".selected-item").textContent = selectedValue;
            budgetSelected = true; // Mark budget as selected
            checkSelections();
        });
    });

 // Litepicker initialization
const picker = new Litepicker({
    element: dateInput, // This links the picker to the button
    singleMode: false,
    numberOfMonths: 1,
    minDate: new Date(),
    format: 'DD/MM/YYYY',
    autoApply: false,
    buttonText: {
        apply: 'Go',
        cancel: 'Cancel'
    },
    setup: (picker) => {
        picker.on('selected', (date1, date2) => {
            const dateString = `From <strong>${date1.format('DD/MM/YY')}</strong> to <strong>${date2 ? date2.format('DD/MM/YY') : ''}</strong>`;
            selectedDatesPlaceholder.innerHTML = dateString; // Use innerHTML to render HTML tags
            selectedDatesPlaceholder.style.display = 'block'; // Show the selected dates placeholder

            checkSelections(); // Check if all selections are made
        });        
    }
});

let isCalendarOpened = false;

// Show calendar when button is clicked
dateInput.addEventListener('click', () => {
    picker.show();
    isCalendarOpened = true; 
    document.getElementById('overlay').style.display = 'block'; // Show the overlay
});

// Close calendar when Go or Cancel buttons are clicked inside the picker
picker.on('button:apply', () => {
    picker.hide();
    isCalendarOpened = false; 
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});
picker.on('button:cancel', () => {
    picker.hide();
    isCalendarOpened = false; 
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
});

// Close calendar when clicking outside of it (optional)
document.addEventListener('click', (event) => {
    const isClickInside = dateInput.contains(event.target) || picker.element.contains(event.target);
    if (isCalendarOpened && !isClickInside) {
        picker.hide();
        isCalendarOpened = false;
        document.getElementById('overlay').style.display = 'none'; // Hide the overlay
    }
});
});