import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ambulance,
  BadgeCheck,
  Building2,
  CalendarDays,
  Flame,
  HeartPulse,
  MessageSquare,
  Phone,
  Shield,
  ShieldCheck,
  Siren,
  Zap,
} from 'lucide-react';
import Seal from '../components/Seal';

const hotlines = [
  { group: 'Barangay', badge: 'Barangay', name: 'Tanod Patrol & Desk', description: 'Security outpost, dispute intervention, and nightly patrols.', label: 'Direct Hotline:', number: '0917-000-2661', dial: '09170002661', icon: Shield },
  { group: 'Municipal', badge: 'Municipal', name: 'Mapandan Municipal Police', description: 'Crime response, incident reporting, and public safety.', label: 'Desk & Mobile:', number: '(075) 569-2199', dial: '0755692199', icon: ShieldCheck, callLabel: 'Call PNP' },
  { group: 'Emergency', badge: 'Emergency', name: 'Bureau of Fire Protection', description: 'Fire rescue, extrication, and hazard control.', label: 'Station Line:', number: '(075) 569-2041', dial: '0755692041', icon: Flame, callLabel: 'Call BFP' },
  { group: 'Municipal', badge: 'Medical', name: 'Mapandan Health Unit & Ambulance', description: 'Emergency triage, patient transport, and medical assistance.', label: 'Ambulance Hotline:', number: '(075) 569-2234', dial: '0755692234', icon: Ambulance, callLabel: 'Call Ambulance' },
  { group: 'Emergency', badge: 'Disaster Command', name: 'MDRRMO Mapandan Rescue', description: 'Flood evacuation boats, storm alert, and rescue operations.', label: 'Rescue Operations Mobile:', number: '0919-444-3322', dial: '09194443322', icon: Siren, callLabel: 'Call MDRRMO' },
  { group: 'Barangay', badge: 'Barangay', name: 'Barangay Health Workers (BHW)', description: 'First aid, senior medicine, and community triage.', label: 'Sub-Station Mobile:', number: '0920-111-2233', dial: '09201112233', icon: HeartPulse, callLabel: 'Call BHW' },
];

const checklistItems = [
  '1 Gallon drinking water per person per day',
  '3-Day non-perishable canned food & manual opener',
  'First aid kit, maintenance medicines & sanitizers',
  'Waterproof pouch for IDs, certificates & emergency cash',
  'Flashlight, whistle, battery radio & charged power bank',
];

const evacuationCenters = [
  { type: 'Primary Site • Elevated', name: 'Amanoaoac Elementary School Gym', address: 'Sitio Centro, Amanoaoac (Equipped with generator & potable water)', capacity: 450 },
  { type: 'Secondary Site', name: 'Barangay Hall Complex (2nd Floor)', address: 'Zone 3 Civic Center (Accessible for seniors & infant nursing)', capacity: 120 },
  { type: 'Auxiliary Safe Site', name: 'Catholic Pastoral Center & Chapel', address: 'Sitio Maliaya (High concrete platform above river flood line)', capacity: 85 },
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
        <Link to="/resident/feedback">Citizen Feedback</Link>
        <Link className="selected" to="/resident/hotlines">Emergency Hotlines</Link>
      </nav>
      <div className="resident-home-user"><span className="resident-avatar">MS</span><span className="resident-user-name">Maria Santos</span><span className="verified"><BadgeCheck size={12} /> Verified Resident</span><Link to="/login" className="resident-logout">Log Out</Link></div>
    </header>
  );
}

