const selectButtons = document.querySelectorAll('.select-btn');
const quantityOverlay = document.getElementById('quantityOverlay');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const quantityList = document.getElementById('quantityList');
const selectedServiceText = document.getElementById('selectedService');
const totalPriceText = document.getElementById('totalPrice');

let selectedServices = {}; // Store selected services and their quantities

// Event listener for selecting services
selectButtons.forEach(button => {
    button.addEventListener('click', function() {
        const serviceBox = button.closest('.service-box');
        const serviceDescription = serviceBox.querySelector('p').textContent;
        const servicePrice = parseFloat(serviceBox.getAttribute('data-price'));

        // If service already selected, alert and return
        if (selectedServices[serviceDescription]) {
            alert("You have already selected this course.");
            return;
        }

        // Add service to selected services with initial quantity
        selectedServices[serviceDescription] = {
            price: servicePrice,
            quantity: 0 // Initialize quantity
        };

        // Show quantity selection popup
        showQuantityPopup();
    });
});

// Show quantity selection popup
function showQuantityPopup() {
    quantityList.innerHTML = ''; // Clear previous content
    for (const service in selectedServices) {
        const serviceInfo = selectedServices[service];
        quantityList.innerHTML += `
            <div>
                <p>${service} - $${serviceInfo.price}</p>
                <button onclick="setQuantity('${service}', -1)">-</button>
                <span>${serviceInfo.quantity}</span>
                <button onclick="setQuantity('${service}', 1)">+</button>
            </div>
        `;
    }
    quantityOverlay.style.display = 'flex';
}

// Set quantity for a service
function setQuantity(service, change) {
    const serviceInfo = selectedServices[service];
    serviceInfo.quantity += change; // Update quantity

    // Ensure quantity does not go below 0
    if (serviceInfo.quantity < 0) {
        serviceInfo.quantity = 0;
    }

    showQuantityPopup(); // Refresh the popup
}

// Confirm quantity selection and show checkout popup
function confirmSelection() {
    let totalAmount = 0;
    selectedServiceText.innerHTML = ''; // Clear previous selection text

    for (const service in selectedServices) {
        const { price, quantity } = selectedServices[service];
        if (quantity > 0) {
            selectedServiceText.innerHTML += `${service} - $${price} x ${quantity}<br>`;
            totalAmount += price * quantity;
        }
    }

    totalPriceText.textContent = `Total Price: $${totalAmount.toFixed(2)}`;
    closeQuantityPopup();
    checkoutOverlay.style.display = 'flex';
}

// Close quantity selection popup
function closeQuantityPopup() {
    quantityOverlay.style.display = 'none';
}

// Close checkout popup
function closeCheckoutPopup() {
    checkoutOverlay.style.display = 'none';
}

// Checkout function
function checkout() {
    const serviceData = []; // To store selected service data

    for (const service in selectedServices) {
        const { quantity } = selectedServices[service];
        if (quantity > 0) {
            serviceData.push({
                name: service,
                price: selectedServices[service].price,
                quantity: quantity
            });
        }
    }

    // Send data to PHP script via POST
    fetch('insert_service.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show success message from PHP
        // Reset selected services and close the popup
        selectedServices = {};
        closeCheckoutPopup();
        window.location.href = "gavinHome.html"; 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

