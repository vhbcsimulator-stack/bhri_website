import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplyModal from '../components/ApplyModal';
import { getCareerContent } from '../data/careerContentManager';
import useScrollReveal from '../hooks/useScrollReveal';

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const [content, setContent] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  useScrollReveal([content]);

  useEffect(() => {
    let cancelled = false;
    getCareerContent()
      .then((data) => {
        if (cancelled) return;
        const role = data.roles.items.find((r) => r.id === jobId);
        if (!role) {
          setNotFound(true);
        } else {
          setContent({ career: data, role });
        }
      })
      .catch((e) => console.error("Failed to load job details:", e));
    return () => { cancelled = true; };
  }, [jobId]);

  if (notFound) {
    return <Navigate to="/careers" replace />;
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { role } = content;
  const otherRoles = content.career.roles.items.filter((r) => r.id !== role.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased flex flex-col">
      <Navbar />

      <main className="w-full flex-grow">
        {/* Header */}
        <section className="w-full bg-[#E8F5F0] py-section-gap relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-margin-page relative z-10">
            <div data-reveal className="max-w-3xl space-y-stack-sm">
              <Link
                to="/careers"
                className="inline-flex items-center gap-1.5 font-subhead-sm text-subhead-sm text-primary hover:text-primary-container transition-colors mb-2"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Back to Open Roles
              </Link>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block">
                {role.jobCategory}
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                {role.title}
              </h1>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-surface px-3.5 py-1.5 rounded-full font-body-sm text-body-sm text-on-surface-variant border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  {role.location}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface px-3.5 py-1.5 rounded-full font-body-sm text-body-sm text-on-surface-variant border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[16px] text-primary">work</span>
                  {role.jobType}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-surface px-3.5 py-1.5 rounded-full font-body-sm text-body-sm text-on-surface-variant border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[16px] text-primary">category</span>
                  {role.jobCategory}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-margin-page py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div data-reveal className="lg:col-span-8 space-y-stack-lg">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">Overview</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {role.overview || role.description}
                </p>
              </div>

              {role.responsibilities && role.responsibilities.length > 0 && (
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">Responsibilities</h2>
                  <ul className="space-y-3">
                    {role.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                        <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {role.qualifications && role.qualifications.length > 0 && (
                <div>
                  <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">Qualifications</h2>
                  <ul className="space-y-3">
                    {role.qualifications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">task_alt</span>
                        <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Apply Sidebar */}
            <div data-reveal="right" className="lg:col-span-4">
              <div className="sticky top-24 bg-deep-emerald rounded-2xl p-8 text-white shadow-xl">
                <span className="material-symbols-outlined text-secondary-container text-4xl mb-4">work_history</span>
                <h3 className="font-headline-md text-2xl mb-3">Ready to Apply?</h3>
                <p className="font-body-md text-white/80 mb-6 leading-relaxed">
                  Send us your resume and our HR team will get back to you regarding the {role.title} role.
                </p>
                <button
                  onClick={() => setApplyOpen(true)}
                  className="block text-center w-full bg-primary hover:bg-primary-container hover:text-on-primary-container text-on-primary py-3.5 rounded-lg font-subhead-lg transition-colors shadow-md cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Other Roles */}
        {otherRoles.length > 0 && (
          <section className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-section-gap">
            <div className="max-w-7xl mx-auto px-margin-page">
              <h2 data-reveal className="font-headline-md text-headline-md text-primary mb-stack-lg">Other Open Roles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {otherRoles.map((r) => (
                  <Link
                    key={r.id}
                    to={`/careers/${r.id}`}
                    className="bg-surface p-6 rounded-xl border border-outline-variant/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <h3 className="font-subhead-lg text-subhead-lg text-primary mb-1">{r.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {r.location} &middot; {r.jobType}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {applyOpen && <ApplyModal role={role} onClose={() => setApplyOpen(false)} />}
    </div>
  );
}
