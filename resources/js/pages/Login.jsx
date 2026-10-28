import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, IdCard, AtSign, KeyRound, Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import Seal from '../components/Seal';
import Footer from '../components/Footer';

export default function Login() {
  const nav = useNavigate();
  const [role, setRole] = useState('resident');
  const [show, setShow] = useState(false);

  const isResident = role === 'resident';
  const headerTitle = isResident ? 'Resident Portal Login' : 'Admin Portal Login';
  const description = isResident
    ? 'Access your verified resident account to view your profile, requests, and barangay services.'
    : 'Access your verified barangay account to manage permits, records, and public service requests.';
  const idLabel = isResident ? 'Resident ID / Control Number' : 'Official Employee / Officer ID';
  const idPlaceholder = isResident ? 'e.g., RES-2025-0041' : 'e.g., AMN-ADM-2025-001';
  const emailLabel = isResident ? 'Resident Email / Mobile Number' : 'Government Email / Official Username';
  const emailPlaceholder = isResident ? 'e.g., juan.delacruz@email.com' : 'e.g., officer.name@mapandan.gov.ph';

  return (
    <div className="page-center" style={{ paddingTop: 64 }}>
      <div className="login-card">
        <div className="login-head">
          <Seal size={80} />
          <span className="chip">Amanoaoac • Mapandan • Pangasinan</span>
          <h2>{headerTitle}</h2>
          <p>{description}</p>
        </div>

        <div className={`segmented role-${role}`}>
          <button type="button" className={isResident ? 'on' : ''} aria-pressed={isResident} onClick={() => setRole('resident')}><User size={14} /> Resident</button>
          <button type="button" className={!isResident ? 'on' : ''} aria-pressed={!isResident} onClick={() => setRole('admin')}><IdCard size={14} /> Barangay Official / Admin</button>
        </div>

        <label className="label">{idLabel} <b>*</b></label>
        <div className="input"><IdCard size={16} /><input placeholder={idPlaceholder} /></div>

        <label className="label">{emailLabel} <b>*</b></label>
        <div className="input"><AtSign size={16} /><input placeholder={emailPlaceholder} /></div>

        <label className="check"><input type="checkbox" /> Keep me signed in on this device</label>

        <div className="label-row">
          <label className="label">Security Password <b>*</b></label>
          {!isResident && <a href="#" className="forgot">Forgot Password</a>}
        </div>
        <div className="input">
          <KeyRound size={16} />
          <input type={show ? 'text' : 'password'} defaultValue="password1234" />
          <button type="button" className="ghost" onClick={() => setShow(!show)}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button className="btn btn-primary" onClick={() => nav(isResident ? '/resident/home' : '/dashboard')}>
            <LogIn size={16} /> {isResident ? 'RESIDENT LOGIN' : 'ADMIN LOGIN'}
          </button>
        </div>

        {isResident && (
          <>
            <div className="divider"><span>New Resident</span></div>
            <p className="signup-line">Don't have an account yet? <Link to="/signup">Sign Up <ArrowRight size={14} /></Link></p>
          </>
        )}

        {!isResident && (
          <>
            <div className="divider"><span>New Admin</span></div>
            <p className="signup-line" style={{ marginTop: 24 }}>
              Need an official account? <Link to="/admin-signup">Sign Up <ArrowRight size={14} /></Link>
            </p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}