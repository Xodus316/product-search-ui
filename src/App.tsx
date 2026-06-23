import { useState, useEffect, type FormEvent } from 'react';
import type { Product } from './types';
import { useDebounce } from './hooks/useDebounce';

const MOCK_PRODUCTS: Product[] = [
  { productId: 'p-101', name: 'Wireless Noise-Canceling Headphones', manufacturer: 'Sony', category: 'Electronics', price: 299.99, description: 'Industry leading noise cancellation.', attributes: { color: 'Black' } },
  { productId: 'p-102', name: 'Mechanical Gaming Keyboard', manufacturer: 'Keychron', category: 'Electronics', price: 109.50, description: 'Hot-swappable tactile switches.', attributes: { color: 'Grey' } },
  { productId: 'p-103', name: 'Ergonomic Office Chair', manufacturer: 'Herman Miller', category: 'Furniture', price: 950.00, description: 'Adjustable lumbar support.', attributes: { color: 'Graphite', material: 'Mesh' } },
  { productId: 'p-104', name: 'Stainless Steel Water Bottle', manufacturer: 'Yeti', category: 'Outdoors', price: 35.00, description: 'Double-wall vacuum insulated.', attributes: { color: 'Navy' } }
];

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  // Placeholder fetch function to simulate API call
  const fetchProducts = async (query: string) => {
    setIsLoading(true);

    // Simulate 1 second delay for fetching
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple filtering logic
    const filteredResults = MOCK_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setIsLoading(false);
    setProducts(filteredResults);
  };

  // Use effect hook
  useEffect(() => {
    if (debouncedSearchQuery !== '') {
      setHasSearched(true);
    }
    fetchProducts(debouncedSearchQuery);
  }, [debouncedSearchQuery]);
  
  // Placeholder search function to be implemented
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    await fetchProducts(searchQuery);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>Product Catalog Search</h1>
      <form onSubmit={ handleSearch } style={{ marginBottom: '2rem' }}>
        <input
              type="text"
              value={ searchQuery }
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem' }} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
            </button>
      </form>

      {/* Conditional logic */}
      {isLoading ? (
        <p>Loading products from server...</p>
      ) : products.length > 0 ? (
        <div style = {{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {products.map((product) => (
            <div key={product.productId} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', margin: '0 0 1rem 0' }}>{product.manufacturer}</p>
              <p style={{ fontWeight: 'bold', margin: '0' }}>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found {hasSearched && `for "${searchQuery}"`}</p>
      )}
    </div>
  )
}

export default App;
