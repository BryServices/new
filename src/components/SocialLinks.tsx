import React from 'react';
import { Facebook, Instagram, Youtube, Tiktok } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/auradhom', icon: <Facebook size={20} /> },
  { name: 'Instagram', url: 'https://instagram.com/auradhom', icon: <Instagram size={20} /> },
  { name: 'TikTok', url: 'https://tiktok.com/auradhom', icon: <Tiktok size={20} /> },
  { name: 'YouTube', url: 'https://youtube.com/auradhom', icon: <Youtube size={20} /> },
];

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-16 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="text-primary hover:text-sand transition-all duration-300 transform hover:scale-110"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
