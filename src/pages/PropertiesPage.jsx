import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { useProperties } from '../hooks/useContentQueries';

export default function PropertiesPage() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ location: '', type: '' });

  const { data: properties = [], isLoading: loading } = useProperties();

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    if (appliedFilters.location) {
      filtered = filtered.filter(p => p.location.toLowerCase() === appliedFilters.location.toLowerCase());
    }

    if (appliedFilters.type) {
      filtered = filtered.filter(p => p.type === appliedFilters.type);
    }

    return filtered;
  }, [properties, appliedFilters]);

  useScrollReveal([filteredProperties, loading]);

  const handleApplyFilters = () => {
    setAppliedFilters({ location: selectedLocation, type: selectedType });
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased flex flex-col">
      <Navbar />

      {/* Page Header */}
      <header className="py-section-gap px-margin-page bg-surface-container-low">
        <div data-reveal className="max-w-7xl mx-auto text-center">
          <h1 className="font-display-lg text-display-lg text-primary mb-stack-md hidden md:block">
            Our Leisure Communities
          </h1>
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary mb-stack-md md:hidden">
            Our Leisure Communities
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
            Discover our meticulously planned leisure farm communities, designed to provide a harmonious blend of luxurious living and nature's tranquil embrace.
          </p>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="max-w-7xl mx-auto px-margin-page py-section-gap flex-grow w-full">
        {/* Filter Section */}
        <section className="mb-section-gap">
          <div data-reveal className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col md:flex-row gap-gutter items-end shadow-sm">
            <div className="w-full md:w-1/3">
              <label className="block font-subhead-sm text-subhead-sm text-on-surface-variant mb-2">Location</label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary bg-surface font-body-md text-body-md py-2.5 px-3 outline-none"
              >
                <option value="">All Locations</option>
                <option value="cavite">Indang, Cavite</option>
                <option value="batangas">Nasugbu, Batangas</option>
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block font-subhead-sm text-subhead-sm text-on-surface-variant mb-2">Property Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-outline-variant rounded-lg focus:border-primary focus:ring-primary bg-surface font-body-md text-body-md py-2.5 px-3 outline-none"
              >
                <option value="">All Types</option>
                <option value="farm">Leisure Farm Lot</option>
                <option value="resort">Resort Estate</option>
              </select>
            </div>

            <div className="w-full md:w-1/3">
              <button 
                onClick={handleApplyFilters}
                className="w-full bg-surface-container text-primary font-subhead-lg text-subhead-lg py-2.5 rounded-lg hover:bg-surface-variant transition-colors border border-outline-variant cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
          {loading ? (
            <>
              <div className="h-[450px] rounded-xl bg-surface-container animate-pulse border border-outline-variant"></div>
              <div className="h-[450px] rounded-xl bg-surface-container animate-pulse border border-outline-variant"></div>
            </>
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <article
                key={property.id}
                data-reveal
                className="bg-surface rounded-xl overflow-hidden border border-outline-variant group hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-72 w-full overflow-hidden bg-surface-container-low">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={property.cardImage}
                    alt={property.title}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-surface-container-low text-primary px-3 py-1 rounded-full font-label-caps text-label-caps backdrop-blur-sm bg-opacity-90">
                      {property.badgeLocation}
                    </span>
                    <span className="bg-surface-container-low text-primary px-3 py-1 rounded-full font-label-caps text-label-caps backdrop-blur-sm bg-opacity-90">
                      {property.badgeStatus}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-headline-md text-headline-md text-primary mb-2">
                    {property.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                    {property.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined">{property.iconName}</span>
                      <span className="font-subhead-sm text-subhead-sm">{property.highlightText}</span>
                    </div>
                    <Link 
                      to={`/properties/${property.id}`}
                      className="font-subhead-lg text-subhead-lg text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1"
                    >
                      Explore <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <span className="material-symbols-outlined text-outline text-5xl mb-2">search_off</span>
              <p className="font-body-lg text-on-surface-variant">No leisure communities match your selected filters.</p>
            </div>
          )}
        </section>

        {/* Info Bento Grid */}
        <section className="mt-section-gap grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div data-reveal="left" className="bg-surface-container-low rounded-xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">A Vision of Sustainability</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                At Bright Hermosa Realty Inc., our mission is to harness the inherent beauty of the land, creating sustainable high-end farm lots that seamlessly integrate with and enhance the natural environment. We are driven by a commitment to responsible land development.
              </p>
            </div>
            <span className="material-symbols-outlined text-[120px] text-surface-variant absolute -bottom-4 -right-4 opacity-50 z-0 select-none">
              eco
            </span>
          </div>
          
          <div data-reveal="right" className="bg-primary-container text-on-primary-container rounded-xl p-8 flex flex-col justify-center items-start">
            <span className="material-symbols-outlined text-[40px] mb-4">support_agent</span>
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Ready to Invest?</h3>
            <p className="font-body-md text-body-md text-on-primary-container mb-6 opacity-90">
              Connect with our property specialists to begin your journey.
            </p>
            <Link 
              to="/contact" 
              className="bg-on-primary text-primary px-6 py-2.5 rounded-lg font-subhead-lg text-subhead-lg hover:bg-primary hover:text-on-primary transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