export default function ResidentHotlines() {
  const [category, setCategory] = useState('All Hotlines');
  const [checkedItems, setCheckedItems] = useState([]);
  const categories = ['All Hotlines', 'Barangay', 'Municipal', 'Emergency'];
  const visibleHotlines = category === 'All Hotlines' ? hotlines : hotlines.filter((hotline) => hotline.group === category);

  function toggleChecklistItem(item) {
    setCheckedItems((currentItems) => currentItems.includes(item)
      ? currentItems.filter((checkedItem) => checkedItem !== item)
      : [...currentItems, item]);
  }

  return (
    <div className="resident-home emergency-hotlines-page">
      <ResidentHeader />
      <main>
        <section className="hotlines-hero">
          <div className="hotlines-hero-icon"><Siren size={22} /></div>
          <div className="hotlines-hero-copy"><span><span /> 24/7 CITIZEN EMERGENCY DESK ACTIVE</span><h1>Barangay &amp; Municipal Emergency Hotlines</h1><p>Tap any contact card or direct dial button to connect immediately.</p></div>
          <a className="national-emergency-button" href="tel:911"><Phone size={14} /> Dial National 911</a>
        </section>

        <section className="hotline-listing">
          <div className="hotline-section-heading"><div><h2>Immediate Response Units</h2><p>Direct telephone lines for security, health, disaster, and utility emergencies.</p></div><div className="hotline-filter" aria-label="Filter hotlines">{categories.map((item) => <button type="button" className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
          <div className="emergency-hotline-grid">{visibleHotlines.map(({ group, badge, name, description, label, number, dial, icon: Icon, callLabel }) => (
            <article className="emergency-hotline-card" key={name}>
              <div className="emergency-card-top"><span className="emergency-card-icon"><Icon size={17} /></span><span className="emergency-card-badge">{badge}</span></div>
              <h3>{name}</h3><p>{description}</p>
              <div className="emergency-number"><span>{label}</span><strong>{number}</strong></div>
              <div className="emergency-card-actions"><a href={`tel:${dial}`}><Phone size={11} /> {callLabel ?? 'Call Now'}</a><a href={`sms:${dial}`}><MessageSquare size={11} /> SMS</a></div>
              <span className="sr-only">{group}</span>
            </article>
          ))}</div>
        </section>

        <section className="power-restoration-card">
          <span className="power-icon"><Zap size={18} /></span><div className="power-copy"><span>POWER GRID RESTORATION <b>PANELCO III</b></span><strong>Electric Hazard &amp; Fallen Wire Hotline</strong><p>Report sparking transformers, sagging electric lines, or sudden power feeder outages.</p></div><div className="dispatch-number"><span>Dispatch Line:</span><strong>(075) 522-0000</strong></div><a href="tel:0755220000"><Phone size={12} /> Call Hotline</a>
        </section>

        <section className="preparedness-grid">
          <div className="evacuation-section"><div className="preparedness-heading"><h2><Building2 size={15} /> Evacuation Centers</h2><span>Inspected 2025</span></div><div className="evacuation-list">{evacuationCenters.map((center) => <article className="evacuation-card" key={center.name}><div className="evacuation-card-head"><span>{center.type}</span><div>Capacity<strong>{center.capacity}<small>Families</small></strong></div></div><h3>{center.name}</h3><p>{center.address}</p></article>)}</div></div>

          <div className="go-bag-section"><div className="preparedness-heading"><h2><CalendarDays size={15} /> 72-Hour Go-Bag Checklist</h2><strong>{checkedItems.length} of {checklistItems.length} Ready</strong></div><div className="go-bag-card"><div className="checklist-progress"><span style={{ width: `${(checkedItems.length / checklistItems.length) * 100}%` }} /></div>{checklistItems.map((item) => <label className="go-bag-item" key={item}><input type="checkbox" checked={checkedItems.includes(item)} onChange={() => toggleChecklistItem(item)} />{item}</label>)}<button type="button" className="reset-checklist" onClick={() => setCheckedItems([])}>Reset Checklist</button></div></div>
        </section>
      </main>

      <footer className="resident-home-footer"><div className="resident-footer-columns"><div className="resident-footer-about"><div><Seal size={32} /><strong>Barangay Amanoaoac</strong></div><p>Official Civic Governance and Citizen Services Gateway of Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Committed to integrity, transparency, and responsive community service.</p><small>Barangay Hall Complex, Amanoaoac, Mapandan, Pangasinan 2429</small></div><div><h3>Citizen Access</h3><Link to="/resident/home">Home</Link><Link to="/resident/services">Barangay Clearance &amp; IDs</Link><Link to="/resident/announcements">Community Bulletins &amp; Ordinances</Link><Link to="/resident/appointments">Appointments Desk</Link><Link to="/resident/feedback">Citizen Feedback</Link></div><div><h3>Institutional</h3><Link to="/login">Officials &amp; Staff Login</Link><span>Office Hours: Mon–Fri 8:00 AM – 5:00 PM</span><span>Hotline: (075) 568-2000</span><a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph">amanoaoac.mapandan@pangasinan.gov.ph</a></div></div><p className="resident-footer-copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p></footer>
    </div>
  );
}
