import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { products } from '../data/products';
import { formatFCFA } from '../utils/formatters';
import SocialLinks from '../components/SocialLinks';

const HomePage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-128px)] flex flex-col items-center justify-center text-center relative px-4 md:px-16">
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale" 
          style={{ backgroundImage: "url('https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1920x1080/000000/FFFFFF.png?text=')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-mono tracking-widest">AURADHOM</h1>
          <p className="mt-16 text-lg md:text-xl font-light text-primary">Ne dis rien. Sois.</p>
          <Link 
            to="/collection" 
            className="mt-32 md:mt-48 inline-block border border-primary text-primary px-24 py-8 text-sm font-light uppercase tracking-widest"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-16 py-64 md:py-96">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {products.slice(0, 2).map((product) => (
            <Link to={`/produit/${product.slug}`} key={product.id} className="group">
              <div className="aspect-square bg-background flex items-center justify-center filter grayscale">
                <img src={product.images.main} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-16 text-center">
                <h3 className="text-lg font-mono">{product.name}</h3>
                <p className="text-sand mt-8">{formatFCFA(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-16 pb-64 md:pb-96 text-center">
        <h2 className="text-2xl md:text-3xl font-mono">SUIVEZ-NOUS</h2>
        <p className="mt-16 text-lg text-sand">Notre univers, votre aura. En silence.</p>
        <div className="mt-32 flex justify-center">
           <SocialLinks />
        </div>
      </div>

    </AnimatedPage>
  );
};

export default HomePage;
