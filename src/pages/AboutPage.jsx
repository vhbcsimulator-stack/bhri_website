import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChairmanImage from '../assets/static image/board_of_directors_images/chairman-company-profile.png';
import PresidentImage from '../assets/static image/board_of_directors_images/pres.png';
import VicePresidentImage from '../assets/static image/board_of_directors_images/vp.png';
import HeadOfficeImage from '../assets/static image/offices/HEAD-OFFICE-East-West-Breeze-Leisure-Farm-1024x768.jpeg';
import SalesOfficeMVLCImage from '../assets/static image/offices/SALES-OFFICE-Mountain-View-Leisure-Community-1024x576.png';
import SalesOfficeRTEImage from '../assets/static image/offices/SALES-OFFICE-Royal-Tagaytay-Estates-1024x576.png';
import SubsidiaryOfficeImage from '../assets/static image/offices/SUBSIDIARY-OFFICE-Leisure-Community-Philippines-1024x576.png';

export default function AboutPage() {
  const navigate = useNavigate();

  const coreValues = [
    {
      icon: 'verified',
      title: 'Integrity',
      desc: 'We operate with honesty and transparency in all our dealings, ensuring that our clients can trust us with their important real estate decisions.'
    },
    {
      icon: 'person',
      title: 'Client-Focused',
      desc: 'We prioritize the needs and goals of our clients, providing personalized service and attentive support throughout their real estate journey.'
    },
    {
      icon: 'handshake',
      title: 'Reliability',
      desc: 'We are a dependable partner that our clients can count on for accurate information, timely responses, and professional advice.'
    },
    {
      icon: 'workspace_premium',
      title: 'Excellence',
      desc: 'We strive for the highest standards in everything we do, from the properties we offer to the quality of service we provide.'
    },
    {
      icon: 'business_center',
      title: 'Professionalism',
      desc: 'We conduct ourselves with the utmost professionalism, maintaining a high level of expertise and ethical conduct in all our interactions.'
    }
  ];

   const boardOfDirectors = [
    {
      image: ChairmanImage,
      name: 'Hernando B. signo',
      position: 'Chairman of the Board',
      desc: 'Our Chairman brings a distinguished background in the maritime industry, having risen to the rank of Second Officer and Dynamic Positioning Officer (DPO). Following his maritime career, he entered the real estate industry as an agent and subsequently advanced into investment, collaborating with prominent industry stakeholders. This experience enabled him to recognize the strong growth potential and strategic opportunities within the real estate sector.'
    },
    {
      image: PresidentImage,
      name: 'Atty. Adrian Carlo Uy Escay',
      position: 'President & CEO',
      desc: 'Our esteemed President, brings a distinguished multidisciplinary background and extensive professional experience to the organization. His career spans engineering, business, real estate, and legal practice, with particular expertise in civil and business law. A graduate of San Beda College of Law, he continues to provide strong leadership, strategic insight, and sound legal perspective to the company.'
    },
    {
      image: VicePresidentImage,
      name: 'Richard Mapusao, REB, REA',
      position: 'Vice President',
      desc: 'Our Vice President, Mr. Mapusao, is a licensed Real Estate Broker and Appraiser who brings extensive expertise and experience to the organization. Prior to his current role, he served as a mathematics professor at a prestigious institution in Tagaytay City for 20 years. His strong academic background and real estate credentials make him a valuable asset to our leadership team.'
    }
  ];

  const offices = [
    {
      image: HeadOfficeImage,
      name: 'Head Office',
      address: 'East West Breeze Leisure Farm Eastwest Road, Daine I, Indang, Cavite',
      contact: '+63 917 170 6920'
    },
    {
      image: SalesOfficeMVLCImage,
      name: 'Sales Office - Mountain View Leisure Community',
      address: 'Mountain View Leisure Community Munting lndang, Nasugbu, Batangas',
      contact: '+63 995 673 1952'
    },
    {
      image: SalesOfficeRTEImage,
      name: 'Sales Office - Royale Tagaytay Estates',
      address: 'Royale Tagaytay Estates Alfonso Rd., Alfonso, Cavite',
      contact: '+63 917 162 6920'
    },
    {
      image: SubsidiaryOfficeImage,
      name: 'Subsidiary Office',
      address: 'Leisure Community Philippines Fleruz Building, Jose Abad Santos, Dolores Intersection, San Fernando, Pampanga',
      contact: '+63 917 162 6920'
    },
  ];

  const companyEvents = [
    {
      image: HeadOfficeImage,
      title: 'Head Office Groundbreaking',
      date: 'March 2023'
    },
    {
      image: SalesOfficeMVLCImage,
      title: 'Mountain View Sales Office Launch',
      date: 'August 2023'
    },
    {
      image: SalesOfficeRTEImage,
      title: 'Royale Tagaytay Estates Site Tour',
      date: 'January 2024'
    },
    {
      image: SubsidiaryOfficeImage,
      title: 'Pampanga Subsidiary Opening',
      date: 'June 2024'
    }
  ];

  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const isLightboxOpen = selectedEventIndex !== null;

  const showPrevEvent = useCallback(() => {
    setSelectedEventIndex((current) =>
      current === null ? null : (current - 1 + companyEvents.length) % companyEvents.length
    );
  }, [companyEvents.length]);

  const showNextEvent = useCallback(() => {
    setSelectedEventIndex((current) =>
      current === null ? null : (current + 1) % companyEvents.length
    );
  }, [companyEvents.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedEventIndex(null);
      if (e.key === 'ArrowLeft') showPrevEvent();
      if (e.key === 'ArrowRight') showNextEvent();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, showPrevEvent, showNextEvent]);

  const reasonsToChoose = [
    "Personalized property recommendations.",
    "Clear and accurate information for informed decisions.",
    "Access to a diverse range of valuable property opportunities.",
    "Professional guidance through every step of the process.",
    "Reliable and transparent communication.",
    "Commitment to helping you find the right property.",
    "Support in achieving your long-term real estate goals."
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-lg antialiased flex flex-col">
      <Navbar onOpenModal={() => navigate('/contact')} />
      
      <main className="flex-grow">
      {/* About Us */}
        <section className="px-margin-page py-section-gap max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-stack-lg">
          <div className="w-full md:w-1/2 space-y-stack-md">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              About Us
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              VHermosa Bright Corp. is a real estate development established in 2022 devoted to building leisure farm communities that provide the best modern luxurious amenities in rural facilities for clients who wish to have a resort-like leisure farm lot away from the pollution, fast-paced lifestyle, and noise present in metropolitan areas.​
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              As much as we want to have the best leisure farm and resort communities, our company believes in sustainability, thus creating real estate developments synchronizing and adapting within nature.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-auto rounded-xl object-cover shadow-sm border border-outline-variant/30"
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
              alt="Bright Hermosa Realty Inc. office and team"
            />
          </div>
        </section>
        {/* Hero Section */}
        <section className="px-margin-page py-section-gap max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-stack-lg">
          <div className="w-full md:w-1/2 space-y-stack-md">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              Buy Smart. Sell Wise.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Bright Hermosa Realty Inc. is a real estate company committed to helping individuals, families, and investors make confident and informed property decisions.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              className="w-full h-auto rounded-xl object-cover shadow-sm border border-outline-variant/30" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmid-NnETpuc4Tbi-Wx2wk0M5C9qdF5m3YZ7w3JdmlZQ_WoNBRmy7HSYuOhSYEDT0_BYBhAgl08WelLOXZcBnxcVztSby8iYTvUKx6o-rRrV7YXaclaUIaJwpIhEjFZ-v7jqDNxUtf7LUY-8EQSxLHlyBF6RJ2LFWnC902WwgU-ROq2ZuMXc-vAbAUb5cC8hQ6tCb5inAcYlTRAPJHMWufF-pqup011L8LkPg5VYkBP0wWyfx5ghDAG8R1zuXRGts9_M3RQ8dqK9w" 
              alt="Lush green valley in the Philippines at sunrise" 
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-margin-page py-section-gap max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Mission Card */}
            <div className="bg-primary text-on-primary p-12 rounded-xl flex flex-col justify-center space-y-stack-md min-h-[300px]">
              <h2 className="font-headline-md text-headline-md">Mission</h2>
              <p className="font-body-lg text-body-lg opacity-90 leading-relaxed">
                To guide clients toward property opportunities with clarity, integrity, and attentive service - helping them make confident decisions and create lasting value.
              </p>
              <div className="pt-stack-md border-t border-on-primary/30 mt-auto">
                <span className="font-label-caps text-label-caps text-secondary-fixed">SERVICE / TRANSPARENCY / CONFIDENCE</span>
              </div>
            </div>
            
            {/* Vision Card */}
            <div className="bg-surface-container-low border border-outline-variant p-12 rounded-xl flex flex-col justify-center space-y-stack-md min-h-[300px]">
              <h2 className="font-headline-md text-headline-md text-primary">Vision</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                To become a trusted Philippine real estate brand known for beautiful places, responsible growth, and relationships that endure.
              </p>
              <div className="pt-stack-md border-t border-outline-variant mt-auto">
                <span className="font-label-caps text-label-caps text-primary">TRUST / GROWTH / OPPORTUNITY</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Narrative / Journey */}
        <section className="bg-surface-container py-section-gap">
          <div className="px-margin-page max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-stack-lg">
            <div className="w-full md:w-1/2 space-y-stack-md">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                Our Core Narrative
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                We understand that real estate is more than just a transaction—it is about finding a place to call home, securing your family’s future, or growing your investment portfolio.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Our team provides professional guidance through every step of the process, ensuring that our clients are well-informed and empowered to make the best possible choices.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Whether you are looking for a residential property, a productive farm lot, or a strategic commercial space, Bright Hermosa Realty Inc. is here to connect you with opportunities that align with your vision.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-primary/10 rounded-xl transform translate-x-4 translate-y-4"></div>
              <img 
                className="relative w-full h-auto rounded-xl object-cover border border-outline-variant z-10 shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpBFV3pb8_F9cqqCXeFgmHaUEJSLW2Kg4M9tm75eM_kYgwWkATnANDEACYQh5FAgttJUe0_3i_gEhHeo0wquHQDFUH6Xb2mH4IHwxkR8E33p9IFhLFclZPPzI0Q2l7ihdv0-6548kT2amowoniRfxf56fGImk67gO3iztDcxTxOnduiHt2YFRwhl5pkk07gijfQZBPRk73Vo_HjGYjNhZE987wPwoiB1TIGICOWPNJxOeWwec1_p77ICvveMkBTef8-DRIY8DWBNy5Tg" 
                alt="Atty. Adrian Escay, CEO of Bright Hermosa" 
              />
            </div>
          </div>
        </section>

        {/* Core Commitment */}
        <section className="bg-surface py-section-gap">
          <div className="px-margin-page max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-stack-lg">
            <div className="w-full md:w-1/2 space-y-stack-md">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                Our Core Commitment
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                We are committed to delivering a real estate experience built on trust, transparency, professionalism, and genuine customer care. From the initial inquiry and property presentation to site visits, documentation, and closing, our team works closely with every client to make the process as clear, organized, and convenient as possible.
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                We do not simply offer properties. We help our clients understand their options, recognize opportunities, and choose properties that support their present needs and long-term plans.
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <img 
                className="w-full h-auto rounded-xl object-cover shadow-sm border border-outline-variant/30" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgs0JPUzTZBGshuFqgdP5KE5gn-8YPTO9ahpkB__3DA014lZjM52neCPXogT4wAnBypRHCx9I7xy73Q8-CcVRfLkcWi-nJqLr6wu4z8moU_p0q6f_J2DMu-FofABvs3wbHsRzqEysrLVReeNzhE_HQlfSkwVLxiOwF_j_GQYBt1h89zMw7wU664XBsUTfoMB2Xv1QkxTRxrgS9KiI25mDDcOCiOmlmlhnFSR-7mSsVarknVfscvqrEJoORfWPucM-EGHV5arRufOk" 
                alt="Professional real estate agent shaking hands with client couple" 
              />
            </div>
          </div>
        </section>

         {/* Board of Directors */}
        <section className="bg-surface-container py-section-gap">
          <div className="px-margin-page max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-stack-lg space-y-stack-sm">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Board of Directors</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">The leadership team steering Bright Hermosa Realty Inc. toward its mission and vision.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {boardOfDirectors.map((member, index) => (
                <div
                  key={index}
                  className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative w-full h-80 overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,theme(colors.primary/18%),theme(colors.primary/6%)_60%,theme(colors.surface-container-low)_100%)]">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-6 bg-primary/25 rounded-full blur-md"></div>
                    <img
                      className="absolute inset-0 h-full w-full object-contain object-bottom px-4 pt-4"
                      src={member.image}
                      alt={`${member.name}, ${member.position}`}
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-subhead-lg text-subhead-lg text-primary">{member.name}</h3>
                    <p className="font-label-caps text-label-caps text-secondary uppercase tracking-wide">{member.position}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Offices */}
        <section className="px-margin-page py-section-gap max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-stack-lg space-y-stack-sm">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Our Offices</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Visit us in person - our doors are always open to guide you through your next property move.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {offices.map((office, index) => (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto">
                  <img
                    className="w-full h-full object-cover"
                    src={office.image}
                    alt={`${office.name} building`}
                  />
                </div>

                {/* Perforated ticket-style divider */}
                <div className="hidden sm:flex flex-col items-center justify-between py-4">
                  <span className="w-3 h-3 rounded-full bg-surface-container-low -ml-1.5 border border-outline-variant"></span>
                  <span className="flex-1 border-l border-dashed border-outline-variant my-1"></span>
                  <span className="w-3 h-3 rounded-full bg-surface-container-low -ml-1.5 border border-outline-variant"></span>
                </div>

                <div className="flex-1 p-6 space-y-3">
                  <h3 className="font-subhead-lg font-bold text-lg text-primary">{office.name}</h3>
                  <div className="flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0">location_on</span>
                    <p className="font-body-sm text-body-sm text-sm leading-relaxed">{office.address}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0">call</span>
                    <a className="font-body-sm text-body-sm text-sm hover:text-primary transition-colors" href={`tel:${office.contact.replace(/\s+/g, '')}`}>
                      {office.contact}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Company Events */}
        <section className="bg-surface-container-low py-section-gap">
          <div className="px-margin-page max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-stack-lg space-y-stack-sm">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Company Events</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Moments from our milestones, launches, and community engagements. Click a photo to view it in full.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
              {companyEvents.map((event, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedEventIndex(index)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={event.image}
                    alt={event.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <p className="font-subhead-sm text-subhead-sm text-white leading-tight">{event.title}</p>
                    <p className="font-body-sm text-body-sm text-white/80">{event.date}</p>
                  </div>
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-symbols-outlined text-white text-lg">zoom_in</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-margin-page py-section-gap max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-stack-lg space-y-stack-sm">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Core Values</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">The principles that guide our every interaction and development.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className="bg-surface border border-outline-variant rounded-xl p-8 hover:border-primary transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-stack-md group-hover:bg-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors duration-300">
                    {value.icon}
                  </span>
                </div>
                <h3 className="font-subhead-lg text-subhead-lg text-primary mb-2">{value.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-surface-container-low py-section-gap">
          <div className="px-margin-page max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-stack-lg items-start">
              <div className="w-full md:w-1/3">
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                  Why Choose Us?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-4">
                  Discover the Bright Hermosa difference in every property journey.
                </p>
              </div>
              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-gutter">
                {reasonsToChoose.map((reason, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                    <p className="font-body-md text-on-surface leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Commitment */}
        <section className="py-section-gap px-margin-page max-w-7xl mx-auto">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
            <div className="absolute inset-0 bg-deep-emerald/80 z-10"></div>
            <img 
              className="absolute inset-0 w-full h-full object-cover z-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAud62F428PKFUZ45vS_sQ2i42V6n6OY7F2QHGdfrzwTANr-lmTsV-i00U91SvPTZksjQBKkQQDk4OupdZIjaaCfDXeff0tMhB0vXcp__Q_RGqZMZ_97MC27RWJaHRoqz0WlUIX8kvFvfRygXbv5yCgA0o3PmzW9B2EGdYIsHstrpE_uVH6x3IgUs9JKz9uv-VND8eWIMuAAsaYT7EmMWxEQqX4fSiAZudE5ZFjoOwMGO4PlFpWD-NMYksp33cFJaIirxu1vHO5ilg" 
              alt="Sustainable luxury farm estate aerial view" 
            />
            <div className="relative z-20 py-16 px-8 md:px-16 flex flex-col items-center text-center max-w-3xl space-y-stack-md text-on-primary">
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
                Commitment to Sustainability
              </h2>
              <p className="font-body-lg text-body-lg text-tertiary-fixed-dim opacity-95">
                At Bright Hermosa, we are stewards of the land. Our mission is to harness the inherent beauty of the environment, creating sustainable developments that seamlessly integrate with and enhance the natural world.
              </p>
              <p className="font-body-lg text-body-lg text-tertiary-fixed-dim opacity-95">
                We are driven by a commitment to responsible land development, ensuring the preservation of the earth's intrinsic allure. Through innovative design, eco-conscious construction, and sustainable practices, we aspire to redefine high-end living.
              </p>
            </div>
          </div>
        </section>
      </main>
       
       {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedEventIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedEventIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showPrevEvent(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div
            className="max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              src={companyEvents[selectedEventIndex].image}
              alt={companyEvents[selectedEventIndex].title}
            />
            <div className="text-center">
              <p className="font-subhead-lg text-subhead-lg text-white">{companyEvents[selectedEventIndex].title}</p>
              <p className="font-body-sm text-body-sm text-white/70">{companyEvents[selectedEventIndex].date} &middot; {selectedEventIndex + 1} / {companyEvents.length}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNextEvent(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
