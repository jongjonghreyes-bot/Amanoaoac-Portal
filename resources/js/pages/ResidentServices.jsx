import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  IdCard,
  Landmark,
  Phone,
  Search,
  ShieldCheck,
  Scale,
  Timer,
    X,
} from 'lucide-react';
import Seal from '../components/Seal';

const categories = ['All Services', 'Clearances', 'Indigency & Social Welfare', 'Business & Permits', 'Certifications', 'Lupon Mediation'];

const services = [
  {
    category: 'Clearances', title: 'Barangay Clearance', icon: ShieldCheck, turnaround: '15 mins', feeLabel: 'Fee', fee: 'P50.00',
    description: 'Civic attestation for local employment, Postal ID, bank accounts, and civic transactions.',
    requirements: ['Valid ID or Student ID', 'Community Tax Certificate (Cedula)', '1 pc 2×2 Photo (White BG)'],
  },
  {
    category: 'Indigency & Social Welfare', title: 'Certificate of Indigency', icon: HeartHandshake, turnaround: 'Same-Day', feeLabel: 'Fee', fee: 'FREE',
    description: 'Support endorsement for medical, educational, hospital billing, and legal aid assistance.',
    requirements: ['Purok Leader Endorsement', 'Hospital Bill, Medical Certificate, or School ID', 'Valid Government ID'],
  },
  {
    category: 'Certifications', title: 'Certificate of Residency', icon: IdCard, turnaround: 'Same-Day', feeLabel: 'Fee', fee: 'P50.00',
    description: 'Formal verification certifying residency for COMELEC voter registration and proof of address.',
    requirements: ['Minimum 6 Months Barangay Residency', 'Valid ID or Utility Bill Proof', 'Barangay RBI Census Verification'],
  },
  {
    category: 'Business & Permits', title: 'Barangay Business Clearance', icon: Landmark, turnaround: '1–2 Days', feeLabel: 'Fee', fee: 'P150.00',
    description: 'Permit endorsement for micro and small enterprises, sari-sari stores, and local commercial trades.',
    requirements: ['DTI or SEC Certificate of Registration', 'Lease Contract or Proof of Property Ownership', 'Previous Barangay Business Clearance (if renewal)'],
  },
  {
    category: 'Indigency & Social Welfare', title: 'First-Time Jobseeker Assistance', icon: GraduationCap, turnaround: '15 mins', feeLabel: 'Fee', fee: 'FREE (RA 11261)',
    description: 'Free certification under RA 11261 waiving statutory government fees for employment clearances.',
    requirements: ['Executed Oath of Undertaking', 'Diploma, Transcript of Records, or School ID', 'Barangay Residency Endorsement'],
  },
  {
    category: 'Lupon Mediation', title: 'Lupon Tagapamayapa Mediation Request', icon: Scale, turnaround: '3 Working Days', feeLabel: 'Docket Fee', fee: 'FREE',
    description: 'Formal docket filing and hearing schedule for amicable community dispute conciliation.',
    requirements: ['Complainant Valid Identification', 'Brief Written Narrative of the Incident', 'Respondent Details & Amanoaoac Address'],
  },
];

