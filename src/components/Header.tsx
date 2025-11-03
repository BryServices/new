import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

const Header: React.FC = () => {
  const activeStyle = {
    textDecoration: 'underline',
    textUnderlineOffset: '4px'
  };
  const { toggleCart, getCartItemCount } = useCart();
  const itemCount = getCartItemCount();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const MobileMenu = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
    >
      <button onClick={toggleMobileMenu} className="absolute top-16 right-4 text-primary">
        <X size={28} />
      </button>
      <nav className="flex flex-col items-center space-y-32 text-xl uppercase font-light">
        <NavLink to="/collection" onClick={toggleMobileMenu} style={({ isActive }) => isActive ? activeStyle : undefined}>
          Collection
        </NavLink>
        <NavLink to="/a-propos" onClick={toggleMobileMenu} style={({ isActive }) => isActive ? activeStyle : undefined}>
          Philosophie
        </NavLink>
        <NavLink to="/contact" onClick={toggleMobileMenu} style={({ isActive }) => isActive ? activeStyle : undefined}>
          Contact
        </NavLink>
      </nav>
      <div className="mt-64">
        <SocialLinks />
      </div>
    </motion.div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-16 py-12 md:py-16 flex justify-between items-center">
          <div className="flex-1 flex justify-start md:hidden">
            <button onClick={toggleMobileMenu} className="text-primary">
              <Menu size={24} />
            </button>
          </div>

          <div className="flex-1 flex justify-center md:justify-start">
            <Link to="/" className="text-lg md:text-xl font-bold font-mono tracking-widest">
              AURADHOM
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center items-center space-x-32 text-sm uppercase font-light">
            <NavLink to="/collection" style={({ isActive }) => isActive ? activeStyle : undefined}>
              Collection
            </NavLink>
            <NavLink to="/a-propos" style={({ isActive }) => isActive ? activeStyle : undefined}>
              Philosophie
            </NavLink>
            <NavLink to="/contact" style={({ isActive }) => isActive ? activeStyle : undefined}>
              Contact
            </NavLink>
          </div>

          <div className="flex-1 flex justify-end items-center gap-24">
            <div className="hidden md:flex">
              <SocialLinks />
            </div>
            <button onClick={toggleCart} className="relative text-primary">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-8 -right-8 bg-primary text-black text-xs font-bold rounded-full h-16 w-16 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu />}
      </AnimatePresence>
    </>
  );
};

export default Header;
