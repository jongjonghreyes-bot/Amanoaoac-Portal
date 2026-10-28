import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  MapPin,
  Megaphone,
  MessageSquareText,
  Phone,
  Search,
  ShieldCheck,
  Siren,
} from 'lucide-react';
import Seal from '../components/Seal';

const categories = ['All Advisories', 'Health', 'Disaster Alerts', 'Ordinances', 'Youth & Sports', 'Agriculture & Aid'];

const bulletins = [
  {
    category: 'Health',
    label: 'Health Care',
    date: 'Nov 15, 2025',
    location: 'Amanoaoac Covered Court',
    title: 'Schedule for Free Anti-Rabies Vaccination Drive for Pets (Dogs and Cats)',
    summary: 'Organized by the Municipal Rural Health Unit in close coordination with the Sangguniang Barangay. Pet owners are advised to bring their pets.',
    detail: 'Requirement: Pet must be at least 3 months old',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80',
    action: 'Details & Guidelines',
  },
  {
    category: 'Youth & Sports',
    label: 'Liga',
    date: 'Nov 20, 2025',
    location: 'Barangay Plaza Gymnasium',
    title: 'Sangguniang Kabataan (SK) Inter-Purok Basketball & Volleyball League 2025 Opening Ceremony',
    summary: 'The annual grassroots sports fellowship kicks off this month to encourage camaraderie, healthy lifestyles, and drug-free community involvement among youth.',
    detail: 'Team lineup registration closes Nov 17',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=700&q=80',
    action: 'View Tournament Brackets',
  },
  {
    category: 'Ordinances',
    label: 'Ord. #04',
    date: 'Enacted Council Policy',
    location: 'Dr. Solid Waste Sector',
    title: 'Barangay Ordinance No. 04-2025: Strict Implementation of Proper Waste Segregation & “Tapat Ko, Linis Ko” Policy',
    summary: 'Mandatory segregation at source: Biodegradable, non-biodegradable, and recyclable items. Includes scheduled trash truck pickups and penalty matrix.',
    detail: '1st Offense: Warning | 2nd Offense: P1,000 fine',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80',
    action: 'Download PDF Schedule',
  },
  {
    category: 'Agriculture & Aid',
    label: 'Ayuda',
    date: 'Nov 28, 2025',
    location: 'Barangay Multi-Purpose Hall',
    title: 'Senior Citizens Quarterly Pension & Wellness Pack Distribution',
    summary: 'Registered senior citizen beneficiaries under OSCA Mapandan are requested to bring their Senior ID and original OSCA passbook. Authorized representatives may claim with valid documents.',
    detail: 'Time: 8:00 AM – 3:00 PM (Staggered by Purok)',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=80',
    action: 'Verification List',
  },
  {
    category: 'Agriculture & Aid',
    label: 'Agriculture',
    date: 'Dec 02, 2025',
    location: 'Municipal Agriculture Office',
    title: 'Distribution of Certified High-Yield Palay Seeds for Amanoaoac Farmers',
    summary: 'In coordination with the Municipal Agriculture Office, registered farmers enrolled under the RSBS system will receive hybrid and inbred seeds.',
    detail: 'RSBSA Registration Required',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80',
    action: 'View Masterlist',
  },
  {
    category: 'Disaster Alerts',
    label: 'Flood Alert',
    date: 'Today, 08:30 AM',
    location: 'Purok 1 to 7',
    title: 'Pre-Emptive Flood Preparedness Advisory for Purok 1 to 7',
    summary: 'Stage 2 pre-emptive readiness is in effect. Designated evacuation centers: Amanoaoac Covered Court and Elementary School Annex.',
    detail: 'Keep emergency kits ready and follow barangay advisories.',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aacb?auto=format&fit=crop&w=700&q=80',
    action: 'View Safety Guide',
  },
];

const events = [
  { month: 'NOV', day: '17', title: 'Regular Council Session', time: '9:00 AM • Barangay Session Hall' },
  { month: 'DEC', day: '01', title: 'Annual Barangay Budget Hearing', time: '1:30 PM • Open to Public' },
];

