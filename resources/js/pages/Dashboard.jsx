import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, LogOut, BookUser, CalendarClock, Headset, BellRing, Clock, Flag, Megaphone, RefreshCw,
  PlusCircle, CalendarDays, MessagesSquare, FileEdit, CheckCircle2, CalendarCheck, Filter, Info,
  ArrowRight, Landmark, FileText, IdCard, Phone, BadgeCheck, Scale,
} from 'lucide-react';
import Seal from '../components/Seal';

const stats = [
  { label: 'Queued Appointments', value: '4', sub: '3 scheduled today', icon: CalendarClock, subIcon: Clock },
  { label: 'Open Citizen Tickets', value: '7', sub: '2 priority reports', icon: Headset, subIcon: Flag },
  { label: 'Active Advisories', value: '12', sub: 'Published on portal', icon: BellRing, subIcon: Megaphone },
  { label: 'Desk Operational Status', value: 'Hall Desk Online', sub: 'Lupong Hall Duty', icon: ShieldCheck, subIcon: Landmark, text: true },
];

const rows = [
  { ini: 'JD', name: 'Juan Dela Cruz', id: 'AMN-2025-0142', svc: 'Barangay Clearance', note: 'Local Employment Purpose', Icon: BadgeCheck, date: 'Nov 03, 2025', time: '09:30 AM (Morning Slot)', purok: 'Purok 1' },
  { ini: 'EB', name: 'Elena Bautista', id: 'AMN-2024-8821', svc: 'Dispute Mediation (Lupong Tagapamayapa)', note: 'Property Boundary Consultation', Icon: Scale, date: 'Nov 03, 2025', time: '02:00 PM (Afternoon Slot)', purok: 'Purok 4' },
  { ini: 'RP', name: 'Rodrigo Perez', id: 'AMN-2025-0559', svc: 'Certificate of Indigency', note: 'Hospital Assistance Request', Icon: FileText, date: 'Nov 04, 2025', time: '10:15 AM (Morning Slot)', purok: 'Purok 5' },
];

