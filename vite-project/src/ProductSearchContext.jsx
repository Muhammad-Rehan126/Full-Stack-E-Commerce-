import { createContext, useState } from 'react';

const ProductSearchContext = createContext(null);

function getInitialSearch() {
  return new URLSearchParams(window.location.search).get('search') || '';
}

export function ProductSearchProvider({ children }) {
  const [query, setQuery] = useState(getInitialSearch);
  return (
    <ProductSearchContext.Provider value={{ query, setQuery }}>
      {children}
    </ProductSearchContext.Provider>
  );
}

export { ProductSearchContext };
