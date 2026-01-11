const translations = {
    ru: {
        nav_home: "Главная",
        nav_about: "О враче",
        nav_services: "Услуги",
        nav_contacts: "Контакты",
        nav_book: "Записаться",
        hero_title: "Ваша улыбка — <br><span class=\"text-primary\">наша забота</span>",
        hero_subtitle: "Безболезненное лечение, современное оборудование и индивидуальный подход к каждому пациенту в центре Ташкента.",
        hero_btn_book: "Записаться на прием",
        hero_btn_price: "Узнать цены",
        services_title: "Наши услуги",
        book_title: "Запишитесь на прием",
        book_subtitle: "Выберите удобное время, и мы свяжемся с вами для подтверждения.",
        form_name: "Ваше имя",
        form_phone: "Телефон",
        form_submit: "Подтвердить запись"
    },
    uz: {
        nav_home: "Bosh sahifa",
        nav_about: "Shifokor haqida",
        nav_services: "Xizmatlar",
        nav_contacts: "Kontaktlar",
        nav_book: "Qabulga yozilish",
        hero_title: "Sizning tabassumingiz — <br><span class=\"text-primary\">bizning g'amxo'rligimiz</span>",
        hero_subtitle: "Toshkent markazida har bir bemorga individual yondashuv, zamonaviy uskunalar va og'riqsiz davolash.",
        hero_btn_book: "Qabulga yozilish",
        hero_btn_price: "Narxlar",
        services_title: "Bizning xizmatlar",
        book_title: "Qabulga yoziling",
        book_subtitle: "Qulay vaqtni tanlang va biz tasdiqlash uchun siz bilan bog'lanamiz.",
        form_name: "Ismingiz",
        form_phone: "Telefon raqamingiz",
        form_submit: "Tasdiqlash"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inject Language Switcher
    const navContainer = document.querySelector('.nav-links');
    if (navContainer) {
        const langBtn = document.createElement('button');
        langBtn.className = 'btn btn-white btn-sm';
        langBtn.style.marginLeft = '16px';
        langBtn.textContent = 'UZ';
        langBtn.onclick = toggleLanguage;
        navContainer.appendChild(langBtn);

        // Mobile menu injection
        const navbar = document.querySelector('.nav-container');
        // Simple distinct button for mobile if needed, but flex handling might be enough
    }

    let currentLang = 'ru';

    function toggleLanguage() {
        currentLang = currentLang === 'ru' ? 'uz' : 'ru';
        this.textContent = currentLang === 'ru' ? 'UZ' : 'RU';
        updateContent();
    }

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                if (element.tagName === 'INPUT') {
                    element.placeholder = translations[currentLang][key];
                } else {
                    element.innerHTML = translations[currentLang][key];
                }
            }
        });
    }
});
