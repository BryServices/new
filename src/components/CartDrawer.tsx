import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Trash2, Minus, Plus } from 'lucide-react';
import { formatFCFA } from '../utils/formatters';
import { Link, useNavigate } from 'react-router-dom';
import DeliveryInfoModal from './DeliveryInfoModal';
import { generateOrderId } from '../utils/order';

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  address: string;
  quartier: string;
  department: string;
  city: string;
  phone: string;
}

interface OrderConfirmationData {
  deliveryInfo: DeliveryInfo;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryFee: number;
  finalTotal: number;
}

const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);

  const handleConfirmOrder = (data: OrderConfirmationData) => {
    const { deliveryInfo, deliveryMethod, deliveryFee, finalTotal } = data;
    const WHATSAPP_NUMBER = "242066060029";
    const orderId = generateOrderId();
    
    const itemsText = cartItems.map(item => {
      return `Article : ${item.product.name}
Taille : ${item.selectedSize}
Couleur : ${item.selectedColor}
Quantité : ${item.quantity}
Prix unitaire : ${formatFCFA(item.product.price)}`;
    }).join('\n\n');

    const priceSummaryText = `Récapitulatif du prix :
Sous-total : ${formatFCFA(getCartTotal())}
Frais de livraison : ${formatFCFA(deliveryFee)}
Total : ${formatFCFA(finalTotal)}`;

    let deliverySectionText = '';
    if (deliveryMethod === 'pickup') {
      deliverySectionText = `*Mode de livraison*
Retrait en boutique
ID Commande : ${orderId}`;
    } else {
      deliverySectionText = `*Informations pour la livraison*
ID Commande : ${orderId}
Nom : ${deliveryInfo.lastName}
Prénom : ${deliveryInfo.firstName}
Adresse complète : ${deliveryInfo.address}
Département : ${deliveryInfo.department}
Ville : ${deliveryInfo.city}
Quartier : ${deliveryInfo.quartier}
Téléphone : ${deliveryInfo.phone}`;
    }

    const message = `Bonjour AuraDhom,

Je confirme ma commande :

${itemsText}

---

${priceSummaryText}

---

${deliverySectionText.trim()}

Bienvenue dans la famille, et merci pour votre commande.
Ne dis rien. Sois. AURADHOM`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message.trim())}`;
    
    window.open(url, '_blank');
    
    clearCart();
    setDeliveryModalOpen(false);
    toggleCart();
    navigate('/envoye');
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={toggleCart}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-full sm:max-w-md h-full bg-background text-primary shadow-2xl z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-16 sm:p-24 border-b border-anthracite">
                <h2 className="text-xl font-mono">Panier</h2>
                <button onClick={toggleCart} className="text-primary"><X size={24} /></button>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-16 sm:p-24">
                  <p className="text-sand">Votre panier est vide.</p>
                  <Link to="/collection" onClick={toggleCart} className="mt-32 inline-block border border-primary text-primary px-24 py-8 text-sm font-light uppercase tracking-widest hover:bg-anthracite">
                    Découvrir la collection
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto p-16 sm:p-24 space-y-24">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-16">
                        <img src={item.product.images.main} alt={item.product.name} className="w-80 h-96 object-cover filter grayscale" />
                        <div className="flex-grow flex flex-col">
                          <div className="flex justify-between">
                              <div>
                                  <h3 className="font-mono text-base">{item.product.name}</h3>
                                  <p className="text-sm text-sand">{item.selectedSize} / {item.selectedColor}</p>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="text-sand hover:text-primary"><Trash2 size={16} /></button>
                          </div>
                          <div className="flex justify-between items-center mt-auto pt-8">
                            <div className="flex items-center border border-anthracite w-fit">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-4 text-primary hover:bg-anthracite"><Minus size={14} /></button>
                              <span className="px-8 text-center w-32 font-mono text-sm">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-4 text-primary hover:bg-anthracite"><Plus size={14} /></button>
                            </div>
                            <p className="text-base text-primary font-mono">{formatFCFA(item.product.price * item.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-16 sm:p-24 border-t border-anthracite space-y-16">
                    <div className="flex justify-between font-light text-lg">
                      <span>Total</span>
                      <span className="font-mono">{formatFCFA(getCartTotal())}</span>
                    </div>
                    <p className="text-xs text-sand">Taxes et frais de livraison calculés à la validation.</p>
                    <button onClick={() => setDeliveryModalOpen(true)} className="w-full bg-primary text-black text-center py-16 text-sm font-bold uppercase tracking-widest mt-8 hover:bg-sand transition-colors">
                      Commander via WhatsApp
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <DeliveryInfoModal 
        isOpen={isDeliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        onSubmit={handleConfirmOrder}
        subtotal={getCartTotal()}
      />
    </>
  );
};

export default CartDrawer;
