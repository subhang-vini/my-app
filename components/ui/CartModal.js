"use client";

import { Suspense, lazy } from 'react';
import { useCart } from "../../contexts/CartContext";
import styles from "./CartModal.module.css";

// Lazy load the cart content to improve performance
const CartModalContent = lazy(() => import('./CartModalContent'));

/**
 * CartModal component - displays mini cart on hover
 */
export default function CartModal({ isVisible, onClose }) {
  const { items, cartCount } = useCart();

  if (!isVisible) return null;

  return (
    <div className={styles.modal} onMouseLeave={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>
            Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h3>
        </div>
        
        <div className={styles.modalBody}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
              <CartModalContent items={items} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