const info = [
  { Icon: Landmark, title: 'Lupon Registry Session', text: 'Dispute cases under Lupong Tagapamayapa convene every Tuesday and Thursday at 2:00 PM at Session Hall.' },
  { Icon: FileText, title: 'Document Release Standard', text: 'Barangay Clearances and Indigency Certifications are printed in under 15 minutes upon identity verification.' },
  { Icon: IdCard, title: 'Incident Escalation', text: 'Reports marked urgent trigger automatic dispatch to Mapandan PNP Station (075) 569-2199.' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('appointments');
  const tabs = [
    { id: 'appointments', label: 'Pending Appointments', Icon: CalendarDays, count: 4 },
    { id: 'tickets', label: 'Feedback Tickets', Icon: MessagesSquare, count: 7 },
    { id: 'post', label: 'Post Announcement', Icon: FileEdit },
  ];

  return (
    <div className="dash">
      <div className="topstrip"><span>Republic of the Philippines • Province of Pangasinan • Official Barangay E-Governance Portal</span><span><Phone size={11} /> Emergency: (075) 569-2041</span></div>

      <nav className="nav">
        <div className="brand"><span className="shield"><ShieldCheck size={18} /></span><div><strong>Barangay Amanoaoac</strong><small>Municipality of Mapandan, Pangasinan</small></div></div>
        <div className="links"><a className="active">Home</a><a>Announcements</a><a>Appointments</a><a>Citizen Feedback</a></div>
        <div className="nav-right">
          <div className="user"><Seal size={26} /> Maria Santos <span className="verified"><BadgeCheck size={11} /> Verified Resident</span></div>
          <BookUser size={20} />
          <Link to="/login" className="btn btn-primary btn-xs"><LogOut size={13} /> Logout</Link>
        </div>
      </nav>

      <div className="console">
        <span className="console-title"><span className="shield light"><ShieldCheck size={14} /></span> INTERNAL GOVERNANCE CONSOLE <i>•</i> <em>Amanoaoac Barangay Council &amp; Staff Administration Desk</em></span>
        <span><span className="tag"><span className="dot" /> Session Active • Hon. Kagawad Admin Desk</span> <span className="tag">Official View</span></span>
      </div>

      <main className="container">
        <div className="stats">
          {stats.map(({ label, value, sub, icon: Icon, subIcon: Sub, text }) => (
            <div className="stat" key={label}>
              <div><small className="caps-inline">{label}</small><div className={text ? 'val txt' : 'val'}>{value}</div><span className="sub"><Sub size={12} /> {sub}</span></div>
              <span className="icon-sq xl"><Icon size={22} /></span>
            </div>
          ))}
        </div>

        <section className="panel hero">
          <Seal size={64} />
          <div style={{ flex: 1 }}>
            <small className="caps-inline">Barangay Amanoaoac Official Seal <span className="chip grey">Mapandan, Pangasinan</span></small>
            <h2>Civil Registry &amp; Barangay Operations Panel</h2>
            <p>Review pending public appointments, resolve neighborhood complaints, and publish community bulletins.</p>
          </div>
          <button className="btn btn-soft"><RefreshCw size={14} /> Refresh Data</button>
          <button className="btn btn-lav"><PlusCircle size={14} /> New Notice</button>
        </section>

        <div className="tabs">
          {tabs.map(({ id, label, Icon, count }) => (
            <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              <Icon size={15} /> {label} {count && <span className="count">{count}</span>}
            </button>
          ))}
        </div>

        <section className="panel">
          {tab === 'appointments' ? (
            <>
              <div className="panel-head">
                <div>
                  <h3>In-Person Appointment Requests <span className="chip grey">Priority Docket</span></h3>
                  <p>Process incoming citizen requests for clearances, certifications, and mediation sessions.</p>
                </div>
                <div className="filter"><span className="pill-filter"><Filter size={13} /> All Puroks (1 to 7)</span><small>Showing 3 of 4 urgent appointments</small></div>
              </div>
              <table className="table">
                <thead><tr><th>Resident Client</th><th>Service Requested</th><th>Requested Date &amp; Time</th><th>Purok Location</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td><div className="client"><span className="avatar">{r.ini}</span><div><strong>{r.name}</strong><small>ID: {r.id}</small></div></div></td>
                      <td><strong className="svc"><r.Icon size={13} /> {r.svc}</strong><small>{r.note}</small></td>
                      <td><strong>{r.date}</strong><small><Clock size={11} /> {r.time}</small></td>
                      <td><span className="chip grey">{r.purok}</span></td>
                      <td className="actions"><button className="btn btn-lav"><CheckCircle2 size={14} /> Approve</button><button className="btn btn-soft"><CalendarCheck size={14} /> Reschedule</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="panel-foot">
                <small><Info size={12} /> SMS and email dispatch notifications are automatically triggered upon confirmation or schedule adjustment.</small>
                <a>View Full Log Registry (142 Records) <ArrowRight size={13} /></a>
              </div>
            </>
          ) : <p style={{ padding: '40px 0', textAlign: 'center', color: '#6b7280' }}>This section is coming soon.</p>}
        </section>

        <div className="info-row">
          {info.map(({ Icon, title, text }) => <div className="info" key={title}><h4><Icon size={22} /> {title}</h4><p>{text}</p></div>)}
        </div>
      </main>

      <footer className="site-footer">
        <div className="cols">
          <div><h4 className="brand-h"><span className="shield light"><Landmark size={16} /></span> Amanoaoac Portal</h4><p>Empowering the residents of Barangay Amanoaoac with transparent, responsive, and prompt community public governance.</p><small>Barangay Hall, Amanoaoac, Mapandan, Pangasinan 2429</small></div>
          <div><h4>Quick Navigation</h4><ul><li>Barangay Home</li><li>e-Clearance &amp; Certificates</li><li>Book Barangay Appointment</li><li>Public Advisories</li></ul></div>
          <div><h4>Mapandan Local Governance</h4><ul><li>Office of the Punong Barangay</li><li>Sangguniang Barangay Council</li><li>Sangguniang Kabataan (SK) Council</li><li>Lupong Tagapamayapa Registry</li></ul></div>
          <div><h4>Emergency Hotlines</h4><ul><li>Barangay Patrol: 0917-000-AMN1</li><li>Mapandan Police: (075) 569-2199</li><li>BFP Mapandan: (075) 569-2041</li><li>RHU Mapandan: (075) 569-2234</li></ul></div>
        </div>
        <p className="copy">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</p>
      </footer>
    </div>
  );
}