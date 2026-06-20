import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg px-margin-page py-section-gap w-full max-w-7xl mx-auto text-on-primary">
        <div className="col-span-1 md:col-span-1">
          <div className="font-headline-md text-headline-md font-bold text-on-primary mb-4 flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEHmhNMY_h7D0F-gwlQxBMRvHYk8ugtsyLcdO0MfwJmJG1pKNUw3gBYhK6Smd9N9JdDgACo1CStPC6kMauCOLBP8LzbHAIUDvXW4jQ4QBjz-L5xO4dIG_RjrTnUNAImMjY6CSSLrHPp5IL2KeiwntThNc-8Cd4nvGEjkAvfq55HvXWQOGSnz-34dAlmVGoCea7OV4nxKUcw4-PE3-XIDsstMm53T5fY73GkTMvsAsP7bZ8tAGF94rJrMEoGF-3Pjoqwqy3gMNCNcw" 
              alt="Bright Hermosa Logo" 
              className="h-12 w-auto object-contain bg-transparent brightness-0 invert"
            />
          </div>
          <p className="font-body-md text-on-primary-container mb-4">
            VHermosa Bright Corp. Brgy. Daine 1, Indang Cavite, Philippines 4122
          </p>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-subhead-lg text-subhead-lg mb-4 text-secondary-fixed">Navigation</h4>
          <ul className="space-y-2">
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/">Home</Link></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/about">About Us</Link></li>
            <li><a className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" href="/#properties">Properties</a></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/blog">Blog</Link></li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-subhead-lg text-subhead-lg mb-4 text-secondary-fixed">Support</h4>
          <ul className="space-y-2">
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/faq">FAQ</Link></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/careers">Careers</Link></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-subhead-lg text-subhead-lg mb-4 text-secondary-fixed">Legal</h4>
          <ul className="space-y-2">
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/terms">Terms of Service</Link></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/cookies">Cookie Policy</Link></li>
            <li><Link className="font-body-md text-on-primary-container hover:text-secondary-fixed transition-colors duration-200" to="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-primary-container/30 px-margin-page py-6 text-center">
        <p className="font-body-md text-on-primary-container">
          © 2026 Bright Hermosa Realty Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
