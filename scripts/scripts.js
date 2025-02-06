// SIMPLE EVENT LISTENER FOR CARDS

document.querySelectorAll('.card-container1').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });

  // TOGGLE BACKGROUND COLOR IF CARD-CONTAINER1 IS ACTIVE;
document.querySelectorAll('.card-container1').forEach(card => {
    card.addEventListener('click', () => {
      const wrapper = document.querySelector('.virtualcards-wrapper1');
      if (card.classList.contains('active')) {
        wrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      } else {
        wrapper.style.backgroundColor = 'rgba(32, 32, 32, 0.4)';
      }
    });
  });

  // FINE PRINT NOPERS
  document.querySelectorAll('.card-container1').forEach(card => {
    card.addEventListener('click', () => {
      const finePrint = document.querySelector('.virtualcards-header1 .fine-print');
      const activeCards = document.querySelectorAll('.card-container1.active').length;
      if (activeCards > 0) {
        finePrint.style.textDecoration = 'line-through'; // Apply line-through
      } else {
        finePrint.style.textDecoration = 'none'; // Remove line-through
      }
    });
  });
    
    // SEARCH BOX HANDLING

    let selectedValues = []; // Array to store selected values
    
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
            const displayValue = selectedOption.innerHTML;

            // Update the displayed selected item
            selectedItem.innerHTML = displayValue;
            selectedItem.style.display = 'inline';
            placeholder.style.display = 'inline';

            // Close the dropdown
            options.style.display = 'none';

            // Clear the previous selection and store only the latest display value
            selectedValues.length = 0;
            selectedValues.push(displayValue);
            console.log('Selected values:', selectedValues);
            validateSelections();
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

        function displaySelectedValue() {
            const displayValueContainer = document.getElementById('selected-value-display');
            displayValueContainer.innerHTML = ''; // Clear existing content
        
            // Append each selected value in the array as a paragraph
            selectedValues.forEach(value => {
                const paragraph = document.createElement('p'); // Create a <p> element
                paragraph.textContent = value; // Set the text to the selected value
                displayValueContainer.appendChild(paragraph); // Add to the display
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
      minDate: new Date(new Date().setDate(new Date().getDate() + 6)), // Set min date to 7 days in advance
      minDays: 3,
      format: 'DD/MM/YYYY',
      autoApply: false,
      buttonText: {
        apply: 'Go',
        cancel: 'Cancel'
      },
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {
            const dateString = `From <strong>${date1.format('DD/MM/YY')}</strong> to <strong>${date2 ? date2.format('DD/MM/YY') : ''}</strong>`;
            selectedDates.length = 0; // Clear the array
            selectedDates.push(dateString); // Store the selected date string
            selectedDatesPlaceholder.innerHTML = dateString; // Render selected dates
            selectedDatesPlaceholder.style.display = 'block'; // Show selected dates placeholder
            console.log('Selected dates:', selectedDates);
            validateSelections(); // Check if all selections are made
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
                overlay.style.display = 'block'; // Show the overlay
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
      minDate: new Date(new Date().setDate(new Date().getDate() + 6)), // Set min date to 7 days in advance
      minDays: 3,
      format: 'DD/MM/YYYY',
      autoApply: false,
      buttonText: {
        apply: 'Go',
        cancel: 'Cancel'
      },
      setup: (picker) => {
        picker.on('selected', (date1, date2) => {
            const dateString = `From <strong>${date1.format('DD/MM/YY')}</strong> to <strong>${date2 ? date2.format('DD/MM/YY') : ''}</strong>`;
            selectedDates.length = 0; // Clear the array
            selectedDates.push(dateString); // Store the selected date string
            selectedDatesPlaceholder.innerHTML = dateString; // Render selected dates
            selectedDatesPlaceholder.style.display = 'block'; // Show selected dates placeholder
            console.log('Selected dates:', selectedDates);
            validateSelections(); // Check if all selections are made
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
                overlay.style.display = 'block'; // Show the overlay                
            }
        });
});

// Declare the array to store selected dates globally
let selectedDates = [];

// Function to display selected dates in HTML
function displaySelectedDates() {
    const displayDatesContainer = document.getElementById('selected-dates-display');
    displayDatesContainer.innerHTML = ''; // Clear existing content

    // Append each selected date in the array as a paragraph
    selectedDates.forEach(date => {
        const paragraph = document.createElement('p'); // Create a <p> element
        paragraph.innerHTML = date; // Set the HTML to the selected date
        displayDatesContainer.appendChild(paragraph); // Add to the display
    });
}


// BOOK / TO GIFT ~ HANDLING

        document.addEventListener("DOMContentLoaded", function () {
        const forMeButton = document.getElementById("for-me-button");
        const toGiftButton = document.getElementById("to-gift-button");
        const forMeForm = document.getElementById("for-me-form");
        const toGiftForm = document.getElementById("to-gift-form");


    // Pre-select "Book"
    forMeButton.classList.add("active");  // Highlight active button
    forMeForm.style.display = "block";  // Show "For Me" form

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


    // BLOCK VIRTUAL CARDS

    const virtualCards = document.querySelector('.virtualcards1');

    virtualCards.addEventListener('touchstart', function(e) {
        // Prevent vertical scrolling
        e.stopPropagation();
    });

    virtualCards.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        // Prevent vertical scrolling when moving horizontally
        if (Math.abs(touch.clientX - touch.pageX) > Math.abs(touch.clientY - touch.pageY)) {
            e.preventDefault(); // Allow horizontal scrolling
        } else {
            e.stopPropagation(); // Prevent vertical scrolling
        }
    });
