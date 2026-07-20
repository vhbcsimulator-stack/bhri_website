import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;



  const linkClass = (path) =>
    `relative font-subhead-lg text-subhead-lg pb-1 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:ease-out ${
      isActive(path)
        ? 'text-primary after:w-full'
        : 'text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full'
    }`;

  const mobileLinkClass = (path) => 
    `font-subhead-lg text-subhead-lg py-2 border-b border-outline-variant/30 transition-colors ${
      isActive(path) ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-outline-variant">
      <div className="flex justify-between items-center w-full px-margin-page py-4 max-w-7xl mx-auto">
        <Link className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2" to="/">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTojLhFLUZDV1OSo4DJrSjAE4z5BcbscWu3FCQNoIXOQXtB5wRmDF_RZGAGWkFK8TdbYs6dwute_Sb-wOqI9_wihyICja8m-lIC-Hh06kSBWxE9G0_oxbmOCn07VH6TyyYtlM1pXbPgpbziJLGoIfbgyw2wsrrd9DAvUTVvCkU9MCdOzLAtFFpismYXRHUEkO8Y9pvMk_WMgRdNbP9R6nXqw3VNsmR-Qy-0iRVxLL4DTTsZT9re8dSkB1vxWNqRiVS63oOw-ZWo-s" 
            alt="Bright Hermosa Logo" 
            className="h-12 w-auto object-contain bg-transparent"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-gutter">
          <Link className={linkClass('/')} to="/">Home</Link>
          <Link className={linkClass('/properties')} to="/properties">Properties</Link>
          <Link className={linkClass('/about')} to="/about">About Us</Link>
          <Link className={linkClass('/contact')} to="/contact">Contact Us</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenModal && onOpenModal()}
            className="hidden md:block bg-primary text-on-primary px-6 py-3 rounded-lg font-subhead-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer"
          >
            Message Us
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant px-margin-page py-4 flex flex-col gap-4 animate-fadeIn">
          <Link 
            className={mobileLinkClass('/')} 
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            className={mobileLinkClass('/properties')} 
            to="/properties"
            onClick={() => setMobileMenuOpen(false)}
          >
            Properties
          </Link>
          <Link
            className={mobileLinkClass('/about')}
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            className={mobileLinkClass('/contact')}
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
          
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenModal && onOpenModal();
            }}
            className="bg-primary text-on-primary w-full py-3 rounded-lg font-subhead-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm mt-2"
          >
            Message Us
          </button>
        </div>
      )}
    </nav>
  );
}
