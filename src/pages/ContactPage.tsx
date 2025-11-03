import React from 'react';
import AnimatedPage from '../components/AnimatedPage';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an email sending service.
    // For now, we can just log it.
    console.log("Form submitted. In a real app, this would send an email.");
    alert("Message envoyé. Nous répondons en silence.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 md:px-16 max-w-xl text-center flex flex-col items-center justify-center min-h-[calc(100vh-256px)]">
        <h1 className="text-xl md:text-2xl font-mono">Une question ?</h1>
        <p className="text-base md:text-lg font-light mt-8">Écris-nous. Nous répondons en silence.</p>
        <form onSubmit={handleSubmit} className="w-full mt-48 space-y-16">
          <input 
            type="email" 
            placeholder="[champ email]" 
            required 
            className="w-full bg-transparent border border-anthracite p-16 text-primary placeholder-anthracite font-light focus:border-primary focus:outline-none"
          />
          <textarea 
            placeholder="[champ message]" 
            required 
            rows={5}
            className="w-full bg-transparent border border-anthracite p-16 text-primary placeholder-anthracite font-light focus:border-primary focus:outline-none"
          />
          <button type="submit" className="w-full border border-primary text-primary text-center py-16 text-sm font-light uppercase tracking-widest">
            [envoyer]
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default ContactPage;
