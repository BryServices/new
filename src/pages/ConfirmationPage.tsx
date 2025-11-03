import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const ConfirmationPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="min-h-[calc(100vh-256px)] flex flex-col items-center justify-center text-center px-16">
        <p className="text-lg font-light">Message envoyé.</p>
        <p className="text-lg font-light mt-8">Tu as commandé en silence.</p>
        <p className="text-lg font-light mt-32">Nous te répondons sous 24h.</p>
        <h2 className="text-2xl font-mono mt-48">Ne dis rien. Sois.</h2>
        <Link to="/collection" className="mt-48 inline-block border border-primary text-primary px-24 py-8 text-sm font-light uppercase tracking-widest">
          Retour à la collection
        </Link>
      </div>
    </AnimatedPage>
  );
};

export default ConfirmationPage;