function ResidentHeader() {
  return (
    <>
      <header className="resident-home-header">
        <div className="resident-home-brand"><Seal size={42} /><div><strong>Barangay Amanoaoac</strong><span>Mapandan, Pangasinan</span></div></div>
        <nav className="resident-home-nav" aria-label="Main navigation">
          <Link to="/resident/home">Home</Link>
          <Link className="selected" to="/resident/announcements">Announcements</Link>
          <Link to="/resident/services">Online Services</Link>
          <Link to="/resident/appointments">Appointments</Link>
          <Link to="/resident/feedback">Citizen Feedback</Link>
          <Link to="/resident/hotlines">Emergency Hotlines</Link>
        </nav>
        <div className="resident-home-user"><span className="resident-avatar">MS</span><span className="resident-user-name">Maria Santos</span><span className="verified"><BadgeCheck size={12} /> Verified Resident</span><Link to="/login" className="resident-logout">Log Out</Link></div>
      </header>
      <div className="resident-live-strip"><span className="live-label"><span /> LIVE ADVISORY</span><span>Barangay Hall Open Hours: Monday to Friday, 8:00 AM – 5:00 PM</span><span className="strip-cert"><ShieldCheck size={12} /> ISO Civic Standard Certified</span><span className="strip-cert"><BadgeCheck size={12} /> Public Transparency Seal</span></div>
    </>
  );
}

