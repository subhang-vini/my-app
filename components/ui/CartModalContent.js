"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";
import styles from "./CartModalContent.module.css";

/**
 * CartModalContent component - displays cart items and actions
 */
export default function CartModalContent({ items }) {
  const { cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id, e) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className={styles.content}>
      {/* Cart Items */}
      <div className={styles.itemsList}>
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Link href={`/${item.id}`} className={styles.itemImageLink}>
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={60}
                height={60}
                className={styles.itemImage}
              />
            </Link>
            
            <div className={styles.itemDetails}>
              <Link href={`/${item.id}`} className={styles.itemTitle}>
                {item.title.length > 30 
                  ? `${item.title.substring(0, 30)}...` 
                  : item.title
                }
              </Link>
              
              <div className={styles.itemMeta}>
                <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                <span className={styles.itemQuantity}>×{item.quantity}</span>
              </div>
              
              <div className={styles.itemActions}>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e)}
                  className={styles.quantityInput}
                  aria-label={`Quantity for ${item.title}`}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                  aria-label={`Remove ${item.title} from cart`}
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {items.length > 3 && (
          <div className={styles.moreItems}>
            +{items.length - 3} more items
          </div>
        )}
      </div>

      {/* Cart Summary */}
      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        
        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Link href="/cart" className={styles.goToCartButton} prefetch={true}>
          🛒 Go to Cart
        </Link>
        <button onClick={clearCart} className={styles.clearCartButton}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}
