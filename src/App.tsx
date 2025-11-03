import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { CartProvider } from './context/CartContext';

const AppLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/collection', element: <CollectionPage /> },
      { path: '/produit/:slug', element: <ProductDetailPage /> },
      { path: '/envoye', element: <ConfirmationPage /> },
      { path: '/a-propos', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