export default function ResidentAnnouncements() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [phone, setPhone] = useState('');
  const [purok, setPurok] = useState('Purok 1 (Riverside)');

  const filteredBulletins = useMemo(() => bulletins.filter((bulletin) => {
    const matchesCategory = activeCategory === 'All Advisories' || bulletin.category === activeCategory;
    const searchText = `${bulletin.title} ${bulletin.summary} ${bulletin.category} ${bulletin.location}`.toLowerCase();
    return matchesCategory && searchText.includes(search.toLowerCase());
  }), [activeCategory, search]);

  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(filteredBulletins.length / pageSize));
  const visibleBulletins = filteredBulletins.slice((page - 1) * pageSize, page * pageSize);

  function changeCategory(category) {
    setActiveCategory(category);
    setPage(1);
  }

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function subscribe(event) {
    event.preventDefault();
    if (phone.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <div className="resident-home resident-bulletins-page">
      <ResidentHeader />
      <main>
        <section className="bulletins-hero">
          <span><Megaphone size={13} /> BARANGAY PUBLIC INFORMATION &amp; ANNOUNCEMENTS</span>
          <h1>Community News &amp; Public Bulletins</h1>
          <p>Stay informed with verified advisories, health drives, community ordinances, and public announcements directly from Barangay Amanoaoac.</p>
          <div className="bulletin-tools">
            <label className="bulletin-search"><Search size={15} /><input value={search} onChange={(event) => changeSearch(event.target.value)} placeholder="Search bulletins" aria-label="Search bulletins" /></label>
            <div className="bulletin-categories" aria-label="Filter bulletins by category">
              {categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => changeCategory(category)}>{category}</button>)}
            </div>
          </div>
        </section>

        <section className="urgent-advisory">
          <span className="urgent-icon"><Siren size={18} /></span>
          <div className="urgent-copy"><small>URGENT FLOOD ADVISORY <span>• Today 08:30 AM</span></small><h2>Pre-Emptive Flood Preparedness for Purok 1 to 7</h2><p>Stage 2 pre-emptive readiness in effect. Designated evacuation centers: Amanoaoac Covered Court and Elementary School Annex.</p></div>
          <a href="tel:0755682000"><Phone size={13} /> Hotline: (075) 568-2000</a>
        </section>

        <div className="bulletins-content-grid">
          <section className="bulletin-list" aria-label="Public bulletins">
            {visibleBulletins.length > 0 ? visibleBulletins.map((bulletin) => (
              <article className="bulletin-card" key={bulletin.title}>
                <div className="bulletin-image" style={{ backgroundImage: `url("${bulletin.image}")` }}><span>{bulletin.label}</span></div>
                <div className="bulletin-card-content"><small className="bulletin-meta"><span><CalendarDays size={12} /> {bulletin.date}</span><span><MapPin size={12} /> {bulletin.location}</span></small><h2>{bulletin.title}</h2><p>{bulletin.summary}</p><div className="bulletin-card-foot"><span>{bulletin.detail}</span><a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph?subject=Bulletin%20Inquiry">{bulletin.action} <ArrowRight size={12} /></a></div></div>
              </article>
            )) : <div className="bulletin-empty"><Search size={24} /><strong>No bulletins found</strong><span>Try another search term or category.</span></div>}

            <div className="bulletin-pagination"><span>Showing {visibleBulletins.length} of {filteredBulletins.length} Official Bulletins</span><div><button aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft size={14} /></button><span className="page-number">{page} / {pageCount}</span><button aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((current) => current + 1)}><ChevronRight size={14} /></button></div></div>
          </section>

          <aside className="bulletin-sidebar">
            <section className="bulletin-side-card sms-card">
              <h2><MessageSquareText size={16} /> SMS Alert Registration</h2>
              <p>Receive official typhoon, health, and barangay notices right on your mobile phone.</p>
              <form onSubmit={subscribe}>
                <label className="sms-phone"><span>+63</span><input type="tel" inputMode="numeric" value={phone} onChange={(event) => { setPhone(event.target.value); setSubscribed(false); }} placeholder="912 345 6789" aria-label="Mobile number" required /></label>
                <select aria-label="Select purok" value={purok} onChange={(event) => setPurok(event.target.value)}><option>Purok 1 (Riverside)</option><option>Purok 2 (Centro)</option><option>Purok 3 (School Zone)</option><option>Purok 4 (West)</option><option>Purok 5 (East)</option><option>Purok 6 (North)</option><option>Purok 7 (South)</option></select>
                <button type="submit"><BellRing size={13} /> {subscribed ? 'Subscribed to SMS alerts' : 'Subscribe to SMS'}</button>
              </form>
            </section>

            <section className="bulletin-side-card events-card">
              <h2><CalendarDays size={16} /> Upcoming Barangay Events</h2>
              {events.map((event) => <div className="upcoming-event" key={event.title}><span><b>{event.month}</b><strong>{event.day}</strong></span><div><strong>{event.title}</strong><small>{event.time}</small></div></div>)}
            </section>

            <section className="bulletin-side-card downloads-card">
              <h2><Download size={16} /> Citizen Downloadables</h2>
              <a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph?subject=Clearance%20Application%20Form"><FileText size={13} /> Clearance Application Form (PDF) <Download size={12} /></a>
              <a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph?subject=Certificate%20of%20Indigency%20Form"><FileText size={13} /> Certificate of Indigency Form (PDF) <Download size={12} /></a>
            </section>
          </aside>
        </div>
      </main>

      <footer className="resident-home-footer">
        <div className="resident-footer-columns">
          <div className="resident-footer-about"><div><Seal size={32} /><strong>Barangay Amanoaoac</strong></div><p>Official Civic Governance and Citizen Services Gateway of Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Committed to integrity, transparency, and responsive community service.</p><small>Barangay Hall Complex, Amanoaoac, Mapandan, Pangasinan 2429</small></div>
          <div><h3>Citizen Access</h3><Link to="/resident/services">Barangay Clearance &amp; IDs</Link><Link to="/resident/services">Certificate of Indigency</Link><Link to="/resident/announcements">Community Bulletins &amp; Ordinances</Link><Link to="/resident/hotlines">MDRRMO &amp; Emergency Dispatch</Link></div>
          <div><h3>Institutional</h3><Link to="/login">Officials &amp; Staff Login</Link><span>Office Hours: Mon–Fri 8:00 AM – 5:00 PM</span><span>Hotline: (075) 568-2000</span><a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph">amanoaoac.mapandan@pangasinan.gov.ph</a></div>
        </div>
        <p className="resident-footer-copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p>
      </footer>
    </div>
  );
}
