import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IdCard,
  Mail,
  Phone,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  MapPin,
  ShieldCheck,
  Check,
  User,
  House,
  Camera,
  Upload,
  FileText,
  CircleHelp,
} from 'lucide-react';
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

export default function Signup() {
  const [activeStep, setActiveStep] = useState(1);

  const renderStepOne = () => (
    <>
      <div className="resident-form-header">
        <span className="icon-sq lg"><IdCard size={16} /></span>
        <div>
          <h2>Resident Personal Details</h2>
          <p>Please provide complete legal details matching your civil registry documents (PhilSys, Birth Certificate, or Voter Record).</p>
        </div>
      </div>

      <div className="field-block">
        <div className="field-label">Full Legal Name</div>
        <div className="grid-4">
          <div className="input"><input placeholder="First Name" /></div>
          <div className="input"><input placeholder="Middle Name" /></div>
          <div className="input"><input placeholder="Last Name" /></div>
          <div className="input"><input placeholder="Suffix" /></div>
        </div>
      </div>

      <div className="field-block">
        <div className="field-grid two">
          <div>
            <div className="field-label">Barangay Residence &amp; Purok Jurisdiction</div>
            <Select placeholder="Select your Purok area..." options={['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5']} />
          </div>
          <div>
            <div className="field-label">House No. / Street / Sitio</div>
            <div className="input"><input placeholder="e.g., Block 4 Lot 12, Mabini St." /></div>
          </div>
        </div>

        <div className="address-box">
          <span className="check-dot"><MapPin size={14} /></span>
          <span>All verified addresses are validated against the official territorial jurisdiction of Barangay Amanoaoac, Mapandan 2429, Pangasinan.</span>
        </div>
      </div>

      <div className="field-block">
        <div className="field-grid two">
          <div>
            <div className="field-label">Mobile Number <span className="required">*</span></div>
            <div className="input with-prefix">
              <span className="prefix">+63</span>
              <input placeholder="917 123 4567" />
            </div>
            <small className="helper">This number is used for urgent alerts and verification notices.</small>
          </div>
          <div>
            <div className="field-label">Email Address <span className="required">*</span></div>
            <div className="input"><Mail size={16} /><input placeholder="resident@amanoaoac.gov.ph" /></div>
            <small className="helper">For downloadable PDF clearances and official receipts.</small>
          </div>
        </div>
      </div>

      <div className="field-block">
        <div className="field-grid two checkbox-grid">
          <div className="field-label">Sectoral Classification</div>
          <div className="field-label right">Select all applicable privileges</div>
        </div>

        <div className="checkbox-row">
          <label className="check-box"><input type="checkbox" /> <span>PWD</span></label>
          <label className="check-box"><input type="checkbox" /> <span>Senior Citizen</span></label>
          <label className="check-box"><input type="checkbox" /> <span>Parent</span></label>
          <label className="check-box"><input type="checkbox" /> <span>Katipunan ng Kabataan</span></label>
        </div>
      </div>

      <div className="resident-actions">
        <Link to="/login" className="btn btn-soft btn-back"><ArrowLeft size={14} /> Back to Login</Link>
        <button className="btn btn-primary btn-next" onClick={() => setActiveStep(2)}>Continue to Upload <ArrowRight size={14} /></button>
      </div>
    </>
  );

  const renderStepTwo = () => (
    <>
      <div className="resident-form-header step-two-head">
        <span className="icon-sq lg"><House size={16} /></span>
        <div>
          <h2>1. Katibayan ng Paninirahan (Proof of Barangay Amanoaoac Residency)</h2>
          <p>Mag-upload ng patunay na ikaw ay lehitimong naninirahan sa Barangay Amanoaoac, Mapandan.</p>
        </div>
      </div>

      <div className="proof-box">
        <div className="proof-header">
          <div className="proof-label">Accepted Proof Document *</div>
          <Select placeholder="Purok Leader Endorsement / Certificate of Actual Residency" options={['Purok Leader Endorsement', 'Certificate of Actual Residency', 'Barangay ID', 'Utility Bill']} />
        </div>

        <div className="upload-box">
          <div className="upload-icon"><Upload size={22} /></div>
          <div className="upload-copy">
            <strong>Attach Proof of Residency</strong>
            <span>Drag and drop your file here, or click to browse from device.<br />Siguraduhing malinaw at makikita ang iyong pangalan sa dokumento.</span>
          </div>
          <button className="btn btn-primary btn-small">Select Document</button>
        </div>

        <div className="uploaded-file">
          <span className="file-icon"><FileText size={15} /></span>
          <span>cepolio_bill_2024_amanoaoac.pdf</span>
          <span className="cancel">×</span>
        </div>
      </div>

      <div className="proof-box shade-box">
        <div className="resident-form-header step-two-head small-header">
          <span className="icon-sq lg"><Camera size={16} /></span>
          <div>
            <h2>2. Live Facial Matching (Selfie Biometrics para sa Admin Review)</h2>
            <p>Kan ang live na larawan ang magiging basehan ng admin review bago ma-approve ang iyong aplikasyon.</p>
          </div>
        </div>

        <div className="selfie-note">
          <span className="bullet-dot">✓</span>
          <span>Masusunod na pagkuha ng selfie, with natural lighting, full face visible, and direct eye contact.</span>
        </div>

        <div className="upload-box primary-box">
          <div className="upload-icon"><Camera size={22} /></div>
          <div className="upload-copy">
            <strong>Take a selfie or upload a recent photo.</strong>
            <span>Siguraduhing malinaw ang iyong mukha at hindi nakatakip ang mask at salamin.</span>
          </div>
          <button className="btn btn-primary btn-small">Open Camera &amp; Capture</button>
        </div>
      </div>

      <div className="legal-box">
        <div className="section-title"><span className="mini-check dark"><Check size={12} /></span> Legal Certification &amp; Civic Oath</div>
        <label className="consent-row"><input type="checkbox" /> I solemnly swear under penalties of perjury that all uploaded documents are genuine, authentic, and that I am a bona fide resident residing within the jurisdiction of Barangay Amanoaoac, Mapandan, Pangasinan.</label>
        <label className="consent-row"><input type="checkbox" /> I agree to the secure processing of my personal and civic data under Republic Act No. 10173 (Data Privacy Act of 2012) and the Barangay Registry of Individuals (BRI) validation and citizen service compliance.</label>
      </div>

      <div className="resident-actions proof-actions">
        <button className="btn btn-soft btn-back" onClick={() => setActiveStep(1)}><ArrowLeft size={14} /> Back to step 1</button>
        <button className="btn btn-primary btn-next">Submit Application for Barangay Admin Review <ArrowRight size={14} /></button>
      </div>
    </>
  );

  return (
    <div className="resident-signup-page">
      <header className="resident-signup-header">
        <div className="resident-brand">
          <Seal size={34} className="seal-ring small-seal" />
          <div className="resident-brand-copy">
            <span>BARANGAY E-SERVICES</span>
            <strong>Barangay Amanoaoac Resident Portal</strong>
          </div>
        </div>
        <small>REGION I - PANGASINAN</small>
      </header>

      <div className="resident-signup-shell">
        <div className="step-row">
          <button className={`step ${activeStep === 1 ? 'active' : 'pending'}`} onClick={() => setActiveStep(1)}>
            <span className="step-number">1</span>
            <div className="step-copy">
              <small>{activeStep === 1 ? 'STEP 1 • ACTIVE' : 'STEP 1 • INCOMPLETE'}</small>
              <strong>Personal Information</strong>
            </div>
            <span className="step-icon"><User size={18} /></span>
          </button>

          <button className={`step ${activeStep === 2 ? 'active' : 'pending'}`} onClick={() => setActiveStep(2)}>
            <span className="step-number">2</span>
            <div className="step-copy">
              <small>STEP 2 • IDENTITY PROOF</small>
              <strong>Valid ID &amp; Residency Proof</strong>
            </div>
            <span className="step-icon"><IdCard size={18} /></span>
          </button>
        </div>

        <div className="resident-signup-layout">
          <main className="resident-form-panel">
            {activeStep === 1 ? renderStepOne() : renderStepTwo()}
          </main>

          <aside className="resident-side-panel">
            {activeStep === 1 ? (
              <>
                <div className="hall-card">
                  <div className="hall-image">
                    <div className="hall-sky" />
                    <div className="hall-building">
                      <div className="roof" />
                      <div className="front" />
                    </div>
                  </div>
                  <div className="hall-title">Barangay Amanoaoac Hall</div>
                </div>

                <div className="info-list">
                  <p>Digital accounts allow direct access to:</p>
                  <ul>
                    <li><span className="mini-check"><Check size={12} /></span> Barangay Clearance &amp; Indigency</li>
                    <li><span className="mini-check"><Check size={12} /></span> Business Residency Endorsement</li>
                    <li><span className="mini-check"><Check size={12} /></span> Emergency Weather Bulletins</li>
                  </ul>
                </div>

                <div className="privacy-box">
                  <div className="privacy-head">
                    <ShieldCheck size={16} />
                    <strong>Data Privacy Act (RA 10173)</strong>
                  </div>
                  <p>Your submitted information is encrypted and solely utilized by the Barangay Local Government Unit (BLGU) of Amanoaoac for verification and social registry.</p>
                  <div className="privacy-foot">
                    <span>256-Bit SSL Encrypted</span>
                    <span>© BGU Certified</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="info-panel-tile">
                  <div className="info-panel-head"><CircleHelp size={16} /> Why Complete Step 2?</div>
                  <ul>
                    <li>Katitaw na patunay na ikaw ay lehitimong nanirahan sa Purok at may valid residency record with Barangay Amanoaoac.</li>
                    <li>Express e-Classes (Barangay Clearance, Certificate of Indigency, Good Moral).</li>
                    <li>Dispute Mediation (Lupong Tagapamayapa) schedule filings without lining up.</li>
                    <li>Emergency Calamity Assistance &amp; Priority distribution of agricultural supplies.</li>
                    <li>Public health and social service support.</li>
                    <li>What happens next? You will receive an official SMS status confirmation within 10-day Registry Reference Code once reviewed by our Barangay Secretary.</li>
                  </ul>
                </div>

                <div className="info-panel-tile dark-tile">
                  <div className="info-panel-head"><ShieldCheck size={16} /> Data Security Guarantee</div>
                  <p>Your files are secured by 256-Bit SSL encryption adhering to DILG E-Governance Standards and National Privacy Commission directives.</p>
                  <div className="support-line">
                    <strong>Barangay Hall Desk Assistance:</strong>
                    <span>(075) 569-2041</span>
                    <a href="mailto:amanoaoac.mapandan@pangasinan.gov.ph">amanoaoac.mapandan@pangasinan.gov.ph</a>
                  </div>
                </div>

                <div className="info-panel-tile note-tile">
                  <div className="info-panel-head"><Camera size={16} /> Need in-person document scanning?</div>
                  <p>Visit the Barangay Hall Reception Desk, Purok Center, Mapandan.<br />Monday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>

      <div className="site-copyright">© 2025 Barangay Amanoaoac, Municipality of Mapandan, Pangasinan. Republic of the Philippines.</div>
      <Footer />
    </div>
  );
}