/* ==========================================================================
   КНП "Моршинська міська лікарня" - Логіка та інтерактив
   index.js - Увесь функціонал (слайдер, фільтри, запис, навігація)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- СТАТИЧНІ ТА ДИНАМІЧНІ ДАНІ ---
    const DOCTORS_DATA = [
        { id: 1, name: 'Кенц-Березюк Олеся Степанівна', category: 'primary', spec: 'Лікар ЗПСМ / Директор', status: 'Перша категорія', exp: '14 років', edu: 'Львівський національний медичний університет ім. Д. Галицького', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400' },
        { id: 2, name: 'Кравченко Галина Миколаївна', category: 'primary', spec: 'Лікар-терапевт дільничний', status: 'Вища категорія', exp: '25 років', edu: 'Івано-Франківський державний медичний університет', img: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400' },
        { id: 3, name: 'Грош Галина Ярославівна', category: 'primary', spec: 'Лікар-педіатр дільничний', status: 'Перша категорія', exp: '18 років', edu: 'Львівський медичний інститут', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' },
        { id: 4, name: 'Славич Галина Романівна', category: 'secondary', spec: 'Лікар-кардіолог', status: 'Вища категорія', exp: '21 рік', edu: 'Тернопільський державний медичний університет', img: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=400' },
        { id: 5, name: 'Березюк Вадим Олегович', category: 'secondary', spec: 'Лікар-гастроентеролог', status: 'Друга категорія', exp: '8 років', edu: 'Ужгородський національний медичний університет', img: 'https://images.unsplash.com/photo-1622902046580-2b47f47f0871?auto=format&fit=crop&q=80&w=400' },
        { id: 6, name: 'Снігур Анна Павлівна', category: 'secondary', spec: 'Лікар-отоларинголог (ЛОР)', status: 'Здобувач / Спеціаліст', exp: '5 років', edu: 'Буковинський державний медичний університет', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400' }
    ];

    const MEDS_DATA = [
        { name: 'Інсулін гларгін (Лантус)', quantity: '42 фл.', limit: 'Достатньо', active: 'Інсулінотерапія', low: false },
        { name: 'Амоксицилін / Клавуланат 1000мг', quantity: '180 таб.', limit: 'Достатньо', active: 'Антибактеріальний', low: false },
        { name: 'Еналаприл 10мг №20', quantity: '35 уп.', limit: 'Достатньо', active: 'Кардіологічний', low: false },
        { name: 'Метформін 850мг №60', quantity: '5 уп.', limit: 'Залишок низький!', active: 'Гіпоглікемічний', low: true },
        { name: 'Аторвастатин 20мг №30', quantity: '52 уп.', limit: 'Достатньо', active: 'Гіполіпідемічний', low: false },
        { name: 'Ібупрофен 400мг №10', quantity: '240 уп.', limit: 'Достатньо', active: 'Анальгетик/Протизапальний', low: false },
        { name: 'Сальбутамол Небули', quantity: '12 уп.', limit: 'Залишок низький!', active: 'Адреноміметик', low: true },
        { name: 'Цефтріаксон 1.0 г ін`єкції', quantity: '95 фл.', limit: 'Достатньо', active: 'Антибіотик', low: false }
    ];

    const SERVICES_DATA = {
        pmsd: [
            { id: 'p1', name: 'Первинний огляд терапевта / педіатра та консультація', code: 'A1.01.001', price: 'Безкоштовно (за декларацією)', type: 'free' },
            { id: 'p2', name: 'Загальний аналіз крові з лейкоцитарною формулою', code: 'A2.08.001', price: 'Безкоштовно (за направленням)', type: 'free' },
            { id: 'p3', name: 'Загальний аналіз сечі', code: 'A2.09.001', price: 'Безкоштовно (за направленням)', type: 'free' },
            { id: 'p4', name: 'Електрокардіограма (ЕКГ) з розшифровкою', code: 'A3.12.002', price: 'Безкоштовно (за направленням)', type: 'free' },
            { id: 'p5', name: 'Швидкий тест на COVID-19 / Тропоніни', code: 'A4.18.005', price: 'Безкоштовно (невідкладно)', type: 'free' }
        ],
        vtor: [
            { id: 'v1', name: 'Ультразвукове дослідження (УЗД) органів черевної порожнини', code: 'B2.01.004', price: 'Безкоштовно за направленням / 250 грн платно', type: 'hybrid' },
            { id: 'v2', name: 'Езофагогастродуоденоскопія (ЕГДС) з біопсією', code: 'B3.02.012', price: 'Входить в Програму Медичних Гарантій НСЗУ', type: 'free' },
            { id: 'v3', name: 'Рентгенографія ОГК (Органів грудної клітки) у двох проекціях', code: 'B4.01.002', price: 'Безкоштовно за направленням / 180 грн платно', type: 'hybrid' },
            { id: 'v4', name: 'Консультація вузького спеціаліста (Кардіолог, Гастроентеролог, Офтальмолог)', code: 'B1.05.009', price: 'Безкоштовно за направленням / 200 грн платно', type: 'hybrid' },
            { id: 'v5', name: 'Терапевтична чистка зубів', code: 'B9.01.003', price: '300 грн (платна послуга)', type: 'paid' }
        ]
    };

    const NEWS_DATA = [
        { id: 1, date: '25 Травня, 2026', cat: 'Здоров`я', title: 'Як вберегтися від літньої спеки: поради кардіологів Моршинської міської лікарні', desc: 'Настання літнього сезону часто несе ризики для людей з серцево-судинними захворюваннями. Наша кардіологиня Славич Галина Романівна ділиться практичними порадами щодо гідратації, графіку прогулянок та контролю тиску.', text: 'Моршин - місто мінеральних вод та затишку, проте літня спека може ускладнити життя пацієнтам із хронічними недугами. Кардіологи радять дотримуватися наступних кроків:\n\n1. Пийте чисту negative-ion воду дрібними ковтками, уникаючи солодких напоїв.\n2. Перебувайте в затінку з 11:00 до 16:00.\n3. Своєчасно приймайте призначені гіпотензивні препарати та ведіть щоденник вимірів.\n\nЗа необхідності звертайтеся до нашої поліклініки щодня з 08:00 до 17:00.' },
        { id: 2, date: '12 Травня, 2026', cat: 'Анонс', title: 'Профілактичні безкоштовні огляди до Всесвітнього дня боротьби з гіпертонією', desc: 'Усі охочі жителі Моршинської територіальної громади запрошуються на безкоштовне вимірювання артеріального тиску, визначення індексу маси тіла та експрес-оцінку кардіорізиків.', text: 'Всесвітній день боротьби з гіпертонією створений для підвищення обізнаності про тиху загрозу.\n15-18 травня в холі поліклініки діятиме безкоштовна зона скринінгу.\n\nКожен відвідувач зможе:\n- Розрахувати індекс маси тіла\n- Здати експрес-тест на цукор у крові\n- Отримати консультацію терапевта без попереднього запису.\nДбайте про здоров`я вчасно!' },
        { id: 3, date: '04 Квітня, 2026', cat: 'Оновлення', title: 'Профільне гастроентерологічне відділення отримало нове сучасне ЕГДС обладнання за підтримки благодійників', desc: 'У межах модернізації діагностичного фонду нашої лікарні впроваджено новий високоточний відеогастроскоп, що спрощує ранню діагностику онкологічних захворювань ШКТ.', text: 'Гастроскопія тепер стала ще точнішою та комфортнішою для пацієнта.\n\nЗавдяки новій лінзовій системі з високою роздільною здатністю, лікар-гастроентеролог Березюк Вадим Олегович може бачити найдрібніші зміни слизової оболонки розміром менше 1мм.\n\nДіагностичне дослідження проводиться повністю безкоштовно за електронним направленням від вашого сімейного лікаря. Запис здійснюється через реєстратурний кабінет або онлайн-форму.' }
    ];

    const BOOKINGS_STORAGE_KEY = 'morshyn_hospital_bookings';
    let bookingsStore = JSON.parse(localStorage.getItem(BOOKINGS_STORAGE_KEY)) || [];

    // --- МОБІЛЬНЕ МЕНЮ (HAMBURGER) ---
    const burgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Закривати меню при кліку на пункти
        navMenu.querySelectorAll('.menu-link, .submenu-link, .fast-btn').forEach(lnk => {
            lnk.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }

    // --- ГРАФІК РОБОТИ В ТОП-БАРІ ---
    const topLocation = document.getElementById('top-location-trigger');
    const locationDropdown = document.getElementById('location-dropdown');

    if (topLocation && locationDropdown) {
        topLocation.addEventListener('click', (e) => {
            e.stopPropagation();
            locationDropdown.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            locationDropdown.classList.remove('show');
        });
    }

    // --- СЛАЙДЕР HERO ---
    const slides = document.querySelectorAll('.slide');
    const borderDots = document.getElementById('slider-dots');
    const arrowPrev = document.getElementById('slider-prev');
    const arrowNext = document.getElementById('slider-next');
    let currentSlideIndex = 0;
    let slideTimer = null;

    if (slides.length > 0) {
        // Створення крапок навігації
        slides.forEach((slide, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            if (borderDots) borderDots.appendChild(dot);
        });

        const dots = document.querySelectorAll('.indicator');

        function updateSlideStates() {
            slides.forEach((sl, idx) => {
                sl.classList.toggle('active', idx === currentSlideIndex);
            });
            if (dots) {
                dots.forEach((dt, idx) => {
                    dt.classList.toggle('active', idx === currentSlideIndex);
                });
            }
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlideStates();
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlideStates();
        }

        function goToSlide(idx) {
            currentSlideIndex = idx;
            updateSlideStates();
            resetTimer();
        }

        function resetTimer() {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, 5000);
        }

        if (arrowNext) arrowNext.addEventListener('click', () => { prevSlide(); resetTimer(); });
        if (arrowPrev) arrowPrev.addEventListener('click', () => { nextSlide(); resetTimer(); });

        resetTimer();
    }

    // --- ВІРТУАЛЬНИЙ РОУТИНГ ТА НАВІГАЦІЯ TAB ---
    const navLinks = document.querySelectorAll('[data-target]');
    const pages = document.querySelectorAll('.page-container');
    const bCrumbCurrent = document.getElementById('crumb-current');
    const landingSections = [document.querySelector('.hero-slider'), document.querySelector('.section-comfort'), document.querySelector('.section-about-banner'), document.querySelector('.section-action')];

    function toggleLandingSections(show) {
        landingSections.forEach(sec => {
            if (sec) sec.style.display = show ? 'block' : 'none';
        });
        if (show) {
            // Також запуск слайдера увімкнути назад
            if(slides.length > 0 && !slideTimer) {
                slideTimer = setInterval(() => {
                    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlideIndex));
                }, 5000);
            }
        } else {
            clearInterval(slideTimer);
            slideTimer = null;
        }
    }

    function navigateToPage(targetId, customState = null) {
        // Оновлення меню лінків
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Скрол вгору
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (targetId === 'home') {
            toggleLandingSections(true);
            pages.forEach(pg => pg.classList.remove('active'));
            if (bCrumbCurrent) bCrumbCurrent.parentElement.style.display = 'none';
        } else {
            toggleLandingSections(false);
            pages.forEach(pg => {
                if (pg.id === targetId + '-page') {
                    pg.classList.add('active');
                } else {
                    pg.classList.remove('active');
                }
            });

            // Відтворення хлібних крихт
            if (bCrumbCurrent) {
                bCrumbCurrent.parentElement.style.display = 'block';
                let ukrName = 'Сайт';
                if (targetId === 'about') ukrName = 'Про лікарню';
                if (targetId === 'services') ukrName = 'Види та вартість послуг';
                if (targetId === 'meds') ukrName = 'Залишки медикаментів';
                if (targetId === 'docs') ukrName = 'Громадська прозорість';
                if (targetId === 'booking') ukrName = 'Запис на прийом';
                if (targetId === 'news') ukrName = 'Новини та Релізи';
                if (targetId === 'contacts') ukrName = 'Контактні кабінети';
                bCrumbCurrent.textContent = ukrName;
            }
        }

        // Специфічний запуск для сторінок
        if (targetId === 'about') renderDoctors('all');
        if (targetId === 'services') renderServices();
        if (targetId === 'meds') renderMeds();
        if (targetId === 'news') renderNews();
        if (targetId === 'booking') setupBookingWorkspace(customState);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateToPage(targetId);
        });
    });

    // --- ГЕНЕРАЦІЯ ЛІКАРІВ ("Про нас") ---
    const doctorsContainer = document.getElementById('doctors-grid');
    const doctorFilterBtns = document.querySelectorAll('.filter-btn');

    function renderDoctors(categoryFilter = 'all') {
        if (!doctorsContainer) return;
        doctorsContainer.innerHTML = '';

        const list = categoryFilter === 'all' 
            ? DOCTORS_DATA 
            : DOCTORS_DATA.filter(d => d.category === categoryFilter);

        list.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'doctor-card';
            card.innerHTML = `
                <div class="doctor-photo">
                    <img src="${doc.img}" alt="${doc.name}" referrerPolicy="no-referrer">
                    <span class="doctor-exp">Досвід: ${doc.exp}</span>
                </div>
                <div class="doctor-info-block">
                    <span class="doctor-badge">${doc.status}</span>
                    <h4 class="doctor-name">${doc.name}</h4>
                    <p class="doctor-specialty">${doc.spec}</p>
                    <p class="doctor-education"><strong>Освіта:</strong> ${doc.edu}</p>
                </div>
                <div class="doctor-actions">
                    <button class="doc-btn doc-btn-book" data-doc-id="${doc.id}">Запис</button>
                    <button class="doc-btn doc-btn-phone" data-phone="+380326060208">Показати тел.</button>
                </div>
            `;
            doctorsContainer.appendChild(card);
        });

        // Навішуємо кліки на кнопки всередині карток лікарів
        document.querySelectorAll('.doc-btn-book').forEach(btn => {
            btn.addEventListener('click', () => {
                const docId = btn.getAttribute('data-doc-id');
                navigateToPage('booking', { docId: parseInt(docId) });
            });
        });

        document.querySelectorAll('.doc-btn-phone').forEach(btn => {
            btn.addEventListener('click', () => {
                const ph = btn.getAttribute('data-phone');
                alert(`Номер кабінету лікаря: 032-60-60-208. Мобільна гаряча лінія: +38 (097) 43-110-29.`);
            });
        });
    }

    if (doctorFilterBtns) {
        doctorFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                doctorFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderDoctors(btn.getAttribute('data-filter'));
            });
        });
    }

    // --- ПЕРЕЛІК ПОСЛУГ (Пошук + Акордеони) ---
    const servicesSearchInput = document.getElementById('services-search');
    
    function renderServices() {
        const pmsdTbody = document.getElementById('table-pmsd-body');
        const vtorTbody = document.getElementById('table-vtor-body');

        if (pmsdTbody) {
            pmsdTbody.innerHTML = SERVICES_DATA.pmsd.map(srv => `
                <tr>
                    <td style="font-weight: 700; color: var(--text-dark);">${srv.name}</td>
                    <td style="font-family: monospace;">${srv.code}</td>
                    <td><span class="badge-price free">${srv.price}</span></td>
                </tr>
            `).join('');
        }

        if (vtorTbody) {
            vtorTbody.innerHTML = SERVICES_DATA.vtor.map(srv => `
                <tr>
                    <td style="font-weight: 700; color: var(--text-dark);">${srv.name}</td>
                    <td style="font-family: monospace;">${srv.code}</td>
                    <td><span class="badge-price ${srv.type === 'free' ? 'free' : 'paid'}">${srv.price}</span></td>
                </tr>
            `).join('');
        }

        // Акордеон логіка
        const accordions = document.querySelectorAll('.service-accordion');
        accordions.forEach(acc => {
            const trigger = acc.querySelector('.accordion-trigger');
            if (trigger) {
                // Видаляємо попередні лісенери щоб уникнути подвійного запуску
                const clone = trigger.cloneNode(true);
                trigger.parentNode.replaceChild(clone, trigger);
                clone.addEventListener('click', () => {
                    const isOpen = acc.classList.contains('open');
                    // Закриваємо решту
                    accordions.forEach(a => a.classList.remove('open'));
                    if (!isOpen) acc.classList.add('open');
                });
            }
        });
    }

    if (servicesSearchInput) {
        servicesSearchInput.addEventListener('keyup', () => {
            const query = servicesSearchInput.value.toLowerCase();
            const rows = document.querySelectorAll('.service-table tbody tr');
            
            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // --- ЗАЛИШКИ МЕДИКАМЕНТІВ (Фільтр по пошуку) ---
    const medsSearchInput = document.getElementById('meds-search');
    const medsTableBody = document.getElementById('meds-table-body');

    function renderMeds() {
        if (!medsTableBody) return;
        medsTableBody.innerHTML = '';

        const query = medsSearchInput ? medsSearchInput.value.toLowerCase() : '';

        const filtered = MEDS_DATA.filter(med => 
            med.name.toLowerCase().includes(query) || 
            med.active.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            medsTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-light); padding: 30px;">Збігів не знайдено... Спробуйте іншу назву препарату</td></tr>`;
            return;
        }

        filtered.forEach(med => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 700; color: var(--text-dark);">${med.name}</td>
                <td><span style="background-color: #f0f4f1; padding: 4px 10px; border-radius: 6px; font-weight:600;">${med.quantity}</span></td>
                <td><span class="badge-stock ${med.low ? 'low' : ''}">${med.limit}</span></td>
                <td style="color:var(--text-light); font-size:12px;">${med.active}</td>
            `;
            medsTableBody.appendChild(tr);
        });
    }

    if (medsSearchInput) {
        medsSearchInput.addEventListener('keyup', renderMeds);
    }

    // --- ЗАПИС НА ПРИЙОМ: Налаштування робочої зони ---
    const bookDoctorSelect = document.getElementById('book-doctor');
    const bookSlotsContainer = document.getElementById('book-slots-container');
    const bForm = document.getElementById('appointment-booking-form');
    const bookingsTableBody = document.getElementById('my-bookings-list');
    let selectedActiveSlotTime = '';

    function setupBookingWorkspace(customState = null) {
        if (!bookDoctorSelect) return;

        // Генерація списку лікарів у select
        bookDoctorSelect.innerHTML = '<option value="">-- Оберіть вашого лікаря --</option>' + 
            DOCTORS_DATA.map(d => `<option value="${d.id}">${d.name} (${d.spec})</option>`).join('');

        if (customState && customState.docId) {
            bookDoctorSelect.value = customState.docId;
            generateTimeSlots();
        }

        bookDoctorSelect.removeEventListener('change', generateTimeSlots);
        bookDoctorSelect.addEventListener('change', generateTimeSlots);

        renderBookingsList();
    }

    function generateTimeSlots() {
        if (!bookSlotsContainer) return;
        bookSlotsContainer.innerHTML = '';
        selectedActiveSlotTime = '';

        const selectedDoc = bookDoctorSelect.value;
        if (!selectedDoc) {
            bookSlotsContainer.innerHTML = '<p style="font-size:11px; color:var(--text-light)">Будь ласка, спочатку оберіть лікаря...</p>';
            return;
        }

        // Рандомна генерація доступних слотів
        const hours = ['08:30', '09:00', '09:45', '10:30', '11:15', '13:00', '13:45', '14:30', '15:15', '16:00'];
        hours.forEach(hr => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'slot-btn';
            btn.textContent = hr;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedActiveSlotTime = hr;
            });
            bookSlotsContainer.appendChild(btn);
        });
    }

    if (bForm) {
        bForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const docId = bookDoctorSelect.value;
            const patientName = document.getElementById('book-name').value;
            const patientPhone = document.getElementById('book-phone').value;
            const bookDate = document.getElementById('book-date').value;
            const hasDeclaration = document.getElementById('book-declaration').checked;

            if (!docId) {
                alert('Будь ласка, оберіть лікаря зі списку!');
                return;
            }
            if (!bookDate) {
                alert('Вкажіть бажану дату прийому!');
                return;
            }
            if (!selectedActiveSlotTime) {
                alert('Цей лікар вимагає обрати конкретний час! Будь ласка, оберіть вільний часовий слот у відповідному блоці.');
                return;
            }
            if (!patientName || !patientPhone) {
                alert('Необхідно заповнити контактне ім`я та телефон пацієнта!');
                return;
            }

            const doc = DOCTORS_DATA.find(d => d.id === parseInt(docId));

            const newBooking = {
                id: Date.now(),
                doctorName: doc.name,
                doctorSpec: doc.spec,
                patientName: patientName,
                phone: patientPhone,
                date: bookDate,
                time: selectedActiveSlotTime,
                declaration: hasDeclaration ? 'Є діюча декларація' : 'Реєстрація на місці'
            };

            bookingsStore.unshift(newBooking);
            localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookingsStore));

            bForm.reset();
            selectedActiveSlotTime = '';
            if (bookSlotsContainer) bookSlotsContainer.innerHTML = '';
            
            renderBookingsList();

            alert(`✅ Вітаємо! Запис успішно створено.\n\nЛікар: ${doc.name}\nДата: ${bookDate}\nЧас: ${newBooking.time}\n\nБудь ласка, прибудьте до реєстратури за 10 хвилин до прийому.`);
        });
    }

    function renderBookingsList() {
        if (!bookingsTableBody) return;
        bookingsTableBody.innerHTML = '';

        if (bookingsStore.length === 0) {
            bookingsTableBody.innerHTML = `
                <div style="text-align:center; padding: 25px 15px; background-color: var(--bg-light); border-radius:12px; border:1px dashed #ccc;">
                    <p style="font-size:12px; color:var(--text-light); font-weight:600;">Немає активних записів</p>
                    <p style="font-size:11px; color:#999; margin-top:4px;">Ваші спроби бронювання з'являться тут у реальному часі.</p>
                </div>
            `;
            return;
        }

        bookingsStore.forEach(book => {
            const card = document.createElement('div');
            card.style.backgroundColor = '#fdfdfd';
            card.style.border = '1px solid #eaeaea';
            card.style.borderRadius = '10px';
            card.style.padding = '15px';
            card.style.marginBottom = '10px';
            card.style.position = 'relative';

            card.innerHTML = `
                <button class="delete-book-btn" data-id="${book.id}" style="position:absolute; top:12px; right:12px; background:none; border:none; color:#cc3333; font-weight:bold; cursor:pointer;" title="Скасувати">&#10006;</button>
                <div style="font-size:11px; text-transform:uppercase; color:var(--primary-color); font-weight:800; margin-bottom:5px;">${book.declaration}</div>
                <h4 style="font-size:14px; font-weight:750; color:var(--text-dark); margin-bottom:4px;">${book.doctorName}</h4>
                <p style="font-size:11px; color:var(--text-light); margin-bottom:8px;">${book.doctorSpec}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; border-top:1px solid #f0f0f0; padding-top:8px;">
                    <div><strong style="color:var(--text-dark)">${book.date}</strong> в <span style="background-color:rgba(1, 110, 42, 0.1); padding:2px 6px; border-radius:4px; font-weight:bold; color:var(--primary-color)">${book.time}</span></div>
                    <div style="color:#777; font-size:11px;">Пацієнт: ${book.patientName.split(' ')[0]}</div>
                </div>
            `;
            bookingsTableBody.appendChild(card);
        });

        // Видалення
        document.querySelectorAll('.delete-book-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseFloat(btn.getAttribute('data-id'));
                if (confirm('Ви дійсно бажаєте скасувати цей запис до лікаря?')) {
                    bookingsStore = bookingsStore.filter(b => b.id !== id);
                    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookingsStore));
                    renderBookingsList();
                }
            });
        });
    }

    // --- СТОРІНКА НОВИН: Відтворення та розгорнута перегляд сторінки ---
    const newsGrid = document.getElementById('news-grid-container');
    const readArticleSec = document.getElementById('read-article-section');

    function renderNews() {
        if (!newsGrid) return;
        newsGrid.innerHTML = '';
        if (readArticleSec) readArticleSec.classList.remove('show');

        NEWS_DATA.forEach(n => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <div class="news-img">
                    <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400" alt="News Image" referrerPolicy="no-referrer">
                </div>
                <div class="news-body">
                    <div class="news-meta">
                        <span class="cat">${n.cat}</span>
                        <span>${n.date}</span>
                    </div>
                    <h4 class="news-title">${n.title}</h4>
                    <p class="news-summary">${n.desc}</p>
                </div>
                <div class="news-footer">
                    <span>Переглядів: ~124</span>
                    <button class="btn-download open-full-news" data-id="${n.id}" style="padding: 5px 12px; border-radius:4px;">Читати повністю</button>
                </div>
            `;
            newsGrid.appendChild(card);
        });

        document.querySelectorAll('.open-full-news').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const article = NEWS_DATA.find(x => x.id === id);
                if (article) {
                    showFullArticle(article);
                }
            });
        });
    }

    function showFullArticle(article) {
        if (!readArticleSec) return;
        newsGrid.style.display = 'none';
        
        readArticleSec.innerHTML = `
            <button class="btn-secondary" id="back-to-news-list-btn" style="margin-bottom:20px; color:var(--text-dark); border-color:#ccc; display:flex; align-items:center; gap:6px;">&#8592; Назад до списку новин</button>
            <div style="font-size:11px; text-transform:uppercase; color:var(--primary-color); font-weight:800; margin-bottom:10px;">Категорія: ${article.cat} | Дата публікації: ${article.date}</div>
            <h2 style="font-size:26px; font-weight:900; color:var(--text-dark); line-height:1.3; margin-bottom:20px;">${article.title}</h2>
            <div style="border-radius:12px; overflow:hidden; height:320px; margin-bottom:25px; background-color:#eaeaea;">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" alt="Article banner" style="width:100%; height:100%; object-fit:cover;" referrerPolicy="no-referrer">
            </div>
            <p style="font-size:16px; font-weight:500; font-style:italic; border-left:4px solid var(--primary-light); padding-left:15px; margin-bottom:25px; color:#555;">${article.desc}</p>
            <div style="font-size:14px; color:#333; line-height:1.7; white-space:pre-line;">${article.text}</div>
        `;
        
        readArticleSec.classList.add('show');

        document.getElementById('back-to-news-list-btn').addEventListener('click', () => {
            readArticleSec.classList.remove('show');
            newsGrid.style.display = 'grid';
        });
    }


    // --- ПОВЕРНЕННЯ ДО ГОЛОВНОЇ ЗА КЛІКОМ НА ЛОГО ---
    const logoTrigger = document.getElementById('logo-home-trigger');
    if (logoTrigger) {
        logoTrigger.addEventListener('click', () => {
            navigateToPage('home');
        });
    }

    // --- КНОПКА ЗАПИС НА СЛАЙДЕРІ / ПЛИТКАХ ---
    document.querySelectorAll('.open-booking-direct').forEach(bt => {
        bt.addEventListener('click', () => navigateToPage('booking'));
    });

    // --- ЗВОРОТНИЙ ЗВ'ЯЗОК НА ФОРМІ КОНТАКТІВ ---
    const contactForm = document.getElementById('contacts-feedback-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('c-name').value;
            const phone = document.getElementById('c-phone').value;
            const text = document.getElementById('c-text').value;

            if(!name || !phone || !text) {
                alert('Будь ласка, заповніть усі обов`язкові поля форми зворотного зв’язку!');
                return;
            }

            alert(`Дякуємо, ${name}! Ваше повідомлення успішно надіслано до адміністрації КНП "Моршинська міська лікарня".\n\nЧерговий оператор зв'яжеться з вами найближчим часом за номером: ${phone}.`);
            contactForm.reset();
        });
    }
});
