const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Form validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default submission

        const email = form.querySelector('input[type="email"]');
        const password = form.querySelector('input[type="password"]');
        const username = form.querySelector('input[type="text"]');

        // Basic validation
        if (username && username.value.trim() === '') {
            alert('Please enter a username.');
            return;
        }
        if (email.value.trim() === '') {
            alert('Please enter your email.');
            return;
        }
        if (password.value.trim() === '') {
            alert('Please enter your password.');
            return;
        }

        // Prepare data for submission
        const formData = new FormData(form);

        // Send data to register.php using fetch
        fetch('register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming register.php returns JSON
        })
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                window.location.href = "services.html"; // Redirect if registration is successful
            } else {
                alert(data.message); // Display error message from server
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});
