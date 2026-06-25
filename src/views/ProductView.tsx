import { useEffect, useState } from "react";
import type { Product } from "../types";
import { useParams } from "react-router-dom";

function ProductView() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract the product ID from the URL
  const { id: productId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided in the URL.");
      setIsLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(`Could not fetch product details: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#f30808' }}>{product.name}</h1>
      <p><strong>Brand:</strong> {product.manufacturer}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Attributes:</strong></p>
      <ul>
        <li><strong>Color:</strong> {product.attributes.color}</li>
        {product.attributes.material && <li><strong>Material:</strong> {product.attributes.material}</li>}
      </ul>
    </div>
  );
}

export default ProductView; 