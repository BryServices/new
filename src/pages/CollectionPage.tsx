import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { products } from '../data/products';
import { Product } from '../types';
import { formatFCFA } from '../utils/formatters';
import { ChevronDown } from 'lucide-react';

const CollectionPage: React.FC = () => {
  // Filters are for UI demonstration; filtering logic is not implemented in this MVP.
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  }

  const filters = [
    { id: 'silhouette', name: 'Silhouette', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
    { id: 'type', name: 'Type', options: ['T-shirt', 'Hoodie', 'Pantalon', 'Surchemise', 'Casquette'] },
    { id: 'matiere', name: 'Matière', options: ['Coton lourd', 'Laine', 'Cuir végétal'] },
    { id: 'teinte', name: 'Teinte', options: ['Noir', 'Blanc cassé', 'Gris anthracite', 'Beige sable'] },
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row gap-32 md:gap-64">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-1/4">
            <h2 className="text-xl font-mono mb-32">Filtres</h2>
            <div className="space-y-32">
              {filters.map(filter => (
                <div key={filter.id}>
                  <h3 className="uppercase text-sm tracking-widest mb-16">{filter.name}</h3>
                  <ul className="space-y-8 font-light text-primary">
                    {filter.options.map(option => <li key={option}>{option}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="md:hidden">
             {filters.map(filter => (
                <div key={filter.id} className="border-b border-anthracite">
                  <button onClick={() => toggleAccordion(filter.id)} className="w-full flex justify-between items-center py-16">
                    <span className="uppercase text-sm tracking-widest">{filter.name}</span>
                    <ChevronDown className={`transform transition-transform duration-300 ${openAccordion === filter.id ? 'rotate-180' : ''}`} size={16} />
                  </button>
                  {openAccordion === filter.id && (
                     <div className="pb-16 px-8">
                       <ul className="space-y-8 font-light text-primary">
                         {filter.options.map(option => <li key={option}>{option}</li>)}
                       </ul>
                     </div>
                  )}
                </div>
             ))}
          </div>

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {products.map((product: Product) => (
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
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CollectionPage;
