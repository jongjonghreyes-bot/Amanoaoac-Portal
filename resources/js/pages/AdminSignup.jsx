import React from 'react';
import { Link } from 'react-router-dom';
import { IdCard, Mail, Phone, ChevronDown, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import Seal from '../components/Seal';
import Footer from '../components/Footer';

const Select = ({ placeholder, options = [] }) => (
  <div className="input select">
    <select defaultValue="">
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    <ChevronDown size={14} />
  </div>
);

export default function AdminSignup() {
  return (
    <div className="wide-wrap">
      <header className="banner">
        <Seal size={72} />
        <div className="banner-text">
          <div>
            <span className="chip">Barangay E-Services</span>
            <small>REGION I - PANGASINAN</small>
          </div>
          <h2>Barangay Amanoaoac Resident Portal</h2>
          <p>
            Official registration and verification system for Punong Barangay,
            Sangguniang Barangay Members (Kagawad), Secretary, Treasurer,
            Barangay Tanod, and Barangay Health Workers (BHW) of Barangay Amanoaoac.
          </p>
        </div>
        <div className="auth-badge">
          <ShieldCheck size={18} />
          <div>
            <strong>Authorized Personnel Only</strong>
            <span>RA 6713 &amp; RA 10173 Compliant</span>
          </div>
        </div>
      </header>

      <section className="form-card">
        <div className="form-head">
          <span className="icon-sq lg"><IdCard size={18} /></span>
          <div>
            <h3>Official Identity &amp; Appointment Profile</h3>
            <small>Personal Information &amp; Official LGU Designation</small>
          </div>
          <span className="chip grey">Personnel Dossier</span>
        </div>

        <div className="caps">Full Legal Name</div>
        <div className="grid4">
          {['First Name', 'Middle Name', 'Last Name', 'Suffix'].map((p) => (
            <div className="input" key={p}><input placeholder={p} /></div>
          ))}
        </div>

        <div className="grid2">
          <div>
            <div className="caps">Barangay Position / Designation</div>
            <Select
              placeholder="Select Position..."
              options={['Punong Barangay', 'Kagawad', 'Secretary', 'Treasurer', 'Barangay Tanod', 'BHW']}
            />
          </div>
          <div>
            <div className="caps">Designated Committee / Department</div>
            <Select
              placeholder="Select Committee / Department..."
              options={['Peace & Order', 'Health', 'Finance', 'Education']}
            />
          </div>
        </div>

        <div className="caps">Barangay Personnel / Employee ID</div>
        <div className="input"><IdCard size={16} /><input className="mono" placeholder="AMN-2025-XXXX" /></div>
        <small className="hint">Please check your official LGU ID card or appointment resolution.</small>

        <div className="grid2">
          <div>
            <div className="caps">Official Government / LGU Email</div>
            <div className="input"><Mail size={16} /><input placeholder="personnel@mapandan.gov.ph" /></div>
          </div>
          <div>
            <div className="caps">Contact Number</div>
            <div className="input"><Phone size={16} /><input placeholder="+63 912 345 6789" /></div>
          </div>
        </div>

        <label className="check oath">
          <input type="checkbox" />
          <span>
            I solemnly swear that all information provided is true, correct, and submitted in compliance with the
            <b> Code of Conduct and Ethical Standards for Public Officials (RA 6713)</b> and the
            <b> Data Privacy Act of 2012 (RA 10173)</b>.
          </span>
        </label>

        <Link to="/login" className="btn btn-primary btn-sm"><ArrowLeft size={14} /> Back to Login</Link>
        <div>
          <button className="btn btn-primary" style={{ marginTop: 22 }}>
            Submit Official Registration <ArrowRight size={16} />
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
