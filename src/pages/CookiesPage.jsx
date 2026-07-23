import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cookiesContentData } from '../data/cookiesContentData';
import { useCookiesContent } from '../hooks/useContentQueries';

export default function CookiesPage() {
  const { data: content = cookiesContentData } = useCookiesContent();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased flex flex-col">
      <Navbar />

      <main className="w-full flex-grow">
        <section className="w-full bg-[#E8F5F0] py-section-gap">
          <div className="max-w-7xl mx-auto px-margin-page">
            <div className="max-w-3xl space-y-stack-md">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest block">
                Legal
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                {content.hero.title}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {content.hero.subtitle}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Last updated: {content.updatedAt}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-margin-page py-section-gap space-y-stack-lg">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-stack-sm">
              <h2 className="font-headline-md text-headline-md text-primary">{section.heading}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{section.body}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
