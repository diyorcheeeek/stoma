// Calendar Logic (Uzbek)

document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots');

    let currentDate = new Date();
    let selectedDate = null;

    const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYear.textContent = `${months[month]} ${year}`;

        // First day of the month
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...
        // Adjust for Monday start (1-7)
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        // Days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Clear existing days (keep headers)
        while (calendarDays.children.length > 7) {
            calendarDays.lastChild.remove();
        }

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.className = 'calendar-day btn-white';
            dayDiv.style.cursor = 'pointer';
            dayDiv.style.padding = '8px';
            dayDiv.style.borderRadius = '8px';
            dayDiv.style.fontSize = '0.875rem'; // Smaller font for mobile

            // Check if past date
            const checkDate = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (checkDate < today) {
                dayDiv.style.color = '#ccc';
                dayDiv.style.cursor = 'not-allowed';
            } else {
                dayDiv.addEventListener('click', () => selectDate(i));
            }

            // Highlight selected
            if (selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === month) {
                dayDiv.style.backgroundColor = 'var(--color-primary)';
                dayDiv.style.color = 'white';
            }

            calendarDays.appendChild(dayDiv);
        }
    }

    function selectDate(day) {
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        renderCalendar(); // Re-render to highlight
        renderTimeSlots();

        const display = document.getElementById('selected-date-display');
        display.classList.remove('hidden');
        display.textContent = `Tanlandi: ${day}-${months[currentDate.getMonth()]}`;
    }

    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        const slots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

        slots.forEach(time => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn btn-outline w-full text-xs'; // Smaller text
            btn.textContent = time;
            btn.style.padding = '8px 4px';
            btn.addEventListener('click', function () {
                // Remove active class from all
                document.querySelectorAll('#time-slots button').forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline');
                });
                // Add active to clicked
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary');
            });
            timeSlotsContainer.appendChild(btn);
        });
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
