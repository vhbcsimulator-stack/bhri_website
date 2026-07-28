import Navbar from './Navbar';
import Footer from './Footer';

const getBlocks = (content, includeLegacyBody = false) => {
  if (Array.isArray(content.blocks)) return content.blocks;

  const paragraphs = Array.isArray(content.paragraphs)
    ? content.paragraphs
    : includeLegacyBody && content.body
      ? [content.body]
      : [];
  const bullets = Array.isArray(content.bullets) ? content.bullets : [];

  return [
    ...paragraphs.map((text) => ({ type: 'paragraph', text })),
    ...bullets.map((text) => ({ type: 'bullet', text })),
  ];
};

function ContentBlocks({ blocks, paragraphClassName = '' }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        block.type === 'bullet' ? (
          <ul key={index} className="list-disc pl-6 text-on-surface-variant">
            <li className="font-body-md text-body-md leading-relaxed">{block.text}</li>
          </ul>
        ) : (
          <p
            key={index}
            className={`font-body-md text-body-md text-on-surface-variant leading-relaxed ${paragraphClassName}`}
          >
            {block.text}
          </p>
        )
      ))}
    </div>
  );
}

export default function LegalPageLayout({ content }) {
  const heroBlocks = getBlocks(content.hero);

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

              {heroBlocks.length > 0 && (
                <ContentBlocks blocks={heroBlocks} paragraphClassName="max-w-2xl" />
              )}

              <p className="font-body-sm text-body-sm text-on-surface-variant pt-2">
                Last updated: {content.updatedAt}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-margin-page py-section-gap space-y-stack-lg">
          {content.sections.map((section, index) => {
            const blocks = getBlocks(section, true);

            return (
              <div key={index} className="space-y-stack-sm">
                <h2 className="font-headline-md text-headline-md text-primary">
                  {section.heading}
                </h2>
                <ContentBlocks blocks={blocks} />
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
