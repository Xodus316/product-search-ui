import type { Product } from '../types';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ product }: { product: Product }) {
    const navigate = useNavigate();
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0,0.5)',
            backgroundColor: '#fff'
        }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1a1a1a' }}>
                {product.name}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 1rem 0' }}>
                <span style={{ fontWeight: '600', color: '#333' }}>{product.manufacturer}</span>
                &nbsp; &nbsp; {product.category}
            </p>

            <div style = {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontWeight: 'bold', margin: '0', color: '#2c3e50', fontSize: '1.2rem' }}>
                    ${product.price.toFixed(2)}
                </p>
                <button 
                onClick={() => navigate(`/product/${product.productId}`)}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                }}>
                    View
                </button>
            </div>
        </div>
    );
}