import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  FileCheck2,
  Headphones,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  Megaphone,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Siren,
  Users,
} from 'lucide-react';
import Seal from '../components/Seal';

const announcements = [
  {
    category: 'Official Bulletin',
    date: 'October 28, 2025',
    title: 'Barangay General Assembly & Town Hall 2025',
    text: 'Join the community discussion on local projects, services, and upcoming programs.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Health & Wellness',
    date: 'November 5, 2025',
    title: 'Free Medical & Dental Mission',
    text: 'Health consultations, basic laboratory screening, and vitamins for residents.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Community',
    date: 'November 12, 2025',
    title: 'Barangay Clean-up Drive',
    text: 'Help keep our puroks clean and safe. Everyone is welcome to participate.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
  },
];

const hotlines = [
  { name: 'Mapandan Municipal Police Station', type: 'LAW ENFORCEMENT', number: '(075) 569-2199', icon: ShieldCheck },
  { name: 'Amanoaoac Health Center & BHW', type: 'MEDICAL & AMBULANCE', number: '(075) 569-2041', icon: HeartHandshake },
  { name: 'Barangay Tanod & Peace Outpost', type: 'COMMUNITY WATCH', number: '0917-000-AMN1', icon: Users },
  { name: 'MDRRMO Mapandan', type: 'DISASTER & RESCUE', number: '(075) 569-2234', icon: Siren },
];

