"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../../contexts/CartContext";
import CartModal from "./CartModal";
import styles from "./CartIcon.module.css";

/**
 * CartIcon component for displaying cart count and linking to cart page,
 * with modal on hover or click
 */
export default function CartIcon() {
  const { cartCount } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const hoverTimeout = useRef(null);
  const hideTimeout = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    // Don't show modal if cart is empty
    if (cartCount === 0) {
      return;
    }
    
    // Clear any existing hide timeout
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    
    // Show modal after a short delay
    hoverTimeout.current = setTimeout(() => {
      setIsModalVisible(true);
    }, 300); // 300ms delay
  };

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves before delay
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    
    // Hide modal after a short delay
    hideTimeout.current = setTimeout(() => {
      setIsModalVisible(false);
    }, 100); // 100ms delay to prevent flickering
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation to cart page
    e.stopPropagation();
    
    // Don't open modal if cart is empty
    if (cartCount === 0) {
      return;
    }
    
    // Clear any pending timeouts
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    
    // Toggle modal visibility on click
    setIsModalVisible(prev => !prev);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  return (
    <div 
      className={styles.cartIconContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <div
        className={`${styles.cartIcon} ${cartCount === 0 ? styles.disabled : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={cartCount === 0 ? -1 : 0}
        aria-label={cartCount === 0 ? "Cart is empty" : `Cart with ${cartCount} items`}
        aria-disabled={cartCount === 0}
        onKeyDown={(e) => {
          if (cartCount === 0) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e);
          }
        }}
      >
        <div className={styles.icon}>
          🛒
        </div>
        {cartCount > 0 && (
          <span className={styles.badge}>
            {cartCount}
          </span>
        )}
      </div>
      
      {cartCount > 0 && (
        <CartModal 
          isVisible={isModalVisible} 
          onClose={handleModalClose}
          parentRef={containerRef}
        />
      )}
    </div>
  );
}