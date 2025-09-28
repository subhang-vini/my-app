'use client';

import { useCart } from '../../contexts/CartContext';
import styles from './AddToCartButton.module.css';

/**
 * AddToCartButton component for adding/removing items from cart
 * @param {Object} product - Product object
 * @param {string} product.id - Product ID
 * @param {string} product.title - Product title
 * @param {number} product.price - Product price
 * @param {string} product.thumbnail - Product thumbnail image URL
 * @param {string} variant - Button variant ('card' or 'detail')
 * @param {string} className - Additional CSS classes
 */
export default function AddToCartButton({ product, variant = 'card', className = '' }) {
  const { isInCart, addToCart, removeFromCart } = useCart();
  
  const inCart = isInCart(product.id);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const buttonText = inCart ? 'Remove from Cart' : 'Add to Cart';
  const buttonClass = `${styles.button} ${styles[variant]} ${inCart ? styles.inCart : ''} ${className}`;

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      aria-label={buttonText}
    >
      <span className={styles.icon}>
        {inCart ? '✓' : '+'}
      </span>
      <span className={styles.text}>
        {buttonText}
      </span>
    </button>
  );
}
