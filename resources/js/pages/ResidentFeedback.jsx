import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  Clock3,
  Gavel,
  Info,
  MapPin,
  MessageSquareText,
  Paperclip,
  Send,
  ShieldCheck,
  Siren,
} from 'lucide-react';
import Seal from '../components/Seal';

const categories = [
  'Road Hazard / Infrastructure',
  'Public Safety & Security',
  'Sanitation',
  'Streetlight Outage',
  'Noise Complaint',
  'Suggestion / Other',
];

const initialReports = [
  {
    reference: 'AMN-2025-0741',
    status: 'Resolved',
    category: 'Sanitation',
    submitted: 'Oct 20, 2025',
    title: 'Uncollected tree branches after tropical storm near Purok 4 Basketball Court',
    description: "Large acacia branches have obstructed the pedestrian pathway near the Purok 4 covered court since Sunday's heavy monsoon squall. School children are forced to walk on the road shoulder.",
    action: 'Collected by Barangay Clean-up Crew on Oct 22, 2025. Thank you for reporting!',
    officer: 'Kag. R. Fernandez',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
  },
  {
    reference: 'AMN-2025-0789',
    status: 'Under Review',
    category: 'Public Safety & Security',
    submitted: 'Oct 25, 2025',
    title: 'Request for additional tanod night patrol along Purok 2 boundary',
    description: 'Unregistered tricycles and noise disturbances reported past 10:30 PM curfew near the boundary pathway. Requesting scheduled roving patrols during weekend evenings.',
    action: 'Assigned to Chief Tanod for night rotation schedule review.',
    officer: 'Tanod Post 2',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80',
  },
];

function ResidentHeader() {
  return (
    <header className="resident-home-header">
      <div className="resident-home-brand"><Seal size={42} /><div><strong>Barangay Amanoaoac</strong><span>Mapandan, Pangasinan</span></div></div>
      <nav className="resident-home-nav" aria-label="Main navigation">
        <Link to="/resident/home">Home</Link>
        <Link to="/resident/announcements">Announcements</Link>
        <Link to="/resident/services">Online Services</Link>
        <Link to="/resident/appointments">Appointments</Link>
        <Link className="selected" to="/resident/feedback">Citizen Feedback</Link>
        <Link to="/resident/hotlines">Emergency Hotlines</Link>
      </nav>
      <div className="resident-home-user"><span className="resident-avatar">MS</span><span className="resident-user-name">Maria Santos</span><span className="verified"><BadgeCheck size={12} /> Verified Resident</span><Link to="/login" className="resident-logout">Log Out</Link></div>
    </header>
  );
}

