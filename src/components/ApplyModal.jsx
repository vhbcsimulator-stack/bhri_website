import React, { useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = '.pdf,.doc,.docx';

// UI-only application modal. Collects resume (required) + cover letter
// (optional) and simulates a submission — no upload/email wiring yet.
export default function ApplyModal({ role, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    if (!file) {
      setter(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(`"${file.name}" is too large. Files must be under 5MB.`);
      e.target.value = '';
      return;
    }
    setError('');
    setter(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please attach your resume.');
      return;
    }
    setError('');
    setSubmitting(true);
    // Placeholder submit — no backend/email wiring yet.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative bg-surface w-full max-w-lg p-8 rounded-2xl border border-outline-variant shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-10 animate-fadeIn">
            <span className="material-symbols-outlined text-6xl text-primary">check_circle</span>
            <h3 className="font-headline-md text-2xl text-slate-text mt-4">Application Sent!</h3>
            <p className="font-body-md text-on-surface-variant mt-2">
              Thank you for applying for {role.title}. Our HR team will reach out if your profile is a match.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-subhead-sm hover:bg-primary-container hover:text-on-primary-container transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-headline-md text-2xl text-primary mb-1">Apply for {role.title}</h3>
            <p className="font-body-sm text-on-surface-variant mb-6">{role.location} &middot; {role.jobType}</p>

            {error && (
              <div className="bg-error-container text-on-error-container p-3.5 rounded-lg text-body-sm font-bold mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-1.5" htmlFor="apply-name">Full Name *</label>
                  <input
                    id="apply-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div>
                  <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-1.5" htmlFor="apply-phone">Phone Number</label>
                  <input
                    id="apply-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                    placeholder="09XX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-1.5" htmlFor="apply-email">Email Address *</label>
                <input
                  id="apply-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                  placeholder="juan@example.com"
                />
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-1.5" htmlFor="apply-resume">Resume *</label>
                <input
                  id="apply-resume"
                  type="file"
                  required
                  accept={ACCEPTED_TYPES}
                  onChange={handleFileChange(setResumeFile)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface-variant file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-on-primary file:cursor-pointer cursor-pointer"
                />
                <p className="text-[10px] text-outline mt-1">PDF or Word document, up to 5MB.</p>
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-1.5" htmlFor="apply-cover-letter">Cover Letter (optional)</label>
                <input
                  id="apply-cover-letter"
                  type="file"
                  accept={ACCEPTED_TYPES}
                  onChange={handleFileChange(setCoverLetterFile)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-sm text-body-sm text-on-surface-variant file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-surface-container-high file:text-primary file:cursor-pointer cursor-pointer"
                />
                <p className="text-[10px] text-outline mt-1">PDF or Word document, up to 5MB.</p>
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-1.5" htmlFor="apply-message">Message (optional)</label>
                <textarea
                  id="apply-message"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md resize-none"
                  placeholder="Anything you'd like the HR team to know?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-subhead-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md mt-2 cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
