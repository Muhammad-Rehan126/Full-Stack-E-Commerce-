import React, { useCallback, useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import ShopCategoryPage from './components/ShopCategoryPage';
import CartPage from './components/CartPage';
// Agar aapke paas yeh files hain toh uncomment kar dein, warna aise hi rehne dein
// import ProductCatalogManager from './components/ProductCatalogManager';
// import CartProvider from './components/CartProvider';
// import { ProductSearchProvider } from './ProductSearchContext';

const pagePaths = {
  home: '/',
  product: '/product',
  shop: '/shop',
  cart: '/cart',
  catalog: '/admin'
};

const pageTitles = {
  home: 'Home',
  product: 'Product Details',
  shop: 'Shop',
  cart: 'Cart',
  catalog: 'Admin'
};

const pathPages = {
  '/': 'home',
  '/home': 'home',
  '/home page': 'home',
  '/product': 'product',
  '/productpage': 'product',
  '/product details page': 'product',
  '/shop': 'shop',
  '/shopcategorypage': 'shop',
  '/shopcategory page': 'shop',
  '/cart': 'cart',
  '/cart page': 'cart',
  '/admin': 'catalog'
};

const pageFromPath = (pathname) => {
  const decodedPath = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  return pathPages[decodedPath.toLowerCase()] || 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const expectedPath = pagePaths[currentPage];
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ page: currentPage }, '', expectedPath);
    }
    document.title = `${pageTitles[currentPage]} | SHOP.CO`;
  }, [currentPage]);

  useEffect(() => {
    const syncPageFromUrl = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', syncPageFromUrl);
    return () => window.removeEventListener('popstate', syncPageFromUrl);
  }, []);

  const navigateToPage = useCallback((page) => {
    if (page === currentPage) return;
    window.history.pushState({ page }, '', pagePaths[page]);
    setCurrentPage(page);
  }, [currentPage]);

  return (
    <div className="app-container">
      <nav
        aria-label="Switch pages"
        className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-4 bg-gray-900 px-4 py-2.5 text-center text-xs text-white shadow-md sm:gap-6 sm:text-sm"
      >
        <span className="font-medium text-gray-400">Switch Page:</span>
        {[
          ['home', 'Home Page'],
          ['product', 'Product Details Page'],
          ['shop', 'ShopCategory Page'],
          ['cart', 'Cart Page']
        ].map(([page, label]) => (
          <button
            key={page}
            type="button"
            onClick={() => navigateToPage(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`rounded px-3 py-1 transition-colors ${currentPage === page ? 'bg-yellow-400 font-bold text-black' : 'hover:text-yellow-400'}`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Pages Rendering */}
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'product' && <ProductPage />}
        {currentPage === 'shop' && <ShopCategoryPage />}
        {currentPage === 'cart' && <CartPage />}
      </main>
    </div>
  );
}