import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Info,
  QrCode,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import Seal from '../components/Seal';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM'];
const serviceOptions = [
  'Barangay Clearance / Certificate',
  'Certificate of Indigency',
  'Certificate of Residency',
  'Business Clearance',
  'Lupon Mediation Consultation',
];

function getNextMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}

function getFirstAvailableDate(month) {
  const today = new Date();
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  for (let day = 1; day <= new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); day += 1) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    if (date > new Date(today.getFullYear(), today.getMonth(), today.getDate()) && date.getDay() !== 0 && date.getDay() !== 6) {
      return date;
    }
  }
  return firstDay;
}

function formatDate(date, options = { year: 'numeric', month: 'long', day: '2-digit' }) {
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function ResidentHeader() {
  return (
    <header className="resident-home-header">
      <div className="resident-home-brand"><Seal size={42} /><div><strong>Barangay Amanoaoac</strong><span>Municipality of Mapandan</span></div></div>
      <nav className="resident-home-nav" aria-label="Main navigation">
        <Link to="/resident/home">Home</Link>
        <Link to="/resident/announcements">Announcements</Link>
        <Link to="/resident/services">Online Services</Link>
        <Link className="selected" to="/resident/appointments">Appointments</Link>
        <Link to="/resident/feedback">Citizen Feedback</Link>
        <Link to="/resident/hotlines">Emergency Hotlines</Link>
      </nav>
      <div className="resident-home-user"><span className="resident-avatar">MS</span><span className="resident-user-name">Maria Santos</span><span className="verified"><BadgeCheck size={12} /> Verified Resident</span><Link to="/login" className="resident-logout">Log Out</Link></div>
    </header>
  );
}

export default function ResidentAppointments() {
  const [month, setMonth] = useState(getNextMonth);
  const [selectedDate, setSelectedDate] = useState(() => getFirstAvailableDate(getNextMonth()));
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);
  const [service, setService] = useState(serviceOptions[0]);
  const [purpose, setPurpose] = useState('Application for Scholarship requirements and Local Employment Clearance');
  const [confirmed, setConfirmed] = useState(false);

  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const calendarCells = useMemo(() => [
    ...Array.from({ length: firstWeekday }, (_, index) => ({ key: `empty-${index}`, empty: true })),
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      key: `day-${index + 1}`,
      day: index + 1,
      date: new Date(month.getFullYear(), month.getMonth(), index + 1),
    })),
  ], [daysInMonth, firstWeekday, month]);

  const isAvailableDate = (date) => {
    const today = new Date();
    const isFutureDate = date > new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return isFutureDate && date.getDay() !== 0 && date.getDay() !== 6;
  };

  function changeMonth(offset) {
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    setMonth(nextMonth);
    const firstAvailable = getFirstAvailableDate(nextMonth);
    setSelectedDate(firstAvailable);
    setConfirmed(false);
  }

  function handleBooking(event) {
    event.preventDefault();
    setConfirmed(true);
  }

  function downloadCalendarFile() {
    const start = new Date(selectedDate);
    const [time, meridiem] = selectedTime.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    start.setHours((hour % 12) + (meridiem === 'PM' ? 12 : 0), minute, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const toCalendarDate = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const calendarFile = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Barangay Amanoaoac//Appointments//EN',
      'BEGIN:VEVENT',
      `DTSTART:${toCalendarDate(start)}`,
      `DTEND:${toCalendarDate(end)}`,
      'SUMMARY:Barangay Amanoaoac Appointment',
      `DESCRIPTION:${service} - ${purpose.replace(/\n/g, ' ')}`,
      'LOCATION:Barangay Hall, Session Room, Purok 1',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const file = new Blob([calendarFile], { type: 'text/calendar;charset=utf-8' });
    const fileUrl = URL.createObjectURL(file);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'amanoaoac-appointment.ics';
    downloadLink.click();
    URL.revokeObjectURL(fileUrl);
  }

  const reference = `#APT-${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}${String(selectedDate.getDate()).padStart(2, '0')}-09`;

  return (
    <div className="resident-home resident-appointments-page">
      <ResidentHeader />
      <main>
        <div className="appointment-page-heading"><h1>Book Barangay Appointment</h1><span><span /> Live Slot Synchronization Active</span></div>
        <form className="appointment-layout" onSubmit={handleBooking}>
          <section className="appointment-form-panel">
            <div className="appointment-field">
              <label htmlFor="appointment-service">1. Select Official / Public Service <b>*</b></label>
              <small>Designate the department or barangay council officer responsible for your request.</small>
              <select id="appointment-service" value={service} onChange={(event) => { setService(event.target.value); setConfirmed(false); }}>
                {serviceOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>

            <div className="appointment-field">
              <div className="appointment-field-heading"><div><label>2. Select Preferred Date &amp; Time Slot <b>*</b></label><small>Only green dates are available for public consultations and document releases.</small></div><span>{formatDate(month, { month: 'long', year: 'numeric' })}</span></div>
              <div className="appointment-calendar">
                <div className="calendar-heading"><strong><CalendarDays size={15} /> {formatDate(month, { month: 'long', year: 'numeric' })}</strong><div><button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} disabled={new Date(month.getFullYear(), month.getMonth(), 1) <= new Date(new Date().getFullYear(), new Date().getMonth(), 1)}><ChevronLeft size={14} /></button><button type="button" aria-label="Next month" onClick={() => changeMonth(1)}><ChevronRight size={14} /></button></div></div>
                <div className="calendar-grid weekday-row">{weekdayLabels.map((day) => <span key={day}>{day}</span>)}</div>
                <div className="calendar-grid date-grid">{calendarCells.map((cell) => cell.empty
                  ? <span className="calendar-empty" key={cell.key} />
                  : <button type="button" key={cell.key} disabled={!isAvailableDate(cell.date)} className={`${isAvailableDate(cell.date) ? 'date-available' : 'date-unavailable'} ${selectedDate.toDateString() === cell.date.toDateString() ? 'date-selected' : ''}`} onClick={() => { setSelectedDate(cell.date); setConfirmed(false); }}>{cell.day}</button>)}</div>
                <div className="calendar-legend"><span><i className="available-key" /> Available</span><span><i className="selected-key" /> Selected</span><span><i className="unavailable-key" /> Fully Booked / Weekend</span></div>
              </div>
              <div className="time-slots-heading">Available Time Slot for {formatDate(selectedDate, { month: 'short', day: '2-digit', year: 'numeric' })}</div>
              <div className="appointment-time-slots">{timeSlots.map((time) => <button type="button" className={selectedTime === time ? 'selected' : ''} key={time} onClick={() => { setSelectedTime(time); setConfirmed(false); }}><Clock3 size={12} /> {time}</button>)}</div>
            </div>

            <div className="appointment-field purpose-field">
              <label htmlFor="appointment-purpose">3. Purpose of Appointment / Citizen Narrative <b>*</b></label>
              <small>State the specific transaction, document requirement, or matter to be discussed.</small>
              <textarea id="appointment-purpose" value={purpose} onChange={(event) => { setPurpose(event.target.value); setConfirmed(false); }} required />
            </div>

            <div className="citizen-checklist"><Info size={14} /><div><strong>Citizen Checklist Notice</strong><p>Please arrive 15 minutes before your schedule at the Barangay Hall lobby. Bring 1 valid government ID and this appointment pass (digital or printed).</p></div></div>
            <button className="confirm-booking" type="submit"><UserRound size={14} /> {confirmed ? 'Appointment Pass Preview Updated' : 'Confirm Booking & Generate Pass Preview'}</button>
          </section>

          <aside className="appointment-pass-column">
            <div className="appointment-pass-heading"><h2>Appointment Pass Preview</h2><span className={confirmed ? 'pass-status confirmed' : 'pass-status'}><BadgeCheck size={11} /> {confirmed ? 'Preview Updated' : 'Preview Only'}</span></div>
            <article className="appointment-pass-card">
              <header className="pass-card-header"><div><small><ShieldCheck size={10} /> OFFICIAL BARANGAY PASS</small><strong>Barangay Amanoaoac</strong><span>Municipality of Mapandan, Pangasinan</span></div><span className="pass-seal"><ShieldCheck size={18} /></span></header>
              <div className="pass-details">
                <div className="pass-reference"><small>SLIP REFERENCE</small><strong>{reference}</strong><QrCode size={17} /></div>
                <div className="pass-detail-row"><span>Verified Resident:</span><strong>Maria Santos<small>AMN-2024-0891</small></strong></div>
                <div className="pass-detail-row"><span>Requested Service:</span><strong>{service}</strong></div>
                <div className="pass-detail-row"><span>Scheduled Date &amp; Time:</span><strong>{formatDate(selectedDate, { month: 'long', day: '2-digit', year: 'numeric' })} • {selectedTime}</strong></div>
                <div className="pass-detail-row"><span>Presiding Officer:</span><strong>Hon. Rolando Ramos / Sec. Ricardo Dizon</strong></div>
                <div className="pass-detail-row"><span>Venue:</span><strong>Barangay Hall, Session Room, Purok 1</strong></div>
                <div className="pass-qr-panel"><div className="pass-qr"><QrCode size={83} strokeWidth={1.8} /></div><small>Scan at Barangay Hall Reception Turnstile</small></div>
                <div className="pass-actions"><button type="button" onClick={() => window.print()}><Download size={12} /> Download / Print Slip</button><button type="button" onClick={downloadCalendarFile}><CalendarDays size={12} /> Add to Calendar</button></div>
              </div>
            </article>
            <div className="appointment-reminder"><span><CalendarDays size={17} /></span><div><strong>SMS Reminder Preview</strong><p>SMS reminders are not active yet. They can be sent 24 hours before your appointment after system integration.</p></div></div>
            <div className="appointment-preview-note"><Info size={13} /> Demo only: this page does not save an appointment, issue a scannable pass, or send SMS reminders.</div>
          </aside>
        </form>
      </main>
      <footer className="resident-home-footer">
        <div className="resident-footer-columns">
          <div className="resident-footer-about"><div><Seal size={32} /><strong>Amanoaoac Portal</strong></div><p>Empowering the residents of Barangay Amanoaoac with transparent, responsive, and prompt community public governance.</p><small>Barangay Hall, Amanoaoac, Mapandan, Pangasinan 2429</small></div>
          <div><h3>Quick Navigation</h3><Link to="/resident/home">Barangay Home</Link><Link to="/resident/services">e-Clearance &amp; Certificates</Link><Link to="/resident/appointments">Book Barangay Appointment</Link><Link to="/resident/announcements">Public Advisories</Link></div>
          <div><h3>Emergency Hotlines</h3><a href="tel:09170002661">Barangay Patrol: 0917-000-AMN1</a><a href="tel:0755692199">Mapandan Police: (075) 569-2199</a><a href="tel:0755692041">BFP Mapandan: (075) 569-2041</a><a href="tel:0755692234">RHU Mapandan: (075) 569-2234</a></div>
        </div>
        <p className="resident-footer-copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p>
      </footer>
    </div>
  );
}
