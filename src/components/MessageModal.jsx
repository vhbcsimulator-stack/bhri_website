import React, { useState } from 'react';

// "Message Us" popup shared by the navbar and the home page CTA.
export default function MessageModal({ onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative bg-surface w-full max-w-lg p-8 rounded-2xl border border-outline-variant shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-6xl text-primary animate-bounce fill-icon">
              check_circle
            </span>
            <h3 className="font-headline-md text-2xl text-slate-text mt-4">Thank You!</h3>
            <p className="font-body-lg text-on-surface-variant mt-2">
              Your message has been sent. A realty specialist will contact you soon.
            </p>
          </div>
        ) : (
          <div>
            <span className="material-symbols-outlined text-primary text-4xl mb-2">mail</span>
            <h3 className="font-headline-md text-2xl text-slate-text mb-2">Connect with a Specialist</h3>
            <p className="font-body-md text-on-surface-variant mb-6">
              Fill out the form below and we'll help guide you to the perfect property.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="message-name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="message-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="message-email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="message-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="message-phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="message-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                  placeholder="+63 900 000 0000"
                />
              </div>

              <div>
                <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="message-message">
                  How can we help? *
                </label>
                <textarea
                  id="message-message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md resize-none"
                  placeholder="I'm interested in pre-selling lots..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-subhead-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md mt-4 cursor-pointer"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
