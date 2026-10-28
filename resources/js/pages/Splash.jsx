import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, ArrowRight, ShieldCheck, Megaphone, HeartHandshake } from 'lucide-react';
import Seal from '../components/Seal';
import Footer from '../components/Footer';

const features = [
  { icon: ShieldCheck, title: 'Online Clearances', text: 'Request & verify residency & permits.' },
  { icon: Megaphone, title: 'Public Bulletins', text: 'Disaster advisories and local notices.' },
  { icon: HeartHandshake, title: 'Citizen Assistance', text: 'Direct Lupon and healthcare inquiries.' },
];

export default function Splash() {
  const nav = useNavigate();
  return (
    <div className="page-center" style={{ paddingTop: 134 }}>
      <div className="pill"><span className="dot" /> Republic of the Philippines • Province of Pangasinan • Municipality of Mapandan</div>
      <div className="splash-card">
        <Seal size={130} className="seal-ring" />
        <div className="eyebrow">Barangay E-Governance Gateway</div>
        <h1 className="splash-title">Amanoaoac Portal</h1>
        <p className="splash-sub">
          Official Digital Gateway of Barangay Amanoaoac, Municipality of Mapandan, Pangasinan —{' '}
          <em>“Matatag, Nagkakaisa, at Maunlad na Pamayanan”</em>
        </p>
        <button className="btn btn-primary" onClick={() => nav('/login')}><UserCircle size={20} /> Continue <ArrowRight size={14} /></button>
        <div className="feature-row">
          {features.map(({ icon: Icon, title, text }) => (
            <div className="feature" key={title}>
              <span className="icon-sq"><Icon size={14} /></span>
              <div><strong>{title}</strong><span>{text}</span></div>
            </div>
          ))}
        </div>
        <div className="progress" />
      </div>
      <Footer />
    </div>
  );
}