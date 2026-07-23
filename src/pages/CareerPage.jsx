import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { careerContentData } from '../data/careerContentData';
import useScrollReveal from '../hooks/useScrollReveal';
import { useCareerContent } from '../hooks/useContentQueries';

export default function CareerPage() {
  const { data: content = careerContentData } = useCareerContent();

  useScrollReveal([content]);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [jobType, setJobType] = useState('All');
  const [jobLocation, setJobLocation] = useState('All');
  const [appliedFilters, setAppliedFilters] = useState({ category: 'All', jobType: 'All', jobLocation: 'All' });

  const roleItems = content.roles.items;

  const categories = useMemo(() => ['All', ...new Set(roleItems.map((r) => r.jobCategory).filter(Boolean))], [roleItems]);
  const jobTypes = useMemo(() => ['All', ...new Set(roleItems.map((r) => r.jobType).filter(Boolean))], [roleItems]);
  const locations = useMemo(() => ['All', ...new Set(roleItems.map((r) => r.location).filter(Boolean))], [roleItems]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters({ category, jobType, jobLocation });
  };

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return roleItems.filter((role) => {
      const matchesQuery = !query || role.title.toLowerCase().includes(query);
      const matchesCategory = appliedFilters.category === 'All' || role.jobCategory === appliedFilters.category;
      const matchesType = appliedFilters.jobType === 'All' || role.jobType === appliedFilters.jobType;
      const matchesLocation = appliedFilters.jobLocation === 'All' || role.location === appliedFilters.jobLocation;
      return matchesQuery && matchesCategory && matchesType && matchesLocation;
    });
  }, [roleItems, search, appliedFilters]);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased flex flex-col">
      <Navbar />

      <main className="w-full flex-grow">
        {/* Hero Section */}
        <section className="w-full py-section-gap relative overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={content.hero.image}
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-emerald/90 via-deep-emerald/75 to-deep-emerald/40"></div>
          <div className="max-w-7xl mx-auto px-margin-page relative z-10">
            <div data-reveal className="max-w-2xl space-y-stack-md text-white">
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest block">
                {content.hero.tag}
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
                {content.hero.title}
              </h1>
              <p className="font-body-lg text-body-lg text-white/85 max-w-xl leading-relaxed">
                {content.hero.text}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-margin-page py-section-gap">
          <div data-reveal className="max-w-3xl mb-stack-lg space-y-2">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider block">
              {content.benefits.label}
            </span>
            <h2 className="font-headline-md text-headline-md text-primary">{content.benefits.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{content.benefits.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {content.benefits.items.map((item, idx) => (
              <div
                key={idx}
                data-reveal
                style={{ '--reveal-delay': `${(idx % 3) * 120}ms` }}
                className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 bg-[#E8F5F0] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-subhead-lg text-subhead-lg text-primary mb-1">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-section-gap">
          <div className="max-w-7xl mx-auto px-margin-page">
            <div data-reveal className="max-w-2xl mb-stack-lg space-y-2">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider block">
                {content.roles.label}
              </span>
              <h2 className="font-headline-md text-headline-md text-primary">{content.roles.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">{content.roles.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Filters Sidebar */}
              <form
                data-reveal="left"
                onSubmit={handleApplyFilters}
                className="lg:col-span-3 bg-surface p-6 rounded-xl border border-outline-variant/50 shadow-sm h-fit space-y-4"
              >
                <div>
                  <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="role-search">Search</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
                    <input
                      id="role-search"
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search job title..."
                      className="w-full bg-surface border border-outline-variant rounded-lg pl-9 pr-3 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="role-category">Job Category</label>
                  <select
                    id="role-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c === 'All' ? 'All Job Category' : c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="role-type">Job Type</label>
                  <select
                    id="role-type"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm"
                  >
                    {jobTypes.map((t) => (
                      <option key={t} value={t}>{t === 'All' ? 'All Job Type' : t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-subhead-sm text-subhead-sm text-on-surface mb-2" htmlFor="role-location">Job Location</label>
                  <select
                    id="role-location"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm text-body-sm"
                  >
                    {locations.map((l) => (
                      <option key={l} value={l}>{l === 'All' ? 'All Job Location' : l}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-subhead-sm hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer"
                >
                  Apply Filters
                </button>
              </form>

              {/* Roles List */}
              <div data-reveal="right" className="lg:col-span-9 space-y-4">
                {filteredRoles.length === 0 && (
                  <div className="text-center py-16 bg-surface rounded-xl border border-outline-variant/40">
                    <span className="material-symbols-outlined text-outline text-5xl">search_off</span>
                    <p className="font-body-md text-on-surface-variant mt-3">No open roles match your search right now.</p>
                  </div>
                )}
                {filteredRoles.map((role) => (
                  <div
                    key={role.id}
                    className="bg-surface p-6 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-subhead-lg text-subhead-lg text-primary mb-1">{role.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {role.location} &middot; {role.jobType} &middot; {role.jobCategory}
                      </p>
                      {role.description && (
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                          {role.description}
                        </p>
                      )}
                    </div>
                    <Link
                      to={`/careers/${role.id}`}
                      className="shrink-0 border border-primary text-primary px-6 py-2.5 rounded-lg font-subhead-sm hover:bg-primary hover:text-on-primary transition-all cursor-pointer text-center"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
