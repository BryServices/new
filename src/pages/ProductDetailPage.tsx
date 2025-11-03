import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { formatFCFA } from '../utils/formatters';
import AnimatedPage from '../components/AnimatedPage';
import { ChevronDown, X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  if (!product) {
    return <AnimatedPage><div className="text-center py-96">Produit non trouvé.</div></AnimatedPage>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setFeedbackMessage('Veuillez sélectionner une taille.');
      setTimeout(() => setFeedbackMessage(''), 2000);
      return;
    }
    if (!selectedColor) {
      setFeedbackMessage('Veuillez sélectionner une couleur.');
      setTimeout(() => setFeedbackMessage(''), 2000);
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    setFeedbackMessage('Ajouté au panier');
    setTimeout(() => setFeedbackMessage(''), 2000);
  };
  
  const colorMap: { [key: string]: string } = {
    'Noir': 'bg-black',
    'Blanc cassé': 'bg-white',
    'Gris anthracite': 'bg-anthracite',
    'Beige sable': 'bg-sand',
  };

  const techInfo = [
      { title: 'Composition', content: product.material },
      { title: 'Entretien', content: 'Lavage à froid. Séchage à plat.' },
      { title: 'Provenance', content: 'Portugal' },
  ];
  if (product.stock < 20) {
      techInfo.push({ title: 'Stock', content: `${product.stock} pièces restantes` });
  }

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div className="filter grayscale">
            <img src={product.images.main} alt={product.name} className="w-full h-auto object-cover" />
            <div className="grid grid-cols-2 gap-8 mt-8">
              {product.images.gallery.map((img, index) => (
                <img key={index} src={img} alt={`Gallery image ${index + 1}`} className="cursor-pointer" onClick={() => setModalImage(img)} />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-mono">{product.name}</h1>
            <p className="text-2xl md:text-3xl font-bold mt-16">{formatFCFA(product.price)}</p>
            <p className="mt-32 font-light text-lg">{product.description}</p>
            
            <div className="mt-48">
              <h3 className="uppercase text-sm tracking-widest mb-16">Taille</h3>
              <div className="flex flex-wrap gap-8">
                {product.availableSizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`w-40 h-40 rounded-full border flex items-center justify-center text-sm transition-colors ${selectedSize === size ? 'bg-primary text-black border-primary' : 'border-anthracite text-primary hover:border-primary'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-32">
              <h3 className="uppercase text-sm tracking-widest mb-16">Couleur</h3>
              <div className="flex flex-wrap gap-8">
                {product.availableColors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`w-32 h-32 p-4 border transition-colors ${selectedColor === color ? 'border-primary' : 'border-anthracite hover:border-primary'}`}>
                    <div className={`w-full h-full ${colorMap[color]}`}></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-32">
              <h3 className="uppercase text-sm tracking-widest mb-16">Quantité</h3>
              <div className="flex items-center border border-anthracite w-fit">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-8 text-primary hover:bg-anthracite transition-colors">
                  <Minus size={16} />
                </button>
                <span className="px-16 text-center w-48 font-mono">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-8 text-primary hover:bg-anthracite transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="mt-48 w-full border border-primary text-center py-16 text-sm font-light uppercase tracking-widest transition-colors duration-300 hover:bg-primary hover:text-black">
              {feedbackMessage || 'Ajouter au panier'}
            </button>

            <div className="mt-48 border-t border-anthracite">
              {techInfo.map(item => (
                <div key={item.title} className="border-b border-anthracite">
                  <button onClick={() => setOpenAccordion(openAccordion === item.title ? null : item.title)} className="w-full flex justify-between items-center py-16">
                    <span className="uppercase text-sm tracking-widest">{item.title}</span>
                    <ChevronDown className={`transform transition-transform duration-300 ${openAccordion === item.title ? 'rotate-180' : ''}`} size={16} />
                  </button>
                  {openAccordion === item.title && (
                     <div className="pb-16 font-light text-primary">
                       {item.content}
                     </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setModalImage(null)}>
          <button className="absolute top-16 right-4 text-white" onClick={() => setModalImage(null)}><X size={32} /></button>
          <img src={modalImage} alt="Enlarged view" className="max-w-full max-h-full filter grayscale" />
        </div>
      )}
    </AnimatedPage>
  );
};

export default ProductDetailPage;
