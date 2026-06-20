import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getAllProperties } from '../data/propertiesManager';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (e) {
        console.error("Failed to load properties:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased flex flex-col">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Hero Section */}
      <header className="relative w-full h-[819px] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6BynD1H6n9n7VpIxcmWkTQQSDZVr9QCdsLb-dLAHmEjgD_UMLCI8YI0MQnhT9UNChpoxQko_Jsa2u1bdyqzMm1b1Rgmbt9LSw4W-vxKXkia2F22u5r7QOGsoLCsyoZvCmt2raQqZjhnP7z4ofXPvmrfjeDtdEoj3K4fk-MOv6v6NlxqtxGcd1_xig8-rphCpBUlaJipJU3cHpFqq8_LoIe-7h30Emh9Wf4MLt_dKzsslVKwBmN-76N90XOGZ13QC54fBKlEIxrH0")` 
            }}
          ></div>
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-deep-emerald/90 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-margin-page max-w-4xl mx-auto mt-12">
          <h1 className="font-display-lg text-display-lg md:text-[56px] text-on-primary mb-stack-md drop-shadow-md leading-tight">
            Bright places. Beautiful possibilities.
          </h1>
          <p className="font-body-lg text-body-lg text-tertiary-fixed mb-stack-lg max-w-2xl mx-auto opacity-95">
            A clear, premium identity for every property touchpoint. Your Best Property Investment Starts Here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              className="bg-on-primary text-primary px-8 py-4 rounded-lg font-subhead-lg shadow-lg hover:bg-surface-container transition-all hover:-translate-y-1 inline-block" 
              href="#properties"
            >
              View Properties
            </a>
            <a 
              className="bg-transparent border border-on-primary text-on-primary px-8 py-4 rounded-lg font-subhead-lg hover:bg-on-primary/10 transition-all inline-block" 
              href="#about"
            >
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Featured Properties (Bento Grid) */}
      <section className="py-section-gap px-margin-page w-full" id="properties">
        <div className="mb-stack-lg text-left">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Featured</span>
          <h2 className="font-headline-md text-headline-md text-slate-text mt-2">Premium Leisure Communities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {loading ? (
            <>
              <div className="md:col-span-7 h-96 rounded-xl bg-surface-container animate-pulse border border-outline-variant"></div>
              <div className="md:col-span-5 h-96 rounded-xl bg-surface-container animate-pulse border border-outline-variant"></div>
            </>
          ) : properties.length > 0 ? (
            properties.slice(0, 2).map((property, index) => {
              const colSpanClass = index === 0 ? 'md:col-span-7' : 'md:col-span-5';
              return (
                <Link 
                  key={property.id}
                  to={`/properties/${property.id}`} 
                  className={`${colSpanClass} group cursor-pointer`}
                >
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant">
                    <img 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      src={property.cardImage} 
                      alt={property.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-emerald/90 via-deep-emerald/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-on-primary w-full">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-headline-md text-2xl mb-2">{property.title}</h3>
                          <p className="font-body-md text-tertiary-fixed line-clamp-2 max-w-lg">
                            {property.description}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-4xl bg-on-primary/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-primary transition-colors shrink-0">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-12 text-center py-12">
              <p className="font-body-lg text-on-surface-variant">No featured properties found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-surface-container-low py-section-gap" id="about">
        <div className="px-margin-page max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-section-gap items-center">
            <div className="lg:w-1/2">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Why Choose Us</span>
              <h2 className="font-headline-md text-headline-md text-slate-text mt-2 mb-stack-md">A modern real estate brand with warmth and confidence.</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
                This identity system balances the trust of an established realty company with the clarity and energy expected by today's property buyers.
              </p>
              
              <div className="space-y-stack-md">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-fixed text-on-primary-fixed p-3 rounded-lg shrink-0">
                    <span className="material-symbols-outlined fill-icon">forum</span>
                  </div>
                  <div>
                    <h4 className="font-subhead-lg text-subhead-lg text-slate-text">Communication</h4>
                    <p className="font-body-md text-on-surface-variant mt-1">Experience seamless communication where clear channels promote collaboration and understanding.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-fixed text-on-primary-fixed p-3 rounded-lg shrink-0">
                    <span className="material-symbols-outlined fill-icon">verified</span>
                  </div>
                  <div>
                    <h4 className="font-subhead-lg text-subhead-lg text-slate-text">Reliability</h4>
                    <p className="font-body-md text-on-surface-variant mt-1">Trust in unwavering reliability. With a steadfast commitment to quality and consistency, we deliver on our promises.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-primary-fixed text-on-primary-fixed p-3 rounded-lg shrink-0">
                    <span className="material-symbols-outlined fill-icon">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-subhead-lg text-subhead-lg text-slate-text">Prime Location</h4>
                    <p className="font-body-md text-on-surface-variant mt-1">Discover unparalleled convenience with strategic positioning offering easy access to key destinations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative mt-8 lg:mt-0">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-outline-variant relative">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcz4ZJKb6HP1nh3jM4LnWgsMyIOApmPTbvmQ3JqeZFvl9clo36R-rYpAfrBAExluuMKr-e2BBaGSTEzjZyFs_RR21vzbU4N7QErlrXZSLE9WU-X4jnz5pVgnGOKz3DrTaiMBkqJxrNOHM6TDYc44PgJSyIL7nelgmA1JBINfm8lFEXltDZ3GZIupzozNm370xBLv3HzA1HqPxcHY8QQvLWTPPNriFyW2xGlcYnnrPwUf5ocFnJTxWdRY0Ajf5ZpdOjZGo-13o6458" 
                  alt="Modern Luxury Interior" 
                />
                <div className="absolute inset-0 bg-primary/10"></div>
              </div>
              
              {/* Decorative Floating Element */}
              <div className="absolute -bottom-8 -left-8 bg-surface p-6 rounded-xl shadow-md border border-outline-variant hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined">psychiatry</span>
                  </div>
                  <div>
                    <p className="font-subhead-lg text-slate-text">Sustainable Growth</p>
                    <p className="font-body-sm text-on-surface-variant">Harmonious with nature</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-section-gap px-margin-page max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid md:grid-cols-2 gap-gutter relative z-10">
          <div className="bg-surface/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">flag</span>
            <h3 className="font-headline-md text-headline-md text-slate-text mb-4">Mission</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              To guide clients toward property opportunities with clarity, integrity, and attentive service - helping them make confident decisions and create lasting value.
            </p>
            <div className="pt-6 border-t border-outline-variant">
              <p className="font-label-caps text-label-caps text-primary">DIRECTION: TRUST / SERVICE / VALUE</p>
            </div>
          </div>
          
          <div className="bg-surface/80 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">visibility</span>
            <h3 className="font-headline-md text-headline-md text-slate-text mb-4">Vision</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              To become a trusted Philippine real estate brand known for beautiful places, responsible growth, and relationships that endure.
            </p>
            <div className="pt-6 border-t border-outline-variant">
              <p className="font-label-caps text-label-caps text-primary">DIRECTION: PLACE / PROGRESS / PARTNERSHIP</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-on-primary py-section-gap text-center px-margin-page" id="contact">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline-md text-headline-md mb-stack-md">Ready to Invest?</h2>
          <p className="font-body-lg text-body-lg text-tertiary-fixed mb-stack-lg">
            Begin your journey here and explore the best property investments.
          </p>
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-on-primary text-primary px-8 py-4 rounded-lg font-subhead-lg hover:bg-surface-container transition-colors shadow-sm cursor-pointer"
          >
            Contact Our Specialists
          </button>
        </div>
      </section>

      <Footer />

      {/* Message Us Modal Popup */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative bg-surface w-full max-w-lg p-8 rounded-2xl border border-outline-variant shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2"
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
                    <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="name">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="email">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="phone">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-outline rounded-lg px-4 py-2.5 bg-surface text-on-surface focus:outline-none focus:border-primary transition-colors font-body-md"
                      placeholder="+63 900 000 0000"
                    />
                  </div>

                  <div>
                    <label className="block font-subhead-sm text-subhead-sm text-slate-text mb-1" htmlFor="message">
                      How can we help? *
                    </label>
                    <textarea 
                      id="message"
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
      )}
    </div>
  );
}
