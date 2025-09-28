'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";
import styles from "./page.module.css";

export default function CartPage() {
  const { items, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.emptyCart}>
            <h1 className={styles.title}>Your Cart</h1>
            <div className={styles.emptyContent}>
              <div className={styles.emptyIcon}>🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link href="/" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Cart ({cartCount} items)</h1>
          <div className={styles.headerActions}>
            <Link href="/" className={styles.backLink} prefetch={true}>
              ← Back to Products
            </Link>
            <button onClick={clearCart} className={styles.clearButton}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className={styles.image}
                  />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <div className={styles.itemPrice}>${item.price}</div>
                </div>

                <div className={styles.itemQuantity}>
                  <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                  <select
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantitySelect}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                  aria-label="Remove item from cart"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.summaryContent}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartCount} items):</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className={styles.summaryRowTotal}>
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className={styles.checkoutActions}>
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
              <Link href="/" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
