import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import GalleryBento from '../components/GalleryBento';
import useScrollReveal from '../hooks/useScrollReveal';
import { usePropertyById } from '../hooks/useContentQueries';

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { data: property, isLoading: loading } = usePropertyById(projectId);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [lightbox, setLightbox] = useState(null); // { items: [{image, title}], index }
  const touchStartX = React.useRef(null);

  useScrollReveal([property, loading]);

  const openLightbox = (items, index) => setLightbox({ items, index });
  const closeLightbox = () => setLightbox(null);

  const showPrevLightbox = useCallback(() => {
    setLightbox((current) =>
      current ? { ...current, index: (current.index - 1 + current.items.length) % current.items.length } : current
    );
  }, []);

  const showNextLightbox = useCallback(() => {
    setLightbox((current) =>
      current ? { ...current, index: (current.index + 1) % current.items.length } : current
    );
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) showPrevLightbox();
      else showNextLightbox();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!lightbox) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevLightbox();
      if (e.key === 'ArrowRight') showNextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, showPrevLightbox, showNextLightbox]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background text-on-background font-body-md antialiased flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center py-20 px-margin-page">
          <span className="material-symbols-outlined text-outline text-7xl mb-4">gpp_maybe</span>
          <h1 className="font-headline-md text-headline-md text-primary mb-2">Property Not Found</h1>
          <p className="font-body-lg text-on-surface-variant mb-6 text-center max-w-md">
            The property details page you are looking for does not exist or has been moved.
          </p>
          <Link to="/properties" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-subhead-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
            Back to Properties
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

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
    }, 3000);
  };

  const handleScrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Sticky Project Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Sticky Project Header with Back Button */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/50 w-full">
        <div className="max-w-7xl mx-auto px-margin-page py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link 
              to="/properties" 
              className="text-primary hover:text-on-primary-fixed-variant p-1 rounded-full hover:bg-surface-container transition-colors shrink-0 flex items-center justify-center"
              aria-label="Back to properties"
            >
              <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
            </Link>
            <span className="font-headline-md text-xl md:text-2xl text-primary font-bold tracking-tight line-clamp-1">
              {property.title}
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <button 
              onClick={() => handleScrollToSection('overview')} 
              className={`font-body-md text-body-md pb-1 transition-colors border-b-2 hover:text-primary ${activeTab === 'overview' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => handleScrollToSection('facilities')} 
              className={`font-body-md text-body-md pb-1 transition-colors border-b-2 hover:text-primary ${activeTab === 'facilities' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant'}`}
            >
              Facilities
            </button>
            <button 
              onClick={() => handleScrollToSection('developments')} 
              className={`font-body-md text-body-md pb-1 transition-colors border-b-2 hover:text-primary ${activeTab === 'developments' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant'}`}
            >
              Developments
            </button>
            <button 
              onClick={() => handleScrollToSection('invest')} 
              className={`font-body-md text-body-md pb-1 transition-colors border-b-2 hover:text-primary ${activeTab === 'invest' ? 'border-primary text-primary font-bold' : 'border-transparent text-on-surface-variant'}`}
            >
              Investment
            </button>
            <button 
              onClick={() => handleScrollToSection('inquire')} 
              className="bg-primary text-on-primary px-5 py-2 rounded-lg font-subhead-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm cursor-pointer"
            >
              Inquire Now
            </button>
          </div>

          {/* Mobile Menu Inquire Button */}
          <div className="md:hidden">
            <button 
              onClick={() => handleScrollToSection('inquire')} 
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-subhead-sm hover:bg-on-primary-fixed-variant transition-colors shadow-sm cursor-pointer text-sm"
            >
              Inquire
            </button>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[550px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              alt={property.title} 
              className="w-full h-full object-cover brightness-[0.8]" 
              src={property.heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-emerald/70 via-black/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10 px-margin-page max-w-7xl mx-auto w-full text-white">
            <div data-reveal className="max-w-3xl">
              <span className="inline-block mb-4 px-4 py-1 rounded-full bg-secondary-container/20 border border-secondary-container/40 font-subhead-sm text-secondary-container uppercase tracking-widest">
                {property.intro.tag}
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight drop-shadow-md">
                {property.title}
              </h1>
              <p className="font-body-lg text-body-lg text-white/90 mb-10 max-w-xl drop-shadow-sm leading-relaxed">
                {property.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handleScrollToSection('inquire')} 
                  className="bg-primary hover:bg-secondary text-on-primary hover:scale-[1.02] transition-all px-8 py-4 rounded-xl font-subhead-lg shadow-xl shadow-primary/20 cursor-pointer"
                >
                  Schedule a Private Tour
                </button>
                <button 
                  onClick={() => handleScrollToSection('facilities')}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-subhead-lg transition-all cursor-pointer"
                >
                  Explore Features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-section-gap px-margin-page bg-surface-container-lowest scroll-mt-24">
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
            <div data-reveal="left" className="md:col-span-7 space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary">
                {property.intro.title}
              </h2>
              <div className="space-y-4 text-on-surface-variant font-body-lg leading-relaxed">
                {property.intro.text.map((paragraph, index) => (
                  <p key={index} className={index === 1 && property.id === 'east-west-breeze' ? 'font-bold text-primary italic' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-8 border-t border-outline-variant pt-8 mt-8">
                {property.intro.stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-primary font-display-lg text-4xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="font-subhead-sm text-outline uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div data-reveal="right" className="md:col-span-5 relative group mt-8 md:mt-0">
              <div className="absolute -inset-4 bg-primary-fixed-dim/20 rounded-2xl -z-10 transition-all group-hover:scale-105"></div>
              <img 
                className="rounded-xl shadow-2xl w-full aspect-[4/3] object-cover relative z-10" 
                src={property.intro.image}
                alt="Estate Showcase Landscape"
              />
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="py-section-gap px-margin-page bg-surface scroll-mt-24">
          <div data-reveal className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              {property.facilities.title}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {property.facilities.subtitle}
            </p>
          </div>

          {/* Conditional Layout Rendering */}
          <GalleryBento
            items={property.facilities.items}
            wideFourth={property.facilities.style !== 'bento-ewb'}
            onOpen={(index) => openLightbox(property.facilities.items, index)}
          />
        </section>

        {/* Project Developments Section */}
        <section id="developments" className="py-section-gap px-margin-page bg-surface-container-low scroll-mt-24">
          <div data-reveal className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              {property.developments?.title || "Project Developments"}
            </h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {property.developments?.subtitle}
            </p>
          </div>
          
          <GalleryBento
            items={property.developments?.items || []}
            wideFourth={property.developments?.style === 'bento-mv'}
            onOpen={(index) => openLightbox(property.developments.items, index)}
          />
        </section>

        {/* Investment Section */}
        <section id="invest" className="py-section-gap px-margin-page bg-surface scroll-mt-24">
          {property.investment.style === 'bento-ewb-inv' ? (
            /* East West Breeze Bento Investment */
            <div className="max-w-7xl mx-auto">
              <h2 data-reveal className="font-headline-md text-headline-md text-primary mb-12 text-center">
                {property.investment.title}
              </h2>

              <div data-reveal className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Large Item */}
                <div className="col-span-12 md:col-span-8 bg-primary rounded-3xl p-8 md:p-12 text-on-primary relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                  <div className="relative z-10">
                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-6">
                      {property.investment.items[0].icon}
                    </span>
                    <h3 className="font-headline-md text-3xl mb-4">{property.investment.items[0].title}</h3>
                    <p className="font-body-lg opacity-85 max-w-lg leading-relaxed">
                      {property.investment.items[0].description}
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10 select-none">
                    <span className="material-symbols-outlined text-[300px]">finance_chip</span>
                  </div>
                </div>

                {/* Small Item 1 */}
                <div className="col-span-12 md:col-span-4 bg-tertiary rounded-3xl p-8 text-on-tertiary flex flex-col justify-center min-h-[250px]">
                  <h3 className="font-headline-md text-2xl mb-4">{property.investment.items[1].title}</h3>
                  <p className="font-body-md opacity-85 leading-relaxed">
                    {property.investment.items[1].description}
                  </p>
                </div>

                {/* Small Item 2 */}
                <div className="col-span-12 md:col-span-4 bg-surface-container-high border border-outline-variant/40 rounded-3xl p-8 flex flex-col justify-between min-h-[250px]">
                  <div>
                    <span className="material-symbols-outlined text-primary text-4xl mb-4">
                      {property.investment.items[2].icon}
                    </span>
                    <h3 className="font-subhead-lg text-primary uppercase tracking-wider mb-2">
                      {property.investment.items[2].title}
                    </h3>
                  </div>
                  <p className="text-on-surface-variant font-body-md leading-relaxed">
                    {property.investment.items[2].description}
                  </p>
                </div>

                {/* Medium Item */}
                <div className="col-span-12 md:col-span-8 bg-secondary-container rounded-3xl p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 min-h-[250px]">
                  <div className="hidden sm:flex w-24 h-24 md:w-32 md:h-32 bg-white/40 rounded-full flex-shrink-0 items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-5xl">
                      {property.investment.items[3].icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-on-secondary-container text-2xl mb-3">
                      {property.investment.items[3].title}
                    </h3>
                    <p className="text-on-secondary-container/85 font-body-md leading-relaxed">
                      {property.investment.items[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mountain View Asymmetric List & Asymmetric Images Layout */
            <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
              <div data-reveal="left" className="md:col-span-6 space-y-8">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Investment</span>
                <h2 className="font-headline-md text-headline-md text-primary leading-tight">
                  {property.investment.title}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {property.investment.description}
                </p>
                
                <ul className="space-y-6">
                  {property.investment.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary bg-[#E8F5F0] p-2.5 rounded-lg shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <span className="font-subhead-lg text-subhead-lg text-slate-text block mb-1">
                          {item.title}
                        </span>
                        <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {item.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4">
                  <button 
                    onClick={() => handleScrollToSection('inquire')}
                    className="bg-primary text-on-primary hover:bg-secondary hover:scale-[1.02] transition-all px-10 py-4 rounded-xl font-subhead-lg shadow-xl shadow-primary/10 cursor-pointer"
                  >
                    Request Price List
                  </button>
                </div>
              </div>

              {/* Asymmetric Grid of 4 Images */}
              <div data-reveal="right" className="md:col-span-6 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    className="rounded-xl w-full aspect-square object-cover shadow-xl hover:scale-[1.02] transition-transform duration-300" 
                    src={property.investment.images[0]} 
                    alt="Planned Perimeters"
                  />
                  <img 
                    className="rounded-xl w-full aspect-[3/4] object-cover shadow-xl hover:scale-[1.02] transition-transform duration-300" 
                    src={property.investment.images[1]} 
                    alt="Scenic deck trippings"
                  />
                </div>
                <div className="space-y-4 pt-12">
                  <img 
                    className="rounded-xl w-full aspect-[3/4] object-cover shadow-xl hover:scale-[1.02] transition-transform duration-300" 
                    src={property.investment.images[2]} 
                    alt="Stone and wood detailings"
                  />
                  <img 
                    className="rounded-xl w-full aspect-square object-cover shadow-xl hover:scale-[1.02] transition-transform duration-300" 
                    src={property.investment.images[3]} 
                    alt="Lush plant features"
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Lead Inquiry Submission Section */}
        <section id="inquire" className="py-section-gap px-margin-page bg-surface-container-lowest scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div data-reveal="zoom" className="bg-deep-emerald rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
              
              {/* Form Info Box */}
              <div className="lg:w-1/2 p-12 md:p-20 text-white flex flex-col justify-between">
                <div>
                  <span className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20 font-label-caps text-secondary-container uppercase tracking-widest text-[10px]">
                    trippings & price list
                  </span>
                  <h2 className="font-display-lg text-4xl md:text-5xl mb-6 leading-tight">
                    Begin Your Journey Today
                  </h2>
                  <p className="font-body-lg text-white/70 mb-10 leading-relaxed max-w-md">
                    Our dedicated property consultants are ready to help you find the perfect lot for your future sanctuary. Reach out to learn more about our current inventory, payment options, and pricing.
                  </p>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-body-md text-white/95">
                    <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                    <span>Exclusive Site Trippings</span>
                  </li>
                  <li className="flex items-center gap-4 text-body-md text-white/95">
                    <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                    <span>Flexible Financing Options</span>
                  </li>
                  <li className="flex items-center gap-4 text-body-md text-white/95">
                    <span className="material-symbols-outlined text-secondary-container">check_circle</span>
                    <span>Organic Farming Consultations</span>
                  </li>
                </ul>
              </div>

              {/* Form Input Box */}
              <div className="lg:w-1/2 bg-white p-12 md:p-20 flex flex-col justify-center">
                {submitted ? (
                  <div className="text-center py-12 animate-fadeIn">
                    <span className="material-symbols-outlined text-7xl text-primary animate-bounce fill-icon">
                      check_circle
                    </span>
                    <h3 className="font-headline-md text-3xl text-slate-text mt-6">Inquiry Submitted!</h3>
                    <p className="font-body-lg text-on-surface-variant mt-3 max-w-sm mx-auto leading-relaxed">
                      Thank you for your interest in {property.title}. A designated property specialist will reach out to you with details shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-subhead-sm text-outline uppercase mb-2">Full Name</label>
                      <input 
                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body-md text-body-md" 
                        placeholder="John Doe" 
                        type="text" 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block font-subhead-sm text-outline uppercase mb-2">Email Address</label>
                      <input 
                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body-md text-body-md" 
                        placeholder="john@example.com" 
                        type="email" 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block font-subhead-sm text-outline uppercase mb-2">Mobile Number</label>
                      <input 
                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body-md text-body-md" 
                        placeholder="+63 900 000 0000" 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block font-subhead-sm text-outline uppercase mb-2">Message (Optional)</label>
                      <textarea 
                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-body-md text-body-md resize-none" 
                        placeholder={`I'm interested in viewing a lot at ${property.title}...`} 
                        rows="3"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <button 
                      className="w-full bg-primary text-on-primary py-5 rounded-xl font-subhead-lg hover:bg-primary/95 hover:scale-[1.01] transition-all shadow-lg cursor-pointer"
                      type="submit"
                    >
                      Send Inquiry
                    </button>
                    
                    <p className="text-center text-[10px] text-outline uppercase tracking-wider">
                      By submitting you agree to our <a className="underline hover:text-primary" href="#">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fadeIn"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.06),transparent_60%)]" />

          {/* Top bar: counter + close */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 z-10">
            <span className="font-subhead-sm text-white/80 tracking-widest text-xs bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              {lightbox.index + 1} / {lightbox.items.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:rotate-90 text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {lightbox.items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrevLightbox(); }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-white flex items-center justify-center transition-all duration-200 cursor-pointer z-10"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNextLightbox(); }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 text-white flex items-center justify-center transition-all duration-200 cursor-pointer z-10"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}

          <div
            className="w-full max-w-5xl max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <LightboxImage
              key={lightbox.index}
              src={lightbox.items[lightbox.index].image}
              alt={lightbox.items[lightbox.index].title || 'Enlarged view'}
            />

            {lightbox.items[lightbox.index].title && (
              <h3 className="font-headline-md text-white text-xl md:text-2xl mt-5 text-center transition-opacity duration-300">
                {lightbox.items[lightbox.index].title}
              </h3>
            )}

            {/* Thumbnail strip */}
            {lightbox.items.length > 1 && (
              <div className="mt-6 flex gap-2 overflow-x-auto max-w-full px-2 pb-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {lightbox.items.map((item, idx) => (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLightbox((current) => current ? { ...current, index: idx } : current); }}
                    className={`relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                      idx === lightbox.index
                        ? 'ring-2 ring-secondary-container opacity-100 scale-105'
                        : 'ring-1 ring-white/15 opacity-50 hover:opacity-80'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LightboxImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full flex items-center justify-center">
      {!loaded && (
        <div className="absolute animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white/60"></div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl transition-opacity duration-500 ease-out animate-scaleUp ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
