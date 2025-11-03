import React from 'react';
import AnimatedPage from '../components/AnimatedPage';

const AboutPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 md:px-16 max-w-3xl text-center flex flex-col items-center justify-center min-h-[calc(100vh-256px)]">
        <h1 className="text-3xl md:text-4xl font-mono">AURADHOM</h1>
        <p className="text-lg md:text-xl font-light mt-16">Ne dis rien. Sois.</p>
        <div className="mt-64 space-y-16 text-base md:text-lg font-light leading-relaxed">
          <p>Nous croyons au pouvoir de ceux qui n’ont pas besoin de hausser le ton.</p>
          <p>Ici, l’élégance est une force. Le minimalisme, une affirmation.</p>
          <p>Le succès appartient à ceux qui n’ont rien à prouver. Seulement à être.</p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutPage;
