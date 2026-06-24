import { useState, useEffect } from 'react';
import type { Product } from './types';
import { useDebounce } from './hooks/useDebounce';
import { ProductCard } from './components/ProductCard';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  // Placeholder fetch function to simulate API call
  const fetchProducts = async (query: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/products');

      if (!response.ok) {
        throw new Error('HTTP error. Status: ${response.status} ');
      }

      const data: Product[] = await response.json();
      const filteredResults = data.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filteredResults);
    } catch (error) {
      console.error('Could not fetch products from the API: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect hook
  useEffect(() => {
    if (debouncedSearchQuery !== '') {
      setHasSearched(true);
    }
    fetchProducts(debouncedSearchQuery);
  }, [debouncedSearchQuery]);
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <h1 style={{ margin: '0 0 2rem 0', color: '#f30808' }}>Product Catalog Search</h1>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <input
                type="text"
                value={ searchQuery }
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or brand..."
                style={{ 
                  padding: '0.75rem', 
                  width: '100%', 
                  maxWidth: '400px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
              {isLoading && <span style={{ marginLeft: '1rem', color: '#2563eb', fontWeight: '500' }}>Searching...</span>}
        </div>
      </header>

      <main>
        {products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {products.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <p>No products found {hasSearched && `for "${searchQuery}"`}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App;
