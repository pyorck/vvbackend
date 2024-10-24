    
    // SEARCH BOX HANDLING
    
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


//CALENDAR (1) - BOOK

document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.querySelector('#litepicker'); // Date input button
    const selectedDatesPlaceholder = document.querySelector('.selected-dates'); // Placeholder for selected dates
    const overlay = document.getElementById('overlay'); // Overlay element
  
    // Litepicker initialization
    const picker = new Litepicker({
      element: dateInput, // Link the picker to the button
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
          selectedDatesPlaceholder.innerHTML = dateString; // Render selected dates
          selectedDatesPlaceholder.style.display = 'block'; // Show selected dates placeholder
        });
      }
    });
  
    let isCalendarOpened = false;
  
        //1// Show calendar when button is clicked

        dateInput.addEventListener('click', (event) => {
        picker.show(); // Show the calendar
        isCalendarOpened = true;
        overlay.style.display = 'block'; // Show the overlay
        });
    
        //2// Close calendar when Go or Cancel buttons are clicked

        picker.on('button:apply', () => {
        picker.hide(); // Hide the calendar
        isCalendarOpened = false;
        overlay.style.display = 'none'; // Hide the overlay
        });
    
        picker.on('button:cancel', () => {
        picker.hide(); // Hide the calendar
        isCalendarOpened = false;
        overlay.style.display = 'none'; // Hide the overlay
        });
  
        //3// Prevent closing the calendar when clicking outside calendar and overlay

        document.addEventListener('click', function(event) {
            const pickerElement = document.querySelector('.litepicker');
            if (isCalendarOpened && pickerElement && !pickerElement.contains(event.target)) {
                picker.show();
            }
        });
});


//CALENDAR (2) - GIFT

document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.querySelector('#litepicker1'); // Date input button
    const selectedDatesPlaceholder = document.querySelector('.selected-dates1'); // Placeholder for selected dates
    const overlay = document.getElementById('overlay'); // Overlay element
  
    // Litepicker initialization
    const picker = new Litepicker({
      element: dateInput, // Link the picker to the button
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
          selectedDatesPlaceholder.innerHTML = dateString; // Render selected dates
          selectedDatesPlaceholder.style.display = 'block'; // Show selected dates placeholder
        });
      }
    });
  
    let isCalendarOpened = false;
  
        //1// Show calendar when button is clicked

        dateInput.addEventListener('click', (event) => {
        picker.show(); // Show the calendar
        isCalendarOpened = true;
        overlay.style.display = 'block'; // Show the overlay
        });
    
        //2// Close calendar when Go or Cancel buttons are clicked

        picker.on('button:apply', () => {
        picker.hide(); // Hide the calendar
        isCalendarOpened = false;
        overlay.style.display = 'none'; // Hide the overlay
        });
    
        picker.on('button:cancel', () => {
        picker.hide(); // Hide the calendar
        isCalendarOpened = false;
        overlay.style.display = 'none'; // Hide the overlay
        });
  
        //3// Prevent closing the calendar when clicking outside calendar and overlay

        document.addEventListener('click', function(event) {
            const pickerElement = document.querySelector('.litepicker');
            if (isCalendarOpened && pickerElement && !pickerElement.contains(event.target)) {
                picker.show();
            }
        });
});



// BOOK / TO GIFT ~ HANDLING

    document.addEventListener("DOMContentLoaded", function () {
    const forMeButton = document.getElementById("for-me-button");
    const toGiftButton = document.getElementById("to-gift-button");
    const forMeForm = document.getElementById("for-me-form");
    const toGiftForm = document.getElementById("to-gift-form");

        // Event listener for "For Me" button
        forMeButton.addEventListener("click", function () {
            forMeForm.style.display = "block";  // Show "For Me" form
            toGiftForm.style.display = "none";  // Hide "To Gift" form
            forMeButton.classList.add("active");  // Highlight active button
            toGiftButton.classList.remove("active");
        });

        // Event listener for "To Gift" button
        toGiftButton.addEventListener("click", function () {
            toGiftForm.style.display = "block";  // Show "To Gift" form
            forMeForm.style.display = "none";    // Hide "For Me" form
            toGiftButton.classList.add("active");  // Highlight active button
            forMeButton.classList.remove("active");
        });

        // Handle form submission (to book)
        document.getElementById("submit-for-me").addEventListener("click", function () {
            const endpoint = this.dataset.endpoint;
            // Submit "For Me" form data to the respective endpoint
            console.log(`For Me form submitted to: ${endpoint}`);
        });

        // Handle form submission (to gift)
        document.getElementById("submit-to-gift").addEventListener("click", function () {
            const endpoint = this.dataset.endpoint;
            // Submit "To Gift" form data to the respective endpoint
            console.log(`To Gift form submitted to: ${endpoint}`);
        });
    });

