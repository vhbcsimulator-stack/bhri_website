import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getContactContent } from '../data/contactContentManager';
import { contactContentData } from '../data/contactContentData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ContactPage() {
  const [content, setContent] = useState(contactContentData);

  useScrollReveal([content]);

  useEffect(() => {
    getContactContent()
      .then(setContent)
      .catch((e) => console.error("Failed to load contact page content:", e));
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Accordion active state for FAQ items
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
      });
    }, 2500);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = content.faq.items;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased flex flex-col">
      <Navbar onOpenModal={() => window.scrollTo({ top: document.getElementById('inquiry-form').offsetTop - 100, behavior: 'smooth' })} />

      <main className="w-full flex-grow">
        {/* Hero Section */}
        <section className="w-full py-section-gap relative overflow-hidden">
          {/* Background image with readability overlay */}
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8F5F0]/95 via-[#E8F5F0]/85 to-[#E8F5F0]/50"></div>
          <div className="max-w-7xl mx-auto px-margin-page relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">

              <div data-reveal className="space-y-stack-md">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest block">
                  Contact Us
                </span>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                  {content.hero.title}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                  {content.hero.text}
                </p>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full blur-3xl -z-0"></div>
        </section>

        {/* Contact & Form Bento Grid */}
        <section className="max-w-7xl mx-auto px-margin-page py-section-gap" id="inquiry-form">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

            {/* Contact Info Cards */}
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Address */}
              <div data-reveal="left" className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#E8F5F0] rounded-full flex items-center justify-center mb-stack-md">
                  <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                </div>
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-stack-sm">{content.headOffice.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {content.headOffice.address}
                </p>
              </div>

              {/* Direct Line */}
              <div data-reveal="left" style={{ '--reveal-delay': '120ms' }} className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#E8F5F0] rounded-full flex items-center justify-center mb-stack-md">
                  <span className="material-symbols-outlined text-primary text-2xl">phone_in_talk</span>
                </div>
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-stack-sm">{content.directLine.title}</h3>
                <a className="font-headline-md text-headline-md text-primary hover:text-primary-container transition-colors font-bold block mt-1" href={`tel:${content.directLine.phone.replace(/\s+/g, '')}`}>
                  {content.directLine.phone}
                </a>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{content.directLine.note}</p>
              </div>

              {/* Socials */}
              <div data-reveal="left" style={{ '--reveal-delay': '240ms' }} className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-stack-md">Connect With Us</h3>
                <div className="flex gap-4">
                  <a className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors duration-200" href="https://www.facebook.com/vhermosabrightcorp" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 1.913-.287 1.754h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 6.15 4.62 11.223 10.577 11.949Z" />
                    </svg>
                  </a>
                  <a className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors duration-200" href="https://www.instagram.com/investmentproperties.vhbc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors duration-200" href="https://www.linkedin.com/company/vhermosa-bright-corp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div data-reveal="right" className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-12 rounded-xl border border-outline-variant/50 shadow-sm">
              {submitted ? (
                <div className="text-center py-20 animate-fadeIn">
                  <span className="material-symbols-outlined text-7xl text-primary animate-bounce fill-icon">
                    check_circle
                  </span>
                  <h3 className="font-headline-md text-3xl text-slate-text mt-6">Message Sent Successfully!</h3>
                  <p className="font-body-lg text-on-surface-variant mt-3 max-w-md mx-auto">
                    Thank you for reaching out. One of our property specialists will contact you shortly to answer your questions.
                  </p>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">{content.form.title}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">{content.form.subtitle}</p>

                  <form onSubmit={handleSubmit} className="space-y-stack-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                      <div>
                        <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="firstName">First Name *</label>
                        <input
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                          id="firstName"
                          placeholder="Juan"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="lastName">Last Name *</label>
                        <input
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                          id="lastName"
                          placeholder="Dela Cruz"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                      <div>
                        <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="email">Email Address *</label>
                        <input
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                          id="email"
                          placeholder="juan@example.com"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="phone">Phone Number</label>
                        <input
                          className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md"
                          id="phone"
                          placeholder="09XX XXX XXXX"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="interest">Property of Interest *</label>
                      <select
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface"
                        id="interest"
                        required
                        value={formData.interest}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select a property</option>
                        <option value="eblf">East West Breeze Leisure Farm &amp; Resort</option>
                        <option value="mvlc">Mountain View Leisure Community</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="message">Message *</label>
                      <textarea
                        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md resize-none"
                        id="message"
                        placeholder="How can we help you?"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="pt-stack-sm">
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">By submitting you agree to our <a className="text-primary underline hover:opacity-85" href="#">privacy policy</a>.</p>
                      <button
                        className="w-full md:w-auto bg-primary-container text-white font-subhead-lg text-subhead-lg px-8 py-4 rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        type="submit"
                      >
                        Send Message
                        <span className="material-symbols-outlined text-lg">send</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Map Section */}
        <section data-reveal className="w-full h-96 relative overflow-hidden border-t border-b border-outline-variant/30">
          <iframe
            src={content.map.embedUrl}
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="VHBC Office location map"
          ></iframe>
        </section>

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto px-margin-page py-section-gap">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-stack-lg">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider mb-2 block">{content.faq.label}</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">{content.faq.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{content.faq.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-5xl mx-auto">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                style={{ '--reveal-delay': `${(idx % 2) * 120}ms` }}
                className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col"
                onClick={() => toggleFaq(idx)}
              >
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-2 flex items-start gap-2 select-none">
                  <span className="material-symbols-outlined text-primary-container mt-1 text-[20px]">
                    {activeFaq === idx ? 'keyboard_arrow_up' : 'help'}
                  </span>
                  <span>{item.q}</span>
                </h3>

                <div
                  className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-40 mt-2 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="font-body-md text-body-md text-on-surface-variant ml-7 border-t border-outline-variant/10 pt-2 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
