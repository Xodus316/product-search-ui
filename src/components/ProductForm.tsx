import type { Product } from '../types';
import { useState } from 'react';

export function ProductForm({ onProductAdded, onCancel }: { onProductAdded: () => void; onCancel: () => void }) {
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: '',
        manufacturer: '',
        category: '',
        price: 0,
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setNewProduct({ name: '', manufacturer: '', category: '', price: 0, description: '' });
            onProductAdded();
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Add a New Product</h3>
                <button type="button" onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontSize: '1.2rem' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input type="text" placeholder="Product Name" required value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="text" placeholder="Manufacturer (e.g., Sony)" required value={newProduct.manufacturer || ''} onChange={e => setNewProduct({...newProduct, manufacturer: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="text" placeholder="Category (e.g., Electronics)" required value={newProduct.category || ''} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="number" placeholder="Price" step="0.01" required value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <textarea placeholder="Product Description" required value={newProduct.description || ''} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '1rem', minHeight: '80px', boxSizing: 'border-box' }} />
            <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', backgroundColor: isSubmitting ? '#93c5fd' : '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                {isSubmitting ? 'Saving...' : 'Save to MongoDB'}
            </button>
        </form>
    );
}
