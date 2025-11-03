export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: {
    main: string;
    gallery: string[];
  };
  category: 'T-shirt' | 'Hoodie' | 'Pantalon' | 'Surchemise' | 'Casquette';
  material: 'Coton lourd' | 'Laine' | 'Cuir végétal';
  availableColors: ('Noir' | 'Blanc cassé' | 'Gris anthracite' | 'Beige sable')[];
  availableSizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[];
  stock: number;
}

export interface CartItem {
  id: string; // Composite ID: `${product.id}-${size}-${color}`
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
