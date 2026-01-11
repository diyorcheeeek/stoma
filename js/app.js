// TMA Application Logic

const tg = window.Telegram.WebApp;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram Web App
    tg.expand();

    // Theme adaptation
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#F8FAFC';
    document.body.style.color = tg.themeParams.text_color || '#1E293B';

    // MainButton Setup
    tg.MainButton.text = "QABULGA YOZILISH";
    tg.MainButton.textColor = "#FFFFFF";
    tg.MainButton.color = "#2DD4BF"; // Mint color to match theme

    // Form Interactions to toggle MainButton
    const form = document.getElementById('booking-form');
    const inputs = form.querySelectorAll('input, select');

    // Check validation state
    function checkValidation() {
        const name = document.getElementById('name-input').value;
        const phone = document.getElementById('phone-input').value;
        const timeSelected = document.querySelector('#time-slots .btn-primary'); // Check if a time slot is selected (it gets btn-primary class)
        const dateDisplay = document.getElementById('selected-date-display');
        const isDateSelected = !dateDisplay.classList.contains('hidden');

        if (name && phone.length > 10 && timeSelected && isDateSelected) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', checkValidation);
        input.addEventListener('change', checkValidation);
    });

    // We also need to listen to calendar/time selection updates which happen in calendar.js
    // We can use a custom event or just export validation check if we used modules strictly, 
    // but for simplicity, let's attach validation check to the time slot container click too.
    document.getElementById('time-slots').addEventListener('click', () => setTimeout(checkValidation, 100)); // slight delay for class toggling
    document.getElementById('calendar-days').addEventListener('click', () => setTimeout(checkValidation, 100));

    // Handle MainButton Click
    tg.MainButton.onClick(() => {
        const data = {
            service: document.getElementById('service-select').value,
            date: document.getElementById('selected-date-display').textContent,
            time: document.querySelector('#time-slots .btn-primary')?.textContent,
            name: document.getElementById('name-input').value,
            phone: document.getElementById('phone-input').value
        };

        // Validate again just in case
        if (!data.time || !data.date) {
            tg.showAlert("Iltimos, sana va vaqtni tanlang!");
            return;
        }

        // Send data back to bot
        tg.sendData(JSON.stringify(data));

        // Optional: Close app
        // tg.close(); 
    });


    // Smooth Scroll (Internal links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Masking for Phone (+998)
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[2]) {
                e.target.value = x[1] ? '+998 ' + x[1] : '';
            } else {
                e.target.value = !x[3] ? '+998 ' + x[2] : '+998 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            }
            checkValidation();
        });
    }
});
