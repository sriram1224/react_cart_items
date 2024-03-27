import React, { useState } from 'react';
import './Product.css'; 

const ProductList = ({ products, onAdd, onRemove }) => (
  <div className="product-list">
    {products.map((product) => (
      <div className="product" key={product.id}>
        <span className="product-info">{product.name} - ₹ {product.price}</span>
        <div className="product-actions">
          <button onClick={() => onAdd(product)}>+</button>
          <span className="product-quantity">{product.quantity || 0}</span>
          <button onClick={() => onRemove(product)}>-</button>
        </div>
      </div>
    ))}
  </div>
);

const Cart = ({ cart, total }) => (
  <div className="cart">
    <h2>Cart</h2>
    {cart.length === 0 ? (
      <p>No Product added to the cart</p>
    ) : (
      cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <p>
            <span className="cart-item-info">{item.name} - ₹ {item.price} x {item.quantity}</span>
          </p>
        </div>
      ))
    )}
    <p className="cart-total">Total: ₹{total}</p>
  </div>
);

export default function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
      { id: 3, name: 'Product-3', price: 300 },
      { id: 4, name: 'Product-4', price: 400 },
        { id: 5, name: 'Product-5', price: 500 },
        { id: 6, name: 'Product-6', price: 600 },
       
        
  ]);

  const [cart, setCart] = useState([]);

  const handleAdd = (product) => {
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
      )
    );
    setCart(
      cart.find((item) => item.id === product.id)
        ? cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { ...product, quantity: 1 }]
    );
  };

  const handleRemove = (product) => {
    setProducts(
      products.map((p) =>
        p.id === product.id && p.quantity
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
    setCart(
      cart.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity && item.quantity > 0)
    );
  };

  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="product-container">
      <ProductList products={products} onAdd={handleAdd} onRemove={handleRemove} />
      <Cart cart={cart} total={total} />
    </div>
  );
}
