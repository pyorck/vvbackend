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


//CALENDAR

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
  
    // Show calendar when button is clicked
    dateInput.addEventListener('click', (event) => {
      picker.show(); // Show the calendar
      isCalendarOpened = true;
      overlay.style.display = 'block'; // Show the overlay
    });
  
    // Close calendar when Go or Cancel buttons are clicked
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
  
        // Prevent closing the calendar when clicking outside calendar and overlay
        document.addEventListener('click', function(event) {
            const pickerElement = document.querySelector('.litepicker');
            if (isCalendarOpened && pickerElement && !pickerElement.contains(event.target)) {
                picker.show();
            }
        });
});