export default function ResidentHome() {
  return (
    <div className="resident-home">
      <header className="resident-home-header">
        <div className="resident-home-brand">
          <Seal size={42} />
          <div><strong>Barangay Amanoaoac</strong><span>Mapandan, Pangasinan</span></div>
        </div>

        <nav className="resident-home-nav" aria-label="Main navigation">
          <a className="selected" href="#home">Home</a>
          <Link to="/resident/announcements">Announcements</Link>
          <Link to="/resident/services">Online Services</Link>
          <Link to="/resident/appointments">Appointments</Link>
          <Link to="/resident/feedback">Citizen Feedback</Link>
          <Link to="/resident/hotlines">Emergency Hotlines</Link>
        </nav>

        <div className="resident-home-user">
          <span className="resident-avatar">MS</span>
          <span className="resident-user-name">Maria Santos</span>
          <span className="verified"><BadgeCheck size={12} /> Verified Resident</span>
          <Link to="/login" className="resident-logout">Log Out</Link>
        </div>
      </header>

      <div className="resident-live-strip">
        <span className="live-label"><span /> LIVE ADVISORY</span>
        <span>Barangay Hall Open Hours: Monday to Friday, 8:00 AM – 5:00 PM</span>
        <span className="strip-cert"><ShieldCheck size={12} /> ISO Civic Standard Certified</span>
        <span className="strip-cert"><BadgeCheck size={12} /> Public Transparency Seal</span>
      </div>

      <main>
        <section className="resident-home-hero" id="home">
          <div className="resident-hero-copy">
            <span className="eyebrow-pill"><MapPin size={12} /> Official Citizen Gateway • Mapandan, Pangasinan</span>
            <div className="resident-hero-title-row">
              <Seal size={68} />
              <h1>Welcome to Barangay Amanoaoac Digital Portal</h1>
            </div>
            <p>Fast, transparent, and direct citizen services for the residents of Mapandan, Pangasinan. Access community certification, schedule formal council consults, and report local concerns 24/7.</p>
            <div className="resident-metrics">
              <div><strong>2,840+</strong><span>Active Residents</span></div>
              <div><strong>&lt; 24 hrs</strong><span>E-Clearance Turnaround</span></div>
              <div><strong>100%</strong><span>Public Transparency</span></div>
            </div>
          </div>
          <div className="resident-hero-photo" role="img" aria-label="Barangay hall and Philippine flag">
            <span className="hero-photo-caption"><small>SANGGUNIANG BARANGAY 2023–2028</small><strong>Tapat, Maagap, at Nagkakaisang Paglilingkod</strong></span>
          </div>
        </section>

        <section className="resident-action-grid" id="services">
          <article className="resident-action-card" id="appointments">
            <div className="action-card-top"><span className="action-icon"><CalendarDays size={20} /></span><span className="action-tag">FAST LANE</span></div>
            <h2>Book Official Appointment</h2>
            <p>Schedule official consultations, barangay clearance, certificate of residency, or dispute mediation without waiting in long queues. Choose your exact time and desk officer.</p>
            <div className="action-card-bottom"><span><Clock3 size={13} /> Available Mon–Fri</span><Link to="/resident/appointments">Book Appointment <ArrowRight size={14} /></Link></div>
          </article>
          <article className="resident-action-card" id="feedback">
            <div className="action-card-top"><span className="action-icon pale"><MessageSquareText size={20} /></span><span className="action-tag neutral">DIRECT ACTION DESK</span></div>
            <h2>Submit Citizen Feedback</h2>
            <p>Report community concerns, road hazards, street lighting outages, sanitation concerns, or share constructive suggestions directly with the Punong Barangay and councilors.</p>
            <div className="action-card-bottom"><span><LockKeyhole size={13} /> Confidential &amp; Monitored</span><Link to="/resident/feedback">Submit Feedback <ArrowRight size={14} /></Link></div>
          </article>
        </section>

        <section className="resident-announcements" id="announcements">
          <div className="resident-section-heading">
            <div><span className="section-eyebrow"><Megaphone size={13} /> OFFICIAL COMMUNIQUE</span><h2>Latest Public Announcements &amp; Bulletins</h2><p>Stay up to date with programs, public health drives, and municipal updates in Amanoaoac.</p></div>
            <Link to="/resident/announcements">View All Public Advisories <ArrowRight size={13} /></Link>
          </div>
          <div className="resident-news-grid">
            {announcements.map((item) => (
              <article className="resident-news-card" key={item.title}>
                <div className="resident-news-image" style={{ backgroundImage: `url("${item.image}")` }}><span>{item.category}</span></div>
                <div className="resident-news-content"><small><CalendarDays size={12} /> {item.date}</small><h3>{item.title}</h3><p>{item.text}</p><a href="#announcements">Read Announcement <ArrowRight size={12} /></a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="resident-clearance-band">
          <div><span className="section-eyebrow"><FileCheck2 size={13} /> E-CITIZEN FASTLANE</span><h2>Need a Barangay Clearance or Certificate of Indigency?</h2><p>Apply entirely online without manual paperwork. Pick up your signed and dry-sealed physical certificate or download your verified digital copy.</p></div>
          <div className="clearance-actions"><a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph?subject=Request%20E-Certificate">Request E-Certificate</a><a className="secondary" href="mailto:amanoaoac.mapandan@pangasinan.gov.ph?subject=Application%20Status">Track Application Status</a></div>
        </section>

        <section className="resident-hotlines" id="hotlines">
          <div className="resident-section-heading hotline-heading"><div><span className="section-eyebrow"><Headphones size={13} /> 24/7 RAPID RESPONSE NETWORK</span><h2>Emergency Hotlines &amp; First Responders</h2><p>Immediate contacts for peace &amp; order, medical distress, fire, and disaster rescue in Amanoaoac &amp; Mapandan.</p></div><span className="toll-free"><Phone size={12} /> Toll-Free Direct Dispatch</span></div>
          <div className="resident-hotline-grid">
            {hotlines.map(({ name, type, number, icon: Icon }) => <a className="resident-hotline-card" href={`tel:${number.replaceAll(' ', '')}`} key={name}><span className="hotline-icon"><Icon size={18} /></span><small>{type}</small><strong>{name}</strong><span className="hotline-number"><Phone size={12} /> {number}</span></a>)}
          </div>
        </section>

        <section className="resident-location">
          <div><span className="section-eyebrow"><MapPin size={13} /> LOCATION &amp; JURISDICTION</span><h2>Barangay Hall Complex &amp; Vicinity</h2><p>Located at the civic heart of Amanoaoac, adjacent to the Amanoaoac Elementary School and Multi-Purpose Agricultural Cooperative. Ample parking and fully accessible PWD ramps are provided.</p><address><MapPin size={13} /> Barangay Road, Amanoaoac, Mapandan, Pangasinan 2429</address><a href="tel:0755692041"><Phone size={13} /> (075) 569-2041</a></div>
          <div className="resident-map" role="img" aria-label="Map vicinity of Amanoaoac and Mapandan"><span><MapPin size={14} /> Barangay Amanoaoac Boundary • Mapandan</span></div>
        </section>
      </main>

      <footer className="resident-home-footer">
        <div className="resident-footer-columns">
          <div className="resident-footer-about"><div><Seal size={32} /><strong>Amanoaoac Portal</strong></div><p>Empowering the residents of Barangay Amanoaoac with transparent, responsive, and prompt community public governance.</p><small>Barangay Hall, Amanoaoac, Mapandan, Pangasinan 2429</small></div>
          <div><h3>Quick Navigation</h3><a href="#home">Barangay Home</a><Link to="/resident/services">e-Clearance &amp; Certificates</Link><Link to="/resident/announcements">Public Advisories</Link><Link to="/resident/appointments">Book Barangay Appointment</Link><Link to="/resident/feedback">Citizen Feedback</Link></div>
          <div><h3>Mapandan Local Governance</h3><a href="#home">Office of the Punong Barangay</a><a href="#home">Sangguniang Barangay Council</a><a href="#home">Sangguniang Kabataan (SK) Council</a><a href="#home">Lupong Tagapamayapa Registry</a></div>
          <div><h3>Emergency Hotlines</h3><a href="tel:09170002661">Barangay Patrol: 0917-000-AMN1</a><a href="tel:0755692199">Mapandan Police: (075) 569-2199</a><a href="tel:0755692041">BFP Mapandan: (075) 569-2041</a><a href="tel:0755692234">RHU Mapandan: (075) 569-2234</a></div>
        </div>
        <p className="resident-footer-copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p>
      </footer>
    </div>
  );
}
