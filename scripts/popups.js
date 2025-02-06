//// BUDGET POP-UP

// Get elements by their IDs
const closePopup = document.getElementById('closePopup');
const popupContainer = document.getElementById('popupContainer');
const popupOverlay = document.getElementById('overlay');

// Function to show the pop-up
const showPopup = function() {
    popupContainer.style.display = 'block';
    popupOverlay.style.display = 'block';
};

// Attach click event to each button to open the pop-up
document.getElementById('openPopup1').onclick = showPopup;
document.getElementById('openPopup2').onclick = showPopup;
document.getElementById('openPopup3').onclick = showPopup;

// Function to hide the pop-up
closePopup.onclick = function() {
    popupContainer.style.display = 'none';
    popupOverlay.style.display = 'none';
};


//// AIRPORTS POP-UP

// Get elements by their IDs
const popupContainerAIR = document.getElementById('popupContainerAIR');
const closePopupAIR = document.getElementById('closePopupAIR');


// Function to show the pop-up
const showPopupAIR = function() {
    popupContainerAIR.style.display = 'block';
    popupOverlay.style.display = 'block';
};

// Attach click event to each button to open the pop-up
document.getElementById('openPopup4').onclick = showPopupAIR;
document.getElementById('openPopup5').onclick = showPopupAIR;
document.getElementById('openPopup6').onclick = showPopupAIR;

// Function to hide the pop-up
closePopupAIR.onclick = function() {
    popupContainerAIR.style.display = 'none';
    popupOverlay.style.display = 'none';
};