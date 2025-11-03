import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-grow pt-56 md:pt-64">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
