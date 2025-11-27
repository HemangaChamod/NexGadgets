import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../axiosConfig';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { dispatch } = useContext(CartContext);

  const addToCartHandler = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, qty: 1 } });
    alert('Added to cart');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8 }} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