export default function ResidentFeedback() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [certified, setCertified] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [notice, setNotice] = useState('');

  function clearForm() {
    setCategory('');
    setLocation('');
    setDescription('');
    setPhoto(null);
    setCertified(false);
    setNotice('');
  }

  function submitFeedback(event) {
    event.preventDefault();
    const newReport = {
      reference: `AMN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      status: 'Received',
      category,
      submitted: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date()),
      title: location,
      description,
      action: 'Your report was added to this page preview. It has not been sent to barangay staff.',
      officer: 'Awaiting assignment',
      image: photo ? URL.createObjectURL(photo) : '',
    };
    setReports((currentReports) => [
      newReport,
      ...currentReports.filter((report) => report.reference !== newReport.reference),
    ]);
    clearForm();
    setNotice(`Preview report ${newReport.reference} added. This demo does not send reports to barangay staff.`);
  }

  return (
    <div className="resident-home resident-feedback-page">
      <ResidentHeader />
      <main>
        <section className="feedback-hero">
          <span className="feedback-hero-kicker"><ShieldCheck size={12} /> VERIFIED CITIZEN DIRECT DESK • AMANOAOAC E-GOV</span>
          <h1>Citizen Feedback &amp; Community Concern Desk</h1>
          <p>Help us keep Barangay Amanoaoac safe, clean, and orderly. Your voice directly empowers the Sangguniang Barangay and Tanod emergency responders.</p>
          <div className="feedback-metrics"><div><small>ACTIVE SLA RESPONSE</small><strong>Within 48h</strong></div><div><small>TOTAL TICKETS LOGGED</small><strong>1,248</strong></div><div><small>RESOLUTION RATE</small><strong>94.6%</strong></div><div><small>DUTY TANOD STATION</small><strong>Hall • 24/7</strong></div></div>
          <ShieldCheck className="feedback-hero-shield" size={92} />
        </section>

        <section className="feedback-main-grid">
          <form className="feedback-form-panel" onSubmit={submitFeedback}>
            <div className="feedback-form-heading"><div><h2>File an Incident or Suggestion</h2><p>Fill in the incident details below. Tickets are routed to designated barangay councilors.</p></div><span><ShieldCheck size={12} /> Public Safety<br />Encrypted</span></div>

            <label className="feedback-field-label" htmlFor="feedback-category">Concern Category <b>*</b></label>
            <select id="feedback-category" className="feedback-control" required value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="" disabled>Select an incident category...</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>

            <div className="feedback-label-row"><label className="feedback-field-label" htmlFor="feedback-location">Purok / Specific Landmark Reference <b>*</b></label><small>Mapandan Local Area</small></div>
            <div className="feedback-location-control"><MapPin size={15} /><input id="feedback-location" required value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g., Purok 3 near Central Elementary School, crossing" /></div>

            <div className="feedback-label-row"><label className="feedback-field-label" htmlFor="feedback-description">Detailed Concern Description <b>*</b></label><small>{description.length} / 600 characters</small></div>
            <textarea id="feedback-description" className="feedback-control feedback-description" required maxLength={600} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Provide specific details such as date/time observed, potential hazards, vehicle plates, or suggested actions..." />

            <label className="feedback-field-label">Attach Supporting Evidence (Optional)</label>
            <label className="feedback-upload" htmlFor="feedback-photo">
              <input id="feedback-photo" type="file" accept="image/png,image/jpeg" onChange={(event) => setPhoto(event.target.files?.[0] ?? null)} />
              <span className="feedback-upload-icon">{photo ? <Paperclip size={19} /> : <Camera size={20} />}</span>
              <strong>{photo ? photo.name : '+ Attach Photographic Proof'}</strong>
              <span>Upload photos of road hazards, uncollected waste,<br />streetlight outages, or public disturbances. (PNG, JPG up to 5MB)</span>
            </label>

            <label className="feedback-certification"><input type="checkbox" checked={certified} onChange={(event) => setCertified(event.target.checked)} required /><span>I certify that I am a verified resident of Barangay Amanoaoac, Mapandan, and that the information furnished herein is accurate and submitted in good civic faith.</span></label>
            {notice && <p className="feedback-notice" role="status">{notice}</p>}
            <div className="feedback-form-actions"><button className="feedback-submit" type="submit"><Send size={14} /> Submit Feedback Ticket</button><button className="feedback-clear" type="button" onClick={clearForm}>Clear</button></div>
          </form>

          <aside className="feedback-sidebar">
            <section className="feedback-profile-card"><Seal size={39} /><div className="feedback-profile-copy"><strong>Maria Santos <BadgeCheck size={12} /></strong><small>Resident #2024-AMN-0418</small><span>Purok 3, Mapandan</span></div><div className="feedback-profile-details"><p><span>Verified Voter Status:</span><strong>Mapandan Precinct 0042A</strong></p><p><span>Lifetime Submissions:</span><strong>3 Reports (2 Resolved)</strong></p><p><span>Citizen Civics Badge:</span><strong>Active Contributor</strong></p></div></section>

            <section className="feedback-escalation-card"><div className="feedback-map"><span><MapPin size={12} /> Amanoaoac Patrol Sectors</span></div><div><strong>Immediate Incident Escalation</strong><p>For active violent disputes or medical emergencies, call the direct hotline instead of logging a ticket.</p><small>Desk Hotline <a href="tel:09170002661">0917-000-AMN1</a></small></div></section>

            <section className="feedback-lifecycle"><h3><Siren size={14} /> Ticket Resolution Lifecycle</h3><ol><li><b>1</b><span><strong>Logged:</strong> Routed instantly to Punong Barangay's executive team.</span></li><li><b>2</b><span><strong>Under Review:</strong> Duty Officer inspects the Purok location within 24h.</span></li><li><b>3</b><span><strong>Resolved:</strong> Tanod or maintenance crew executes action and posts photo receipt.</span></li></ol></section>
          </aside>
        </section>

        <section className="feedback-history">
          <div className="feedback-history-heading"><div><h2><MessageSquareText size={22} /> Your Submitted Feedback History</h2><p>Monitor live barangay action items and review resolution documentation.</p></div><span>{reports.length} Total Submissions</span></div>
          <div className="feedback-report-list">{reports.map((report) => (
            <article className="feedback-report-card" key={report.reference}>
              <div className="feedback-report-content"><div className="feedback-report-meta"><span className={`report-status ${report.status === 'Resolved' ? 'resolved' : report.status === 'Received' ? 'received' : 'review'}`}><CheckCircle2 size={10} /> {report.status}</span><span>Ticket #{report.reference}</span><span>{report.category}</span><span><Clock3 size={10} /> Submitted: {report.submitted}</span></div><h3>{report.title}</h3><p>{report.description}</p><div className="feedback-official-action"><span className="action-note-icon"><Info size={13} /></span><div><small>{report.status === 'Resolved' ? 'OFFICIAL BARANGAY ACTION' : 'OFFICE STATUS NOTE'}</small><strong>“{report.action}”</strong></div><small>{report.officer}</small></div></div>
              {report.image && <div className="feedback-report-photo" style={{ backgroundImage: `url("${report.image}")` }}><span>{report.status === 'Resolved' ? 'Resolution Photo' : 'Citizen Photo'}</span></div>}
            </article>
          ))}</div>
        </section>

        <section className="feedback-privacy"><span><Gavel size={17} /></span><div><strong>Barangay Citizen Protection &amp; Data Confidentiality</strong><p>All reports comply with Republic Act 10173 (Data Privacy Act of 2012) and the DILG Community Feedback Standards.</p></div><Link to="/resident/announcements">Read Citizens’ Charter <ArrowRight size={12} /></Link></section>
      </main>

      <footer className="resident-home-footer"><div className="resident-footer-columns"><div className="resident-footer-about"><div><Seal size={32} /><strong>Amanoaoac Portal</strong></div><p>Empowering the residents of Barangay Amanoaoac with transparent, responsive, and prompt community public governance.</p><small>Barangay Hall, Amanoaoac, Mapandan, Pangasinan 2429</small></div><div><h3>Quick Navigation</h3><Link to="/resident/home">Barangay Home</Link><Link to="/resident/services">e-Clearance &amp; Certificates</Link><Link to="/resident/appointments">Book Barangay Appointment</Link><Link to="/resident/announcements">Public Advisories</Link></div><div><h3>Mapandan Local Governance</h3><span>Office of the Punong Barangay</span><span>Sangguniang Barangay Council</span><span>Sangguniang Kabataan (SK) Council</span><span>Lupong Tagapamayapa Registry</span></div><div><h3>Emergency Hotlines</h3><a href="tel:09170002661">Barangay Patrol: 0917-000-AMN1</a><a href="tel:0755692199">Mapandan Police: (075) 569-2199</a><a href="tel:0755692041">BFP Mapandan: (075) 569-2041</a><a href="tel:0755692234">RHU Mapandan: (075) 569-2234</a></div></div><p className="resident-footer-copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p></footer>
    </div>
  );
}
