// Function to show the loading spinner
function showLoadingSpinner() {
    
    // Create a spinner element
    const spinner = document.createElement('div');
    spinner.className = 'spinner'; // Add a class for styling
    spinner.innerHTML = `
        <style>
            .spinner {
                width: 60px;
                height: 60px;
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
                <h1>Thanks for Vaiving</h1>
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

    }, 750); // Simulate a delay
}

    // Event listeners for both submit buttons
    document.getElementById('submit-for-me').addEventListener('click', () => {
        handleSubmit('for-me-endpoint', 'For Me');
    });
    document.getElementById('submit-to-gift').addEventListener('click', () => {
        handleSubmit('to-gift-endpoint', 'To Gift');
    });
