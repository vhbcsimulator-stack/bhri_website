import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
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

  const faqItems = [
    {
      q: "Paano makakabili ng proyekto ng Bright Hermosa Realty Inc.?",
      a: "Upang makabili ng proyekto ng Bright Hermosa Realty Inc., makipag-ugnayan sa aming property specialist sa pamamagitan ng aming website o tawagan kami para sa detalyadong impormasyon at tulong sa proseso ng pagbili."
    },
    {
      q: "Paano ang kalidad ng mga proyekto ng Bright Hermosa Realty Inc.?",
      a: "Ang kalidad ng mga proyekto ng Bright Hermosa Realty Inc. ay mataas, na may pangako sa world-class amenities at maingat na disenyo sa mga leisure lifestyle communities, na nagbibigay ng komportable at marangyang karanasan sa mga residente."
    },
    {
      q: "Anong mga proyekto ang pinaka-popular?",
      a: "Ang aming pinaka-popular na mga proyekto ay ang EastWest Breeze Leisure Farm & Resort at ang Mountain View Leisure Community."
    },
    {
      q: "May mga outlet ba ang Bright Hermosa Realty Inc. sa malls?",
      a: "Walang mga outlet ang Bright Hermosa Realty Inc. sa malls. Ang kumpanya ay nakatuon sa pagbuo ng mga leisure lifestyle communities at nag-aalok ng mga property investment opportunities sa mga magagandang lokasyon."
    }
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased flex flex-col">
      <Navbar onOpenModal={() => window.scrollTo({ top: document.getElementById('inquiry-form').offsetTop - 100, behavior: 'smooth' })} />

      <main className="w-full flex-grow">
        {/* Hero Section */}
        <section className="w-full bg-[#E8F5F0] py-section-gap relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-margin-page relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-md leading-tight">Get in Touch</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Experience seamless communication at Bright Hermosa Realty Inc., where clear channels promote collaboration and understanding. Connect effortlessly with our team, ensuring your needs are heard and met every step of the way.
              </p>
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
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#E8F5F0] rounded-full flex items-center justify-center mb-stack-md">
                  <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                </div>
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-stack-sm">Head Office</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  VHermosa Bright Corp.<br />
                  Brgy. Daine 1,<br />
                  Indang Cavite, Philippines 4122
                </p>
              </div>

              {/* Direct Line */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#E8F5F0] rounded-full flex items-center justify-center mb-stack-md">
                  <span className="material-symbols-outlined text-primary text-2xl">phone_in_talk</span>
                </div>
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-stack-sm">Direct Line</h3>
                <a className="font-headline-md text-headline-md text-primary hover:text-primary-container transition-colors font-bold block mt-1" href="tel:09171626920">
                  0917 1626 920
                </a>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Available Mon-Fri, 9AM to 6PM</p>
              </div>

              {/* Socials */}
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-stack-md">Connect With Us</h3>
                <div className="flex gap-4">
                  <a className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors duration-200" href="https://www.facebook.com/vhermosabrightcorp" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-xl">public</span>
                  </a>
                  <a className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors duration-200" href="https://www.instagram.com/investmentproperties.vhbc/" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-xl">photo_camera</span>
                  </a>
                  <a className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors duration-200" href="https://www.linkedin.com/company/vhermosa-bright-corp/" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-xl">work</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-12 rounded-xl border border-outline-variant/50 shadow-sm">
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
                  <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">Send an Inquiry</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">Fill out the form below and our property specialists will get back to you shortly.</p>

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
                        className="w-full md:w-auto bg-primary-container text-on-primary-container font-subhead-lg text-subhead-lg px-8 py-4 rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
        <section className="w-full h-96 relative overflow-hidden border-t border-b border-outline-variant/30">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD89WliQNDaN6m_sM4bm6yksYZBeQ_c0gcCucxuRPPu1hHpXrlI4KRMgPQG-R9jdxoxRxyph1rqjLKkLdKHFXl4oOA1v14Kkp9anOUkAgIkmVSS2wanLeJDbjfjkCtBN_iS0a0wCb8d-oU8Id-Tvw2Z6kaqCyz_VvXfyKafX8QtDcouEXEDuz4ziLBQVh-5eJxt_VkGG8hAmqb6yzbx6FEhunmef-Ew4Zy9Be3x6YOVqOK7cs3UmwfUqasGWot3aDcGltIDztPENdE"
            alt="Map location of Indang, Cavite, Philippines"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto px-margin-page py-section-gap">
          <div className="text-center max-w-3xl mx-auto mb-stack-lg">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider mb-2 block">Knowledge Base</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">Frequently Asked Questions</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Clear information and responsible guidance for our prospective residents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-5xl mx-auto">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
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