function ResidentHeader() {
  return (
    <>
      <header className="resident-home-header">
        <div className="resident-home-brand"><Seal size={42} /><div><strong>Barangay Amanoaoac</strong><span>Mapandan, Pangasinan</span></div></div>
        <nav className="resident-home-nav" aria-label="Main navigation">
          <Link to="/resident/home">Home</Link>
          <Link to="/resident/announcements">Announcements</Link>
          <Link className="selected" to="/resident/services">Online Services</Link>
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

export default function ResidentServices() {
  const [category, setCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');
  const [requisition, setRequisition] = useState('');
  const [trackMessage, setTrackMessage] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const filteredServices = useMemo(() => services.filter((service) => {
    const matchesCategory = category === categories[0] || service.category === category;
    const searchText = `${service.title} ${service.description} ${service.category}`.toLowerCase();
    return matchesCategory && searchText.includes(search.toLowerCase());
  }), [category, search]);

  function trackRequest(event) {
    event.preventDefault();
    setTrackMessage(requisition.trim().toUpperCase() === 'AMN-2025-081'
      ? 'Request received for review. Last updated today at 9:15 AM.'
      : 'No requisition found. Check the reference code and try again.');
  }

  return (
    <div className="resident-home resident-services-page">
      <ResidentHeader />
      <main>
        <section className="services-hero">
          <div className="services-hero-copy">
            <span className="services-kicker"><ShieldCheck size={13} /> OFFICIAL CIVIC E-DESK • REPUBLIC ACT 11032</span>
            <h1>Barangay Citizen E-Services &amp; Document Issuance</h1>
            <p>Fast, transparent, and direct public record issuance for residents of Barangay Amanoaoac, Mapandan. Submit applications online or track existing requests.</p>
            <div className="services-assurances"><span><BadgeCheck size={12} /> QR-Authenticated Documents</span><span><Clock3 size={12} /> Same-Day Processing</span><span><FileCheck2 size={12} /> Standard Statutory Fees</span></div>
          </div>
          <form className="requisition-card" onSubmit={trackRequest}>
            <div className="requisition-title"><strong>Track Requisition</strong><span>Live Status</span></div>
            <label className="requisition-input"><Search size={14} /><input value={requisition} onChange={(event) => { setRequisition(event.target.value); setTrackMessage(''); }} placeholder="e.g. AMN-2025-081" aria-label="Requisition reference code" required /></label>
            <button type="submit">Track Status <ArrowRight size={13} /></button>
            {trackMessage && <p className="track-message" role="status">{trackMessage}</p>}
          </form>
        </section>

        <section className="service-stats" aria-label="Service statistics">
          <div><span><FileCheck2 size={17} /></span><small>ISSUED THIS MONTH</small><strong>1,428</strong></div>
          <div><span><Timer size={17} /></span><small>AVG. TURNAROUND</small><strong>15 Mins</strong></div>
          <div><span><GraduationCap size={17} /></span><small>RA 11261 FIRST JOB</small><strong>384 Free</strong></div>
          <div><span><BadgeCheck size={17} /></span><small>RESIDENT RATING</small><strong>99.4%</strong></div>
        </section>

        <section className="service-catalog" aria-label="Available barangay services">
          <div className="service-filters">
            <label className="service-search"><Search size={14} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search clearance, residency, permits..." aria-label="Search services" /></label>
            <div className="service-categories">
              {categories.map((item) => <button type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}{item === categories[0] ? ` (${services.length})` : ''}</button>)}
            </div>
          </div>
          {selectedService && (
            <div className="service-request-notice" role="status">
              <span><strong>{selectedService}</strong>: online applications are not connected yet. No request has been submitted.</span>
              <button type="button" aria-label="Dismiss notice" onClick={() => setSelectedService('')}><X size={15} /></button>
            </div>
          )}

          {filteredServices.length ? <div className="service-card-grid">
            {filteredServices.map(({ category: serviceCategory, title, icon: Icon, turnaround, feeLabel, fee, description, requirements }) => (
              <article className="service-card" key={title}>
                <div className="service-card-top"><span className="service-icon"><Icon size={17} /></span><span className="turnaround"><Clock3 size={11} /> {turnaround}</span></div>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="requirements"><small>REQUIRED DOCUMENTS</small><ul>{requirements.map((requirement) => <li key={requirement}><Check size={12} /> {requirement}</li>)}</ul></div>
                <div className="service-card-bottom"><div><small>{feeLabel}</small><strong>{fee}</strong></div><button type="button" onClick={() => setSelectedService(title)}>Apply Online / Request <ArrowRight size={12} /></button></div>
                <span className="sr-only">{serviceCategory}</span>
              </article>
            ))}
          </div> : <div className="services-empty"><Search size={24} /><strong>No services found</strong><span>Try another search or service category.</span></div>}
        </section>

        <section className="arta-panel">
          <div className="arta-copy"><span className="section-eyebrow"><ShieldCheck size={13} /> CITIZEN'S CHARTER • ZERO CONTACT POLICY</span><h2>Committed to Anti-Red Tape Authority (ARTA) Standards</h2><p>Under Republic Act 11032, Barangay Amanoaoac guarantees straightforward procedures, transparent fixed turnaround times, and automated receipts for all administrative requests. No fixers allowed.</p><div className="arta-stats"><span>Simple Requests<strong>≤ 3 Working Days</strong></span><span>Complex Inquiries<strong>≤ 7 Working Days</strong></span><span>Official Feedback Hotline<strong>8888 • CCB 0908</strong></span></div></div>
          <div className="arta-help"><span><Phone size={18} /></span><strong>Need Help in Person?</strong><p>Visit the Public Assistance and Complaints Desk (PACD) at the Barangay Hall lobby.</p><small>Monday to Friday: 8:00 AM – 5:00 PM</small></div>
        </section>
      </main>

      <footer className="resident-home-footer">
        <div className="resident-footer-columns">
          <div className="resident-footer-about"><div><Seal size={32} /><strong>Barangay Amanoaoac</strong></div><p>Official Civic Governance and Citizen Services Gateway of Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Committed to integrity, transparency, and responsive community service.</p><small>Barangay Hall Complex, Amanoaoac, Mapandan, Pangasinan 2429</small></div>
          <div><h3>Citizen Access</h3><Link to="/resident/home">Home</Link><Link to="/resident/services">Online Services</Link><Link to="/resident/announcements">Announcements &amp; Bulletins</Link><Link to="/resident/appointments">Appointments Desk</Link><Link to="/resident/feedback">Citizen Feedback (PACD)</Link><Link to="/resident/hotlines">Emergency Hotlines</Link></div>
          <div><h3>Institutional</h3><Link to="/login">Officials &amp; Staff Login</Link><span>Office Hours: Mon–Fri 8:00 AM – 5:00 PM</span><span>Hotline: (075) 568-2000</span><a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph">amanoaoac.mapandan@pangasinan.gov.ph</a></div>
        </div>
        <p className="resident-footer-copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p>
      </footer>
    </div>
  );
}
