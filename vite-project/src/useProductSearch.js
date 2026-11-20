import { useContext } from 'react';
import { ProductSearchContext } from './ProductSearchContext';

export function useProductSearch() {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error('useProductSearch must be used within a ProductSearchProvider.');
  }
  return context;
}
