import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer className="py-32 text-center text-anthracite border-t border-anthracite/20">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex justify-center mb-24">
          <SocialLinks />
        </div>
        <p className="font-mono text-sm">AURADHOM © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
