// ==========================================================
// Mobil navigáció (hamburger menü)
// ==========================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Menü bezárása, ha egy linkre kattintunk (mobil nézetben)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// ==========================================================
// Nyelvválasztó legördülő menü
// ==========================================================
const langSwitch = document.querySelector('.lang-switch');
const langToggle = document.getElementById('langToggle');

if (langSwitch && langToggle) {
  langToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = langSwitch.classList.toggle('open');
    langToggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', () => {
    langSwitch.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      langSwitch.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ==========================================================
// Aktuális év a láblécben
// ==========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================================
// Demó naptár widget (időpontfoglalás szekció)
// Ez csak vizuális elem, nincs mögötte valódi foglalási logika.
// Csak azokon az oldalakon fut, ahol még nincs élő Cal.com widget
// beágyazva (a hiányzó elemeket lekérdezve null-t kapnánk, ezért
// az egész blokk egy létezés-ellenőrzés mögé van téve).
// A zárva tartó napok a nyitvatartás szekcióval egyeznek
// (hétfő = 1, vasárnap = 0, a JS getDay() alapján).
// ==========================================================
const calendarTitle = document.getElementById('calendarTitle');
const calendarGrid = document.getElementById('calendarGrid');
const bookingMessage = document.getElementById('bookingMessage');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

if (calendarTitle && calendarGrid && bookingMessage && prevMonthBtn && nextMonthBtn) {
  const CLOSED_WEEKDAYS = [0, 1]; // vasárnap, hétfő

  // Fordítások: a <html lang="hu|en|de"> attribútum alapján választjuk ki,
  // hogy a naptár JS-ből generált szövegei (hónapnevek, kattintásra megjelenő
  // üzenet) melyik nyelven jelenjenek meg. A statikus szövegek (nav, gombok,
  // stb.) magukban a hu/en/de HTML fájlokban vannak lefordítva.
  const TRANSLATIONS = {
    hu: {
      months: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
        'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
      demoMessage: (day, month) =>
        `Ez egy demó naptár – a(z) ${day}. ${month} napra még nem lehet élesben foglalni. ` +
        `Hívj minket telefonon az időpont egyeztetéséhez!`
    },
    en: {
      months: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
      demoMessage: (day, month) =>
        `This is a demo calendar – ${month} ${day} can't be booked live yet. ` +
        `Please call us to arrange your appointment!`
    },
    de: {
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      demoMessage: (day, month) =>
        `Dies ist ein Demo-Kalender – für den ${day}. ${month} kann noch nicht live gebucht werden. ` +
        `Bitte rufen Sie uns an, um einen Termin zu vereinbaren!`
    }
  };

  const currentLang = TRANSLATIONS[document.documentElement.lang] ? document.documentElement.lang : 'hu';
  const t = TRANSLATIONS[currentLang];
  const monthNames = t.months;

  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const renderCalendar = (year, month) => {
    calendarGrid.innerHTML = '';
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    // Hétfő induló héthez igazítjuk az indexet (0 = hétfő ... 6 = vasárnap)
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar-day empty';
      calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const cell = document.createElement('div');
      cell.textContent = day;
      cell.className = 'calendar-day';

      const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isClosed = CLOSED_WEEKDAYS.includes(cellDate.getDay());
      const isToday = cellDate.toDateString() === today.toDateString();

      if (isToday) cell.classList.add('today');

      if (isPast) {
        cell.classList.add('past');
      } else if (isClosed) {
        cell.classList.add('closed');
      } else {
        cell.classList.add('available');
        cell.addEventListener('click', () => {
          bookingMessage.textContent = t.demoMessage(day, monthNames[month]);
        });
      }

      calendarGrid.appendChild(cell);
    }
  };

  prevMonthBtn.addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
    renderCalendar(viewYear, viewMonth);
  });

  nextMonthBtn.addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
    renderCalendar(viewYear, viewMonth);
  });

  renderCalendar(viewYear, viewMonth);
}

// ==========================================================
// Cal.com foglalási fülek (Időpontfoglalás szekció)
// Több beágyazott Cal.com widget közül lehet választani szolgáltatásonként.
// ==========================================================
const calTabs = document.querySelectorAll('.cal-tab');

if (calTabs.length) {
  calTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      calTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.service-cal').forEach(embed => {
        const isActive = embed.id === tab.dataset.target;
        embed.classList.toggle('active', isActive);
        // Inline stílussal biztosítjuk a váltást, mert a Cal.com saját
        // beágyazó szkriptje "cal-embed" osztályt is használ a belső
        // elemein, ami CSS-ütközést okozna egy sima osztály-alapú
        // display:none/block szabállyal.
        embed.style.display = isActive ? 'block' : 'none';
      });
    });
  });
}
