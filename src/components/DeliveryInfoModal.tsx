import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { departments, citiesByDepartment, quartiersByCity } from '../data/locations';
import { formatFCFA } from '../utils/formatters';

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  address: string;
  quartier: string;
  department: string;
  city: string;
  phone: string;
}

interface DeliveryInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    deliveryInfo: DeliveryInfo;
    deliveryMethod: 'delivery' | 'pickup';
    deliveryFee: number;
    finalTotal: number;
  }) => void;
  subtotal: number;
}

const DeliveryInfoModal: React.FC<DeliveryInfoModalProps> = ({ isOpen, onClose, onSubmit, subtotal }) => {
  const [formData, setFormData] = useState<DeliveryInfo>({
    firstName: '',
    lastName: '',
    address: '',
    quartier: '',
    department: '',
    city: '',
    phone: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [finalTotal, setFinalTotal] = useState(subtotal);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableQuartiers, setAvailableQuartiers] = useState<string[]>([]);
  const [isManualQuartier, setIsManualQuartier] = useState(false);

  // Location-based useEffects
  useEffect(() => {
    if (formData.department) {
      setAvailableCities(citiesByDepartment[formData.department] || []);
    } else {
      setAvailableCities([]);
    }
    setFormData(prev => ({ ...prev, city: '', quartier: '' }));
    setAvailableQuartiers([]);
    setIsManualQuartier(false);
  }, [formData.department]);

  useEffect(() => {
    const quartiers = quartiersByCity[formData.city] || [];
    setAvailableQuartiers(quartiers);
    setIsManualQuartier(quartiers.length === 0 && !!formData.city);
    setFormData(prev => ({ ...prev, quartier: '' }));
  }, [formData.city]);

  // Pricing useEffects
  useEffect(() => {
    let fee = 0;
    if (deliveryMethod === 'delivery') {
      if (subtotal >= 100000) {
        fee = 0;
      } else if (formData.department === 'Brazzaville' || formData.department === 'Pointe-Noire') {
        fee = 2500;
      } else if (formData.department) {
        fee = 5000;
      }
    }
    setDeliveryFee(fee);
  }, [formData.department, subtotal, deliveryMethod]);

  useEffect(() => {
    setFinalTotal(subtotal + deliveryFee);
  }, [subtotal, deliveryFee]);

  const handleQuartierSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'Autre') {
      setIsManualQuartier(true);
      setFormData(prev => ({ ...prev, quartier: '' }));
    } else {
      setIsManualQuartier(false);
      setFormData(prev => ({ ...prev, quartier: value }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      deliveryInfo: formData,
      deliveryMethod,
      deliveryFee,
      finalTotal,
    });
  };
  
  const isDelivery = deliveryMethod === 'delivery';
  const inputClasses = "w-full bg-transparent border border-anthracite px-12 py-8 text-primary placeholder-anthracite font-light focus:border-primary focus:outline-none text-sm";
  const selectClasses = `${inputClasses} appearance-none`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background w-full max-w-lg p-16 sm:p-24 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-16 right-16 text-primary"><X size={24} /></button>
            <h2 className="text-xl font-mono text-center mb-24">Finaliser la commande</h2>
            
            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="space-y-8">
                <label className="uppercase text-sm tracking-widest">Mode de livraison</label>
                <div className="flex flex-col sm:flex-row gap-8">
                  <label className="flex items-center gap-8 px-12 py-8 border border-anthracite flex-1 cursor-pointer hover:border-primary"
                    onClick={() => setDeliveryMethod('delivery')}>
                    <input type="radio" name="deliveryMethod" value="delivery" checked={isDelivery} readOnly className="accent-primary"/>
                    <span className="text-sm">🚚 Livraison à domicile</span>
                  </label>
                  <label className="flex items-center gap-8 px-12 py-8 border border-anthracite flex-1 cursor-pointer hover:border-primary"
                    onClick={() => setDeliveryMethod('pickup')}>
                    <input type="radio" name="deliveryMethod" value="pickup" checked={!isDelivery} readOnly className="accent-primary"/>
                    <span className="text-sm">🚶 Retrait en boutique</span>
                  </label>
                </div>
              </div>

              {isDelivery ? (
                <div className="space-y-16 pt-16">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                    <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required={isDelivery} className={inputClasses} />
                    <input type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required={isDelivery} className={inputClasses} />
                  </div>
                  <input type="text" name="address" placeholder="Adresse complète" value={formData.address} onChange={handleChange} required={isDelivery} className={inputClasses} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                    <div className="relative">
                      <select name="department" value={formData.department} onChange={handleChange} required={isDelivery} className={selectClasses}>
                        <option value="" disabled>Département</option>
                        {departments.map(dep => <option key={dep} value={dep} className="bg-background text-primary">{dep}</option>)}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 text-primary" />
                    </div>
                    <div className="relative">
                      <select name="city" value={formData.city} onChange={handleChange} required={isDelivery} disabled={!formData.department} className={`${selectClasses} disabled:opacity-50 disabled:cursor-not-allowed`}>
                        <option value="" disabled>Ville</option>
                        {availableCities.map(city => <option key={city} value={city} className="bg-background text-primary">{city}</option>)}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 text-primary" />
                    </div>
                  </div>
                  
                  {availableQuartiers.length > 0 && (
                    <div className="relative">
                      <select value={isManualQuartier ? 'Autre' : formData.quartier} onChange={handleQuartierSelectChange} required={isDelivery && !isManualQuartier} className={selectClasses}>
                        <option value="" disabled>Quartier</option>
                        {availableQuartiers.map(q => <option key={q} value={q} className="bg-background text-primary">{q}</option>)}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-12 -translate-y-1/2 text-primary" />
                    </div>
                  )}

                  {isManualQuartier && (
                    <input type="text" name="quartier" placeholder="Saisir votre quartier" value={formData.quartier} onChange={handleChange} required className={inputClasses} />
                  )}

                  <input type="tel" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} required={isDelivery} className={inputClasses} />
                </div>
              ) : (
                <div className="p-16 text-center border border-dashed border-anthracite mt-16">
                  <p className="text-sand text-sm">Vous pourrez récupérer votre commande en boutique dès qu’elle sera prête.</p>
                </div>
              )}

              <div className="border-t border-anthracite pt-16 space-y-8">
                <div className="flex justify-between text-sand"><p>Sous-total</p> <p>{formatFCFA(subtotal)}</p></div>
                <div className="flex justify-between text-sand"><p>Livraison</p> <p>{formatFCFA(deliveryFee)}</p></div>
                <div className="flex justify-between text-primary text-lg font-bold"><p>Total</p> <p>{formatFCFA(finalTotal)}</p></div>
              </div>

              <button type="submit" className="w-full bg-primary text-black text-center py-16 text-sm font-bold uppercase tracking-widest mt-16 hover:bg-sand transition-colors">
                Valider et commander
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeliveryInfoModal;
