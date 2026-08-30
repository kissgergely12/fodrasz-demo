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
// Aktuális év a láblécben
// ==========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================================================
// Demó naptár widget (időpontfoglalás szekció)
// Ez csak vizuális elem, nincs mögötte valódi foglalási logika.
// A zárva tartó napok a nyitvatartás szekcióval egyeznek
// (hétfő = 1, vasárnap = 0, a JS getDay() alapján).
// ==========================================================
const CLOSED_WEEKDAYS = [0, 1]; // vasárnap, hétfő

const calendarTitle = document.getElementById('calendarTitle');
const calendarGrid = document.getElementById('calendarGrid');
const bookingMessage = document.getElementById('bookingMessage');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

const monthNames = [
  'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
];

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();

function renderCalendar(year, month) {
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
        bookingMessage.textContent =
          `Ez egy demó naptár – a(z) ${day}. ${monthNames[month]} napra még nem lehet élesben foglalni. ` +
          `Hívj minket telefonon az időpont egyeztetéséhez!`;
      });
    }

    calendarGrid.appendChild(cell);
  }
}

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
