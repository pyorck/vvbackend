    
    // Buttons initially disabled (this is done to prevent user clicking when no options have been selected)
    const submitForMeButton = document.getElementById('submit-for-me');
    const submitToGiftButton = document.getElementById('submit-to-gift');
    submitForMeButton.disabled = true;
    submitToGiftButton.disabled = true;

    // Validation function [this function is spread in WHERE, BUDGET and DATES JS and validates IF a selection has been made]
    function validateSelections() {
        const allSelected = selectedAirports.length === 1 && selectedValues.length === 1 && selectedDates.length === 1;
        submitForMeButton.disabled = !allSelected;
        submitToGiftButton.disabled = !allSelected;
    }

    // Event listeners for submit buttons [listens and waits for user input - click on the plane in each of the forms]
    submitForMeButton.addEventListener('click', () => {
        handleSubmit('for-me-endpoint', 'For Me');
    });
    submitToGiftButton.addEventListener('click', () => {
        handleSubmit('to-gift-endpoint', 'To Gift');
    });


    // [AFTER CLICKING THE BUTTONS, THIS FUNCTION EXECUTES]

// Function to show the loading spinner
function showLoadingSpinner() {
    
    // Create a spinner element
    const spinner = document.createElement('div');
    spinner.className = 'spinner'; // Add a class for styling
    spinner.innerHTML = `
        <style>
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3; /* Light gray */
                border-top: 5px solid #ffe800;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px auto; /* Center the spinner */
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    // Replace the contents of the finder-box with the spinner
    const finderBox = document.querySelector('.finder-box');
    finderBox.innerHTML = ''; // Clear the finder box
    finderBox.appendChild(spinner); // Add the spinner
}

    // Function to handle form submission
    function handleSubmit(endpoint, formId) {
        showLoadingSpinner();

    // Sim loading and data processing
    setTimeout(() => {
        // Replace finder-box content with new HTML code
        const finderBox = document.querySelector('.finder-box');
        
        finderBox.innerHTML = `
            <div id="submitted-form">     
                <h1>Ready for take off?</h1>
                <div class="line2"></div>
                <div id="text1">YOUR VAIVING EXPERIENCE IS NOW READY</div>
                <div id="airport-selected">You will fly from:</div>
                <div id="selected-airports-display">
                <!-- Selected airports will be displayed here -->
                </div>
                <div id="airport-selected">Your budget type is:</div>
                <div id="selected-value-display">
                <!-- Selected value will be displayed here -->
                </div>
                <div id="airport-selected">Your selected dates are:</div>
                <div id="selected-dates-display">
                <!-- Selected dates will be displayed here -->
                </div>
            </div>
        `;

        // Call displaySelectedAirports here to show the stored airports
        displaySelectedAirports();
        displaySelectedValue();
        displaySelectedDates();

    }, 500); // Simulate a delay
